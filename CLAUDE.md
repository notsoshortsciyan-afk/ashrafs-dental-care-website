# Project State

## Overview

Modern, minimal dental clinic landing page for Ashrafs Dental Clinic, implemented with React, Tailwind CSS, and shadcn/ui components.

## Current Progress

- Created initial project state documentation.
- Extracted content structure from `ASSETS/LANDING PAGE.pdf`.
- Inspected provided PNG asset dimensions and mapped likely usage.
- Recorded approved architectural rules for hero container constraints, image blending, z-index layering, and localized contact data.
- Completed Phase 1 setup and layout shell.
- Verified production build with `npm.cmd run build`.
- Built Phase 2 hero section and imported it into `App.jsx`.
- Refactored Hero section to use a robust split layout (grid-cols-1 lg:grid-cols-2) and grouped doctor/card inside a shared relative wrapper to ensure zoom and resize stability.
- Revised hero/header toward the submitted Figma screenshot using transparent `BG REMOVED HERO.png`.
- Added scroll entrance animation system (`ScrollReveal` component using `IntersectionObserver`).
- Refactored Services section from rotating/orbiting 2x2 grid to static, precise diamond overlap layout and responsive scaling to match the Figma design reference exactly.
- Built transforming smiles section with interactive before/after comparison slider (mouse, touch, keyboard), CSS clip-path, and treatment tags.
- Added Google Fonts `Inter` to `index.html` with preconnect hints.
- Added `scrollbar-hide` utility to `globals.css`.
- Updated color palette of navbar, titles, circles, appointment buttons, and the emergency banner to sky blue (#0D99E4) per user request.
- Verified clean production build after all landing page sections.
- Visual audit pass (Playwright): ScrollReveal keeps its replay-on-scroll behavior (per user request) — the translateX offsets of hidden elements no longer cause a horizontal scrollbar on mobile because `overflow-x: clip` was added on html/body; also added `scroll-padding-top` for the sticky header; added favicon; reduced Services diamond scale below 400px so side cards no longer touch the viewport edge; gave the desktop hero headline a left margin; rewrote testimonials with three distinct patients and initials avatars (the old avatar images were wide clinic photos cropped into circles); emergency-banner body text black → white/90; normalized section heading sizes and the "After" pill color to brand blue; trimmed the oversized gap before the emergency banner.

## Folder Structure

```text
.
|-- ASSETS/
|   |-- BG REMOVED HERO.png
|   |-- CHAMBER.png
|   |-- DOCTOR_IMAGE.png
|   |-- LANDING PAGE.pdf
|   |-- LOGO.png
|   |-- PAITENT.png
|   |-- PAITENT2.png
|   |-- PAITENT3.png
|   `-- PAITENT4.png
|-- DESIGN.md
|-- GEMINI.md
|-- index.html
|-- jsconfig.json
|-- package-lock.json
|-- package.json
|-- postcss.config.js
|-- src/
|   |-- App.jsx
|   |-- components/
|   |   |-- layout/
|   |   |   |-- Footer.jsx
|   |   |   |-- Header.jsx
|   |   |   |-- Layout.jsx
|   |   |   `-- PhasePlaceholder.jsx
|   |   |-- sections/
|   |   |   |-- HeroSection.jsx
|   |   |   |-- ServicesSection.jsx
|   |   |   `-- TransformingSection.jsx
|   |   `-- ui/
|   |       |-- button.jsx
|   |       |-- card.jsx
|   |       `-- ScrollReveal.jsx
|   |-- lib/
|   |   `-- utils.js
|   |-- main.jsx
|   `-- styles/
|       `-- globals.css
|-- tailwind.config.js
`-- vite.config.js
```

## Completed Components

- Phase 1 layout shell.
- shadcn/ui-compatible `Button` primitive.
- shadcn/ui-compatible `Card` primitive.
- Responsive sticky header with desktop navigation and mobile hamburger menu.
- Footer scaffold using provided logo and mockup footer content.
- Global Tailwind CSS variables and theme tokens.
- Refactored Hero section to center the doctor image with fixed pixel heights to prevent scaling bugs on browser zoom. The headline is positioned absolutely on the left, and the opening-time card is grouped tightly to the right side of the doctor's wrapper, maintaining perfect proportion and alignment across screen sizes.
- Header adjusted to the Figma-style lavender-gray canvas with logo mark, centered nav, compact toggle, and account control.
- `ScrollReveal` component — lightweight IntersectionObserver-based scroll entrance animation wrapper. Supports `direction`, `delay`, `duration` props. Respects `prefers-reduced-motion`. GPU-accelerated with `translate3d`.
- Services section — 4 dental service cards (sized 190px by 230px) in a static diamond layout centered around a navy blue circle with top-right accent circle, precise corner overlaps, pure bold white title, and custom viewport scale responsiveness to prevent clipping.
- Transforming Smiles section — interactive before/after comparison slider using CSS `clip-path`. Mouse drag, touch slide (`touch-pan-y`), and keyboard arrow support. `PAITENT.png` with CSS filter for "before" effect. Treatment tags row with scroll reveal.

## Pending Tasks

- Build patient testimonials with mobile swipe behavior.
- Build clinic/contact section and emergency banner.
- Polish footer content.
- Verify desktop and mobile responsiveness against the Figma PDF.

## Notes

- Vite starts successfully in the foreground with `npm.cmd run dev -- --host 127.0.0.1`.
- Detached dev-server launch required unsandboxed execution to stay active on localhost.

## Shared appointments & slot locks

- Bookings made on `/appointment` ([api/appointments.js](api/appointments.js)) INSERT into a `appointments` table in Neon that is **shared** with the practice-management dashboard (separate repo). Schema: [db/schema.sql](db/schema.sql).
- **Overbooking model:** a booking does **not** reserve a slot — patients may book the same time repeatedly. Availability (`GET /api/appointments?date=`) returns only the slots the clinic has **locked** (`source='lock'`, non-cancelled) as `unavailable`; the booking form greys just those out.
- **Slot locks:** the dashboard blocks a slot by writing a sentinel `source='lock'` row; only then is the slot unavailable here. The POST guards each booking with an atomic `INSERT … SELECT … WHERE NOT EXISTS (… source='lock' …)` check (and a `uniq_active_lock` partial index keeps one lock per slot), so a lock added mid-request still wins → 409 `SLOT_LOCKED`. Unlocking deletes the row. This site never creates `lock` rows.
