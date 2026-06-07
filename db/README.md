# Appointments ↔ Neon ↔ Dashboard

How the website's appointment form, the shared Neon database, and the doctor's
patient-management dashboard fit together.

```
  Patient (browser)                Vercel                     Neon Postgres                 Dashboard (separate repo)
  ┌────────────────┐   POST     ┌──────────────────────┐   INSERT   ┌──────────────┐   SELECT   ┌───────────────────┐
  │ AppointmentPage│ ─────────► │ /api/appointments.js │ ─────────► │ appointments │ ◄───────── │ reads same table  │
  │   (the form)   │  JSON      │ (DATABASE_URL secret)│            │    table     │  UPDATE    │ confirm / cancel  │
  └────────────────┘            └──────────────────────┘            └──────────────┘            └───────────────────┘
```

The browser never sees the database password — it only talks to `/api/appointments`,
which holds `DATABASE_URL` server-side.

## 1. Create the table

Run [`schema.sql`](./schema.sql) once against the **same** Neon database the dashboard uses
(Neon Console → SQL Editor).

## 2. Configure the secret

- **Local dev:** copy `.env.example` → `.env` and paste your Neon connection string.
- **Production:** in the Vercel project → Settings → Environment Variables, add
  `DATABASE_URL` (Production + Preview) with the same string. Redeploy.

Use the **pooled** Neon connection string (host contains `-pooler`) for serverless.

## 3. Dashboard read side (do this in the dashboard repo)

The dashboard reads the very same table. Core query:

```sql
SELECT id, full_name, contact_number, email, reason,
       appointment_date, appointment_time, status, source, created_at
FROM appointments
ORDER BY appointment_date DESC, created_at DESC;
```

Update a booking's status as the doctor processes it:

```sql
UPDATE appointments SET status = 'confirmed' WHERE id = $1;   -- or 'cancelled'
```

If the dashboard also uses `@neondatabase/serverless`:

```js
import { neon } from "@neondatabase/serverless";
const sql = neon(process.env.DATABASE_URL);
const rows = await sql`
  SELECT id, full_name, contact_number, email, reason,
         appointment_date, appointment_time, status, source, created_at
  FROM appointments
  ORDER BY appointment_date DESC, created_at DESC`;
```

> Point Claude at the dashboard repo to wire a list view + confirm/cancel actions to its UI.
```
