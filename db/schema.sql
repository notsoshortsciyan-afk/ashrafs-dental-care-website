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

-- Slot locks (source = 'lock')
-- The dashboard can "lock" a slot by INSERTing a sentinel row with
-- source='lock' and status='confirmed' (placeholder full_name/contact_number).
-- Because it's a non-cancelled row, the availability query below already returns
-- it as booked, so the slot is unavailable on this website with no extra logic;
-- the uniq_active_slot index also stops a real booking from landing on it.
-- Unlocking simply DELETEs that row. The website never creates 'lock' rows.

CREATE INDEX IF NOT EXISTS idx_appointments_date   ON appointments (appointment_date);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments (status);

-- A given date + time slot can only be held by ONE active (non-cancelled)
-- appointment. This is the single guarantee that prevents double-booking
-- across BOTH the website and the dashboard — they share this table, so the
-- constraint protects whichever app inserts second. Cancelled rows are excluded
-- so a freed slot can be re-booked.
CREATE UNIQUE INDEX IF NOT EXISTS uniq_active_slot
  ON appointments (appointment_date, appointment_time)
  WHERE status <> 'cancelled';
