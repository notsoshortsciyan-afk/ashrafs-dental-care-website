import { useCallback, useEffect, useState } from "react";
import {
  CalendarDays,
  Clock,
  User,
  Phone,
  Mail,
  ClipboardList,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";

/* ─── Calendar Helpers ─────────────────────────────────────── */
const DAYS = ["S", "M", "T", "W", "T", "F", "S"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

function buildCalendarGrid(year, month) {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const daysInPrevMonth = getDaysInMonth(year, month - 1);

  const cells = [];

  // Previous month trailing days
  for (let i = firstDay - 1; i >= 0; i--) {
    cells.push({ day: daysInPrevMonth - i, current: false });
  }

  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, current: true });
  }

  // Next month leading days
  const remaining = 42 - cells.length;
  for (let d = 1; d <= remaining; d++) {
    cells.push({ day: d, current: false });
  }

  return cells;
}

/* ─── Time Slots ───────────────────────────────────────────── */
const TIME_SLOTS = [
  "03:00 PM", "03:45 PM", "04:30 PM", "05:15 PM",
  "06:00 PM", "06:45 PM", "07:30 PM", "08:15 PM",
  "09:00 PM", "09:45 PM",
];

/* ─── Feature Cards Data ───────────────────────────────────── */
const FEATURES = [
  { label: "Modern Equipment", img: "/ASSETS/MODERN_EQUIPMENT.png" },
  { label: "Calming Environment", img: "/ASSETS/CALMING_ENVIRONMENT.png" },
  { label: "Certified Sterilization", img: "/ASSETS/CERTIFIED_STERILIZATION.png" },
];

/* ═══════════════════════════════════════════════════════════════
   APPOINTMENT PAGE
   ═══════════════════════════════════════════════════════════════ */
