import { neon } from "@neondatabase/serverless";

/* ───────────────────────────────────────────────────────────────
   /api/appointments
   POST  → saves a booking from the website into the shared Neon database.
   GET   → returns the slots that are LOCKED for a given date, so the UI can
           disable them (?date=YYYY-MM-DD). A booking does NOT disable a slot.
   The dashboard reads/writes the same `appointments` table directly.

   Security:
   - DATABASE_URL lives only in the serverless env, never in the browser.
   - Values are passed as parameters (driver escapes them) → no SQL injection.

   Overbooking model (slot locks):
   - A booking no longer reserves a slot — patients may book the same time
     repeatedly. Only a staff LOCK row (source='lock') makes a slot unavailable.
   - A partial unique index (uniq_active_lock) keeps at most one active lock per
     slot. POST guards each booking with an atomic NOT EXISTS lock check, so a
     lock added mid-request still wins — no pre-check race.
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
  // Returns the LOCKED slots on ?date=YYYY-MM-DD (source='lock') so the booking
  // form can disable them. A regular booking does NOT make a slot unavailable —
  // patients may share a time; only a clinic lock blocks new bookings.
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
          AND source = 'lock'
          AND status <> 'cancelled'
      `;
      const unavailable = rows.map((r) => r.appointment_time);
      // Availability is polled live — never serve it stale from the browser/CDN.
      res.setHeader("Cache-Control", "no-store");
      return res.status(200).json({ ok: true, date, unavailable });
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
    // Insert only if the slot isn't locked by the clinic. Multiple bookings on the
    // same slot are allowed — only a staff lock (source='lock') blocks booking. The
    // NOT EXISTS guard runs in the same statement, so a lock added mid-request wins.
    const rows = await sql`
      INSERT INTO appointments
        (full_name, contact_number, email, reason, appointment_date, appointment_time)
      SELECT
        ${full_name}, ${contact_number}, ${email || null}, ${reason || null},
        ${appointment_date}, ${appointment_time}
      WHERE NOT EXISTS (
        SELECT 1 FROM appointments
        WHERE appointment_date = ${appointment_date}
          AND appointment_time = ${appointment_time}
          AND source = 'lock'
          AND status <> 'cancelled'
      )
      RETURNING id, created_at
    `;

    if (rows.length === 0) {
      // Nothing inserted → the slot is locked by the clinic.
      return res.status(409).json({
        ok: false,
        error: "This time slot is no longer available. Please choose another slot.",
        code: "SLOT_LOCKED",
      });
    }

    const row = rows[0];
    return res.status(201).json({ ok: true, id: row.id, created_at: row.created_at });
  } catch (err) {
    // 23505 (unique_violation) can now only come from the lock index → treat it as
    // a locked slot, not a 500.
    if (err?.code === "23505") {
      return res.status(409).json({
        ok: false,
        error: "This time slot is no longer available. Please choose another slot.",
        code: "SLOT_LOCKED",
      });
    }
    // Never leak DB internals to the client.
    console.error("Failed to insert appointment:", err);
    return res.status(500).json({ ok: false, error: "Could not save appointment. Please try again." });
  }
}
