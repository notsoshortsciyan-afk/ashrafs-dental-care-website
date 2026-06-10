-- ════════════════════════════════════════════════════════════════
-- Shared appointments schema
-- Run this ONCE against the Neon database that the patient-management
-- dashboard already uses (Neon Console → SQL Editor, or psql).
--
-- Both apps share this single table:
--   • The website's /api/appointments serverless function INSERTs into it.
--   • The dashboard SELECTs / UPDATEs it directly (no syncing needed).
-- ════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS appointments (
  id               BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  full_name        TEXT        NOT NULL,
  contact_number   TEXT        NOT NULL,
  email            TEXT,
  reason           TEXT,
  appointment_date DATE        NOT NULL,
  appointment_time TEXT        NOT NULL,   -- e.g. "04:30 PM" (matches the website slots)
  status           TEXT        NOT NULL DEFAULT 'pending',  -- pending | confirmed | cancelled
  source           TEXT        NOT NULL DEFAULT 'website',  -- website | manual | lock
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Slot locks (source = 'lock') — overbooking model
-- A booking does NOT reserve a slot: patients may book the same time repeatedly.
-- Only the dashboard "locking" a slot makes it unavailable — it INSERTs a sentinel
-- row with source='lock', status='confirmed' (placeholder full_name/contact_number).
-- The website's availability query returns ONLY these lock rows, and its POST
-- refuses to insert a booking when a lock exists. Unlocking DELETEs the row.
-- The website never creates 'lock' rows.

CREATE INDEX IF NOT EXISTS idx_appointments_date   ON appointments (appointment_date);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments (status);

-- At most ONE active lock per (date, slot). Bookings are intentionally NOT
-- constrained — a slot can hold many bookings; only a staff lock reserves it, and
-- a slot can carry just one active lock. Cancelled rows are excluded.
-- (Earlier schemas had uniq_active_slot covering every non-cancelled row; this
-- replaces it. To migrate a live DB: DROP INDEX IF EXISTS uniq_active_slot;)
CREATE UNIQUE INDEX IF NOT EXISTS uniq_active_lock
  ON appointments (appointment_date, appointment_time)
  WHERE source = 'lock' AND status <> 'cancelled';
