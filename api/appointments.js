import { neon } from "@neondatabase/serverless";

/* ───────────────────────────────────────────────────────────────
   /api/appointments
   POST  → saves a booking from the website into the shared Neon database.
   GET   → returns the slots already taken for a given date, so the UI can
           disable them (?date=YYYY-MM-DD).
   The dashboard reads/writes the same `appointments` table directly.

   Security:
   - DATABASE_URL lives only in the serverless env, never in the browser.
   - Values are passed as parameters (driver escapes them) → no SQL injection.

   Double-booking:
   - A partial unique index (uniq_active_slot) on (appointment_date,
     appointment_time) WHERE status <> 'cancelled' is the atomic guarantee.
   - We catch its violation (Postgres code 23505) and return a friendly message
     instead of relying on a pre-check (which would race under concurrency).
   ─────────────────────────────────────────────────────────────── */

const MAX_LENGTHS = {
  full_name: 120,
  contact_number: 40,
  email: 254,
  reason: 1000,
  appointment_time: 20,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function clean(value) {
  return typeof value === "string" ? value.trim() : "";
}

export default async function handler(req, res) {
  if (req.method !== "POST" && req.method !== "GET") {
    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  if (!process.env.DATABASE_URL) {
    // Misconfiguration — log server-side, return a generic message.
    console.error("DATABASE_URL is not set");
    return res.status(500).json({ ok: false, error: "Server is not configured" });
  }

  // ── GET: availability for a date ────────────────────────────
  // Returns the active (non-cancelled) slots already booked on ?date=YYYY-MM-DD
  // so the booking form can disable them.
  if (req.method === "GET") {
    const date = clean(req.query?.date);
    if (!date || !DATE_RE.test(date)) {
      return res
        .status(400)
        .json({ ok: false, error: "A valid date (YYYY-MM-DD) is required" });
    }
    try {
      const sql = neon(process.env.DATABASE_URL);
      const rows = await sql`
        SELECT appointment_time
        FROM appointments
        WHERE appointment_date = ${date}
          AND status <> 'cancelled'
      `;
      const booked = rows.map((r) => r.appointment_time);
      return res.status(200).json({ ok: true, date, booked });
    } catch (err) {
      console.error("Failed to read availability:", err);
      return res
        .status(500)
        .json({ ok: false, error: "Could not load availability." });
    }
  }

  // Vercel parses JSON bodies automatically, but guard for string bodies too.
  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ ok: false, error: "Invalid JSON body" });
    }
  }
  body = body || {};

  // Honeypot: real users leave this empty; bots tend to fill every field.
  if (clean(body.website)) {
    return res.status(201).json({ ok: true, id: null });
  }

  const full_name = clean(body.full_name);
  const contact_number = clean(body.contact_number);
  const email = clean(body.email);
  const reason = clean(body.reason);
  const appointment_date = clean(body.appointment_date);
  const appointment_time = clean(body.appointment_time);

  // ── Validation ──────────────────────────────────────────────
  const errors = [];

  if (!full_name) errors.push("Full name is required");
  if (!contact_number) errors.push("Contact number is required");
  if (!appointment_date) errors.push("Appointment date is required");
  if (!appointment_time) errors.push("Appointment time is required");

  for (const [field, max] of Object.entries(MAX_LENGTHS)) {
    const val = clean(body[field]);
    if (val.length > max) errors.push(`${field} is too long`);
  }

  if (email && !EMAIL_RE.test(email)) errors.push("Email is invalid");

  if (appointment_date && !DATE_RE.test(appointment_date)) {
    errors.push("Appointment date must be in YYYY-MM-DD format");
  } else if (appointment_date) {
    // Reject dates in the past (compare on calendar day, server time).
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const picked = new Date(`${appointment_date}T00:00:00`);
    if (Number.isNaN(picked.getTime())) {
      errors.push("Appointment date is invalid");
    } else if (picked < today) {
      errors.push("Appointment date cannot be in the past");
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({ ok: false, error: errors[0], errors });
  }

  // ── Insert ──────────────────────────────────────────────────
  try {
    const sql = neon(process.env.DATABASE_URL);
    const [row] = await sql`
      INSERT INTO appointments
        (full_name, contact_number, email, reason, appointment_date, appointment_time)
      VALUES
        (${full_name}, ${contact_number}, ${email || null}, ${reason || null},
         ${appointment_date}, ${appointment_time})
      RETURNING id, created_at
    `;

    return res.status(201).json({ ok: true, id: row.id, created_at: row.created_at });
  } catch (err) {
    // 23505 = unique_violation → the slot was taken between page load and submit
    // (or by the dashboard). Tell the user to pick another, don't 500.
    if (err?.code === "23505") {
      return res.status(409).json({
        ok: false,
        error: "That time slot was just booked. Please choose another slot.",
        code: "SLOT_TAKEN",
      });
    }
    // Never leak DB internals to the client.
    console.error("Failed to insert appointment:", err);
    return res.status(500).json({ ok: false, error: "Could not save appointment. Please try again." });
  }
}