export function AppointmentPage() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState(today.getDate());
  const [selectedSlot, setSelectedSlot] = useState("04:30 PM");

  // Patient details (controlled inputs)
  const [fullName, setFullName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [website, setWebsite] = useState(""); // honeypot — must stay empty

  // Submission state
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Availability — which slots are already booked on the selected date.
  const [bookedSlots, setBookedSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const calendarCells = buildCalendarGrid(year, month);

  // The selected calendar day as a YYYY-MM-DD string (or "" if none picked).
  const selectedDate = selectedDay
    ? `${year}-${String(month + 1).padStart(2, "0")}-${String(selectedDay).padStart(2, "0")}`
    : "";

  // Fetch the active (non-cancelled) bookings for a date and update the grid.
  // Returns the booked array so callers (e.g. the pre-submit re-check) can act
  // on the freshest data without waiting for a state flush.
  const refreshAvailability = useCallback(async (date, signal) => {
    const res = await fetch(`/api/appointments?date=${date}`, { signal });
    const data = await res.json();
    const booked = Array.isArray(data?.booked) ? data.booked : [];
    setBookedSlots(booked);
    return booked;
  }, []);

  // Keep availability live: fetch on date change, then poll every 8s so slots
  // booked elsewhere (the dashboard, another visitor) grey out without a manual
  // refresh. The unique constraint is still the real guard; this is just UX.
  useEffect(() => {
    if (!selectedDate || success) {
      setBookedSlots([]);
      return;
    }

    let controller;
    const tick = () => {
      // Don't poll a backgrounded tab — we refetch the moment it's visible again.
      if (document.hidden) return Promise.resolve();
      controller?.abort();
      controller = new AbortController();
      return refreshAvailability(selectedDate, controller.signal).catch((err) => {
        if (err?.name !== "AbortError") setBookedSlots([]);
      });
    };

    setLoadingSlots(true);
    tick().finally(() => setLoadingSlots(false));

    const interval = setInterval(tick, 8000);
    // A returning tab should reflect reality instantly, not after the next tick.
    const onVisible = () => {
      if (!document.hidden) tick();
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisible);
      controller?.abort();
    };
  }, [selectedDate, success, refreshAvailability]);

  // If the currently selected slot becomes booked, drop the selection.
  useEffect(() => {
    if (selectedSlot && bookedSlots.includes(selectedSlot)) {
      setSelectedSlot("");
    }
  }, [bookedSlots, selectedSlot]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    // ── Client-side guards (the API re-validates everything) ──
    if (!selectedDay) {
      setError("Please select a date for your visit.");
      return;
    }
    if (!fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (!contactNumber.trim()) {
      setError("Please enter a contact number.");
      return;
    }
    if (!selectedSlot) {
      setError("Please choose an available time slot.");
      return;
    }

    const appointment_date = selectedDate;

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    if (new Date(`${appointment_date}T00:00:00`) < startOfToday) {
      setError("The selected date is in the past. Please pick an upcoming date.");
      return;
    }

    setSubmitting(true);
    try {
      // Re-check availability right before booking: if the slot was taken in the
      // last few seconds (since the poll), catch it here instead of round-tripping
      // a POST that the unique index would only reject with a 409.
      try {
        const fresh = await refreshAvailability(appointment_date);
        if (fresh.includes(selectedSlot)) {
          setSelectedSlot("");
          throw new Error("That time slot was just booked. Please choose another slot.");
        }
      } catch (err) {
        if (err?.name === "TypeError") {
          // Network hiccup on the pre-check — let the POST (and its 409) be the guard.
        } else {
          throw err;
        }
      }

      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: fullName.trim(),
          contact_number: contactNumber.trim(),
          email: email.trim(),
          reason: reason.trim(),
          appointment_date,
          appointment_time: selectedSlot,
          website, // honeypot
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.ok) {
        // Slot got taken between load and submit — refresh availability so the
        // UI greys it out, and clear the now-invalid selection.
        if (res.status === 409 || data.code === "SLOT_TAKEN") {
          setBookedSlots((prev) =>
            prev.includes(selectedSlot) ? prev : [...prev, selectedSlot]
          );
          setSelectedSlot("");
        }
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setSuccess(true);
    } catch (err) {
      setError(err.message || "Could not submit your appointment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function prevMonth() {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else {
      setMonth((m) => m - 1);
    }
    setSelectedDay(null);
  }

  function nextMonth() {
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else {
      setMonth((m) => m + 1);
    }
    setSelectedDay(null);
  }

  return (
    <section className="bg-[#e8ebf2] min-h-screen pt-8 pb-16">
      <div className="mx-auto w-full max-w-[1100px] px-4 sm:px-6 lg:px-8">

        {/* ── Page Header ─────────────────────────────────── */}
        <div className="mb-8">
          <h1 className="text-[2rem] sm:text-[2.5rem] font-black text-[#0D99E4] leading-tight tracking-tight">
            Book Your Visit
          </h1>
          <p className="mt-2 max-w-2xl text-[14px] sm:text-[15px] leading-relaxed text-[#3b4963]">
            Select a convenient date and time for your consultation. Our experts
            are ready to provide you with the best dental care.
          </p>
        </div>

        {/* ── Main Grid: Calendar + Form ──────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">

          {/* ═══ LEFT COLUMN ═══ */}
          <div className="flex flex-col gap-6">

            {/* Calendar Card */}
            <div className="rounded-2xl bg-white p-5 sm:p-6 shadow-md">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-5 w-5 text-[#0D99E4]" strokeWidth={2} />
                  <h2 className="text-[15px] font-bold text-[#0D99E4]">Select Date</h2>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={prevMonth}
                    className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-[#e8ebf2] transition-colors"
                    aria-label="Previous month"
                  >
                    <ChevronLeft className="h-4 w-4 text-[#0D99E4]" />
                  </button>
                  <span className="text-[13px] font-semibold text-[#0D99E4] min-w-[120px] text-center">
                    {MONTHS[month]} {year}
                  </span>
                  <button
                    onClick={nextMonth}
                    className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-[#e8ebf2] transition-colors"
                    aria-label="Next month"
                  >
                    <ChevronRight className="h-4 w-4 text-[#0D99E4]" />
                  </button>
                </div>
              </div>

              {/* Day Headers */}
              <div className="grid grid-cols-7 mb-1">
                {DAYS.map((d, i) => (
                  <div
                    key={i}
                    className="flex h-9 items-center justify-center text-[12px] font-semibold text-[#8894a6] select-none"
                  >
                    {d}
                  </div>
                ))}
              </div>

              {/* Day Grid */}
              <div className="grid grid-cols-7">
                {calendarCells.map((cell, i) => {
                  const isSelected = cell.current && cell.day === selectedDay;
                  const isToday =
                    cell.current &&
                    cell.day === today.getDate() &&
                    month === today.getMonth() &&
                    year === today.getFullYear();

                  return (
                    <button
                      key={i}
                      onClick={() => cell.current && setSelectedDay(cell.day)}
                      disabled={!cell.current}
                      className={`
                        flex h-10 w-full items-center justify-center rounded-full text-[13px] font-medium transition-all
                        ${!cell.current
                          ? "text-[#c5cdd8] cursor-default"
                          : isSelected
                            ? "bg-[#0D99E4] text-white font-bold shadow-md"
                            : "text-[#0D99E4] hover:bg-[#e8ebf2] cursor-pointer"
                        }
                        ${isToday && !isSelected ? "ring-1 ring-[#0D99E4]" : ""}
                      `}
                    >
                      {cell.day}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Available Time Slots Card */}
            <div className="rounded-2xl bg-white p-5 sm:p-6 shadow-md">
              <div className="flex items-center gap-2 mb-5">
                <Clock className="h-5 w-5 text-[#0D99E4]" strokeWidth={2} />
                <h2 className="text-[15px] font-bold text-[#0D99E4]">Available Time Slots</h2>
                {loadingSlots && (
                  <span className="text-[11px] font-medium text-[#8894a6]">
                    checking availability…
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 min-[480px]:grid-cols-4 gap-3">
                {TIME_SLOTS.map((slot) => {
                  const isBooked = bookedSlots.includes(slot);
                  const isActive = !isBooked && slot === selectedSlot;
                  return (
                    <button
                      key={slot}
                      onClick={() => !isBooked && setSelectedSlot(slot)}
                      disabled={isBooked}
                      aria-label={isBooked ? `${slot} — booked` : slot}
                      className={`
                        flex h-[42px] items-center justify-center rounded-xl text-[13px] font-semibold transition-all border
                        ${isBooked
                          ? "bg-[#eef1f6] text-[#a3afc0] border-[#e1e6ee] line-through cursor-not-allowed"
                          : isActive
                            ? "bg-[#0D99E4] text-white border-[#0D99E4] shadow-md"
                            : "bg-white text-[#0D99E4] border-[#d5dbe5] hover:border-[#0D99E4] hover:text-[#0D99E4]"
                        }
                      `}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ═══ RIGHT COLUMN — Patient Details ═══ */}
          <div className="rounded-2xl bg-white p-5 sm:p-6 shadow-md flex flex-col h-fit">
            <div className="flex items-center gap-2 mb-5">
              <span className="text-[#0D99E4] text-lg">✦</span>
              <h2 className="text-[15px] font-bold text-[#0D99E4]">Patient Details</h2>
            </div>

            {success ? (
              <div className="flex flex-col items-center justify-center text-center gap-3 py-10">
                <CheckCircle2 className="h-14 w-14 text-[#0D99E4]" strokeWidth={2} />
                <h3 className="text-[18px] font-bold text-[#0D99E4]">Appointment Requested!</h3>
                <p className="text-[13px] text-[#3b4963] leading-relaxed">
                  Thank you{fullName.trim() ? `, ${fullName.trim()}` : ""}. We&apos;ve received your
                  booking for <span className="font-semibold">{selectedSlot}</span>. Our team will
                  contact you shortly to confirm.
                </p>
              </div>
            ) : (
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              {/* Honeypot — hidden from real users; bots fill it in */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="hidden"
                aria-hidden="true"
              />

              {/* Full Name */}
              <div>
                <label className="block text-[12px] font-semibold text-[#0D99E4] mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8894a6]" strokeWidth={2} />
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="h-[42px] w-full rounded-xl border border-[#d5dbe5] bg-white pl-10 pr-4 text-[13px] text-[#0D99E4] placeholder:text-[#a3afc0] outline-none focus:border-[#0D99E4] focus:ring-1 focus:ring-[#0D99E4]/20 transition-colors"
                  />
                </div>
              </div>

              {/* Contact Number */}
              <div>
                <label className="block text-[12px] font-semibold text-[#0D99E4] mb-1.5">
                  Contact Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8894a6]" strokeWidth={2} />
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    className="h-[42px] w-full rounded-xl border border-[#d5dbe5] bg-white pl-10 pr-4 text-[13px] text-[#0D99E4] placeholder:text-[#a3afc0] outline-none focus:border-[#0D99E4] focus:ring-1 focus:ring-[#0D99E4]/20 transition-colors"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-[12px] font-semibold text-[#0D99E4] mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8894a6]" strokeWidth={2} />
                  <input
                    type="email"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-[42px] w-full rounded-xl border border-[#d5dbe5] bg-white pl-10 pr-4 text-[13px] text-[#0D99E4] placeholder:text-[#a3afc0] outline-none focus:border-[#0D99E4] focus:ring-1 focus:ring-[#0D99E4]/20 transition-colors"
                  />
                </div>
              </div>

              {/* Reason for Visit */}
              <div>
                <label className="block text-[12px] font-semibold text-[#0D99E4] mb-1.5">
                  Reason for Visit
                </label>
                <div className="relative">
                  <ClipboardList className="absolute left-3 top-3 h-4 w-4 text-[#8894a6]" strokeWidth={2} />
                  <textarea
                    rows={3}
                    placeholder="Describe your symptoms or procedure needed..."
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full rounded-xl border border-[#d5dbe5] bg-white pl-10 pr-4 py-2.5 text-[13px] text-[#0D99E4] placeholder:text-[#a3afc0] outline-none focus:border-[#0D99E4] focus:ring-1 focus:ring-[#0D99E4]/20 transition-colors resize-none"
                  />
                </div>
              </div>

              {/* Estimated Duration */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-[12px] font-semibold text-[#0D99E4]">
                  Estimated Duration
                </span>
                <span className="text-[13px] font-bold text-[#0D99E4]">
                  45 Minutes
                </span>
              </div>

              {/* Error message */}
              {error && (
                <p className="text-[12px] font-semibold text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="mt-2 flex h-[48px] w-full items-center justify-center gap-2 rounded-2xl bg-[#0D99E4] text-white text-[15px] font-bold shadow-lg hover:bg-[#0D99E4] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? "Submitting..." : "Confirm Appointment"}
                {!submitting && <CheckCircle2 className="h-5 w-5" strokeWidth={2} />}
              </button>
            </form>
            )}
          </div>
        </div>

        {/* ── Bottom Feature Cards ─────────────────────────── */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-5">
          {FEATURES.map((feat) => (
            <div
              key={feat.label}
              className="relative h-[180px] sm:h-[200px] rounded-2xl overflow-hidden shadow-md group"
            >
              <img
                src={feat.img}
                alt={feat.label}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              {/* Label */}
              <div className="absolute bottom-4 left-4">
                <span className="text-white text-[14px] font-bold drop-shadow-md">
                  {feat.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
