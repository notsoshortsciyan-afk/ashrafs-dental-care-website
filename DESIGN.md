# Design Specification

## Source Files

- Mockup: `ASSETS/LANDING PAGE.pdf`
- Logo: `ASSETS/LOGO.png` `1024x1024`
- Hero image: `ASSETS/DOCTOR_IMAGE.png` `1672x941`
- Transparent hero image: `ASSETS/BG REMOVED HERO.png` `1672x941`
- Clinic image: `ASSETS/CHAMBER.png` `1446x1088`
- Dental treatment image: `ASSETS/PAITENT.png` `1800x1200`
- Patient/testimonial images:
  - `ASSETS/PAITENT2.png` `482x504`
  - `ASSETS/PAITENT3.png` `518x542`
  - `ASSETS/PAITENT4.png` `486x509`

## Page Content From Mockup

- Navigation: `Home`, `About`, `Work`, `Contact`
- Hero headline: `SMILE WITH CONFIDENCE`
- Hero floating card:
  - Title: `Opening time`
  - Days: `Saturday to Thursday`
  - CTA: `Appointment`
  - Time: `3:00 pm-10:00 pm`
- Services heading: `Our Services`
- Service cards:
  - `General Checkup`
  - `Filling & Root Canal`
  - `Dental Crowns`
  - `Cleaning & Scaling`
- Transforming section:
  - Heading: `Transforming Smiles`
  - Supporting copy: `See the real results of our advanced dental treatments. Drag the slider to compare before and after.`
  - Items: `Professional Whitening`, `Invisalign Treatment`, `Dental Implants`
  - Labels: `Before`, `After`
- Testimonials:
  - Heading: `Patient Stories`
  - Supporting copy: `Read what our patients have to say about their experience with us.`
  - Name: `Michael Rodriguez`
  - Treatment: `General Checkup`
  - Quote: `"I've always been anxious about the dentist, but this clinic completely changed that. The staff is so welcoming and the environment is incredibly calming."`
- Clinic section:
  - Heading: `Visit Our Clinic`
  - Supporting copy: `Conveniently located in the heart of the city, our modern facility is designed for your comfort and peace of mind.`
  - Address: `123 Clinical Clarity Blvd, Suite 400, New York, NY 10001`
  - Hours: `Saturday - Thursday: 8:00 AM - 8:00 PM`, `Friday: Closed`
  - Contact: `Phone: (555) 123-4567`, `Email: info@dentalcare.com`
- Emergency banner:
  - Heading: `Experiencing a Dental Emergency?`
  - Copy: `Severe pain, swelling, or a knocked-out tooth requires immediate attention. We offer same-day emergency appointments to relieve pain and save your smile.`
  - CTA: `Call Now: (555) 123-4567`
- Footer:
  - Brand: `Ashrafs Dental Clinic`
  - Copy: `Committed to delivering excellence in modern dentistry with a focus on patient comfort and clinical clarity.`
  - Patient resources: `Patient Portal`, `Emergency Care`, `Our Locations`
  - Legal: `Privacy Policy`, `Terms of Service`

## Color Palette

- Primary navy: `#0B2E59` for dark emergency/footer surfaces.
- Primary blue: `#1D4ED8` for CTAs, active states, icons, and key highlights.
- Soft dental blue: `#EAF6FF` for subtle section backgrounds and light UI fills.
- Sky accent: `#38BDF8` for comparison slider handles, badges, and small highlights.
- Page background: `#F8FAFC` for clean off-white sections.
- Card background: `#FFFFFF` for cards and floating panels.
- Border gray: `#E2E8F0` for card outlines and separators.
- Muted text: `#64748B` for secondary descriptions.
- Body text: `#334155` for paragraph copy.
- Heading text: `#0F172A` for high-contrast headings.

## Typography

- Font family: modern sans-serif, preferably `Inter` or the default Tailwind sans stack.
- Hero heading: uppercase, bold, tight line-height, desktop `64-80px`, mobile `42-52px`.
- Section headings: bold, desktop `40-48px`, mobile `30-36px`.
- Card headings: semibold, `18-22px`.
- Body copy: regular, `16-18px`, relaxed line-height.
- Navigation: medium, `14-16px`.
- CTAs: semibold, `14-16px`.

## Spacing & Layout Rules

- Max content width: `1200-1280px`.
- Section vertical padding: desktop `88-120px`, tablet `72px`, mobile `48-56px`.
- Container horizontal padding: desktop `32px`, tablet `24px`, mobile `16px`.
- Card radius: `8-16px`, with the more polished hero/opening cards allowed to use larger soft radii if matching the mockup.
- Shadows: subtle, diffuse, minimal; avoid heavy elevation.
- Hero layout: relative container with text on the left and `DOCTOR_IMAGE.png` anchored right.
- Hero container constraint: never use unconstrained `vw` positioning for hero absolute elements. Use a centered max-width container such as `max-w-7xl mx-auto relative`, and anchor all hero absolute layers inside it.
- Hero image blending: apply `mix-blend-darken` directly to the `DOCTOR_IMAGE.png` element so the light image background blends into the page.
- Hero z-index layering: headline must be pure white `#FFFFFF` behind the doctor (`z-0` text, `z-10` doctor). The floating opening-time card overlaps the doctor's lower torso/arm at the highest layer (`z-20`).
- Floating opening-time card: absolute/grid-positioned on desktop and becomes an in-flow card on mobile to preserve margins.
- Services layout: circular arrangement on desktop; transition to `2x2` grid on tablet and single-column or compact grid on small mobile.
- Transforming section: use interactive before/after comparison slider with draggable vertical divider.
- Testimonials: desktop cards in a row; mobile horizontal snap/swipe carousel.
- Contact section: clinic/map visual and contact details should sit side-by-side on desktop and stack on mobile.
- Localized contact data: use `123 Clinical Avenue, Chittagong, Bangladesh`, `+880 1711-000000`, and `info@ashrafsdental.com`.

## Asset Mapping

- `LOGO.png`: brand mark in header and footer.
- `BG REMOVED HERO.png`: primary hero doctor image for the Figma-matched hero composition.
- `DOCTOR_IMAGE.png`: fallback hero image with original background, object-position right center, preserve left whitespace for headline.
- `CHAMBER.png`: clinic/contact visual or map/clinic placeholder area.
- `PAITENT.png`: before/after comparison source imagery, cropped for dental-treatment context.
- `PAITENT2.png`, `PAITENT3.png`, `PAITENT4.png`: testimonial cards and patient story imagery.

## Interaction Requirements

- Mobile navigation collapses to a hamburger menu.
- CTA buttons use shadcn/ui `Button` styling with Tailwind theme tokens.
- Cards use shadcn/ui `Card` primitives where appropriate.
- Before/after slider supports mouse, touch, keyboard-friendly range input behavior, and visible `Before` / `After` labels.
- Testimonial mobile carousel uses horizontal overflow with scroll snap.
- Responsive behavior must avoid clipping, overlap, and layout shift across desktop, tablet, and mobile.
