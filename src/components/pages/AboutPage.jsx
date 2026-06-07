import {
  ArrowRight,
  BadgeCheck,
  GraduationCap,
  Briefcase,
  Check,
  Stethoscope,
} from "lucide-react";
import { Link } from "react-router-dom";

/* ═══════════════════════════════════════════════════════════════
   ABOUT PAGE
   ═══════════════════════════════════════════════════════════════ */
export function AboutPage() {
  return (
    <div className="bg-[#e8ebf2] min-h-screen">

      {/* ── Hero Section ──────────────────────────────────── */}
      <section className="pt-8 sm:pt-12 pb-16 overflow-hidden">
        <div className="mx-auto w-full max-w-[1100px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

            {/* Left — Text */}
            <div>
              <h1 className="text-[2.5rem] sm:text-[3rem] md:text-[3.5rem] lg:text-[4rem] font-black text-[#0D99E4] leading-[1.05] tracking-tight mb-6">
                Expertise You<br />Can Trust.
              </h1>
              <p className="text-[13px] sm:text-[14px] leading-relaxed text-[#3b4963] max-w-md mb-8">
                At Dr. Ashraf Dental Care, we believe that a healthy smile is the foundation of
                overall well-being. Our practice is built on a commitment to excellence, utilizing
                advanced technology and personalized care to ensure every patient leaves with
                confidence.
              </p>
              <Link
                to="/appointment"
                className="inline-flex h-[42px] items-center gap-2 rounded-xl bg-[#0D99E4] px-6 text-[13px] font-semibold text-white shadow-sm hover:bg-[#0D99E4] transition-colors"
              >
                Book an Appointment
                <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
              </Link>
            </div>

            {/* Right — Doctor Image */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[420px]">
                {/* Subtle gradient background behind image */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#c8d4e8] via-[#dde3ef] to-[#e8ebf2]" />
                <img
                  src="/ASSETS/newabout.jpg"
                  alt="Dr. Ashraf"
                  className="relative w-full h-auto object-contain z-10 rounded-2xl"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Meet Dr. Ashraf ───────────────────────────────── */}
      <section className="pb-14">
        <div className="mx-auto w-full max-w-[1100px] px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-[1.75rem] sm:text-[2rem] md:text-[2.25rem] font-bold text-[#0D99E4] tracking-tight mb-3">
            Meet Dr. Ashraf
          </h2>
          <p className="mx-auto max-w-lg text-[13px] sm:text-[14px] leading-relaxed text-[#3b4963]">
            A passionate practitioner dedicated to advancing dental health through continuous learning
            and compassionate patient care.
          </p>
        </div>
      </section>

      {/* ── Philosophy + Specializations ──────────────────── */}
      <section className="pb-14">
        <div className="mx-auto w-full max-w-[1100px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 items-start">

            {/* Left — Philosophy of Care */}
            <div>
              <h2 className="text-[1.5rem] sm:text-[1.75rem] font-bold text-[#0D99E4] tracking-tight mb-5">
                Philosophy of Care
              </h2>
              <p className="text-[13px] sm:text-[14px] leading-relaxed text-[#3b4963] mb-6 italic">
                "My approach to dentistry goes beyond treating teeth; it's about treating the whole person. I believe in
                fostering a collaborative relationship with my patients, where education and preventative care are just as
                important as restorative treatments. We utilize minimally invasive techniques to preserve natural tooth
                structure whenever possible, ensuring long-term oral health and a beautiful smile."
              </p>
              <div className="flex items-center gap-2">
                <BadgeCheck className="h-5 w-5 text-[#0D99E4]" strokeWidth={2} />
                <span className="text-[13px] font-bold text-[#0D99E4] underline underline-offset-2">
                  Board Certified Dental Surgeon
                </span>
              </div>
            </div>

            {/* Right — Specializations Card */}
            <div className="rounded-2xl bg-[#0D99E4] p-6 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <Stethoscope className="h-5 w-5 text-white" strokeWidth={2} />
                <h3 className="text-[1.1rem] font-bold text-white">Specializations</h3>
              </div>
              <p className="text-[13px] text-black font-medium leading-relaxed mb-5">
                Focusing on complex restorative and cosmetic procedures.
              </p>
              <div className="flex flex-col gap-3">
                {["Implantology", "Cosmetic Veneers", "Full Mouth Rehabilitation"].map((item) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 text-[#38bdf8] shrink-0" strokeWidth={3} />
                    <span className="text-[13px] text-white font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Education + Experience Cards ──────────────────── */}
      <section className="pb-20">
        <div className="mx-auto w-full max-w-[1100px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            {/* Education Card */}
            <div className="rounded-2xl bg-white p-6 sm:p-7 shadow-md">
              <div className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-[#e8f0fe] mb-5">
                <GraduationCap className="h-5 w-5 text-[#0D99E4]" strokeWidth={2} />
              </div>
              <h3 className="text-[1.1rem] sm:text-[1.2rem] font-bold text-[#0D99E4] mb-4">
                Education
              </h3>
              <ul className="flex flex-col gap-3">
                <li className="text-[13px] text-[#3b4963] leading-relaxed">
                  BDS (Chittagong Medical College)
                </li>
                <li className="text-[13px] text-[#3b4963] leading-relaxed">
                  PGT (Orthodontics)
                </li>
              </ul>
            </div>

            {/* Experience Card */}
            <div className="rounded-2xl bg-white p-6 sm:p-7 shadow-md">
              <div className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-[#e8f0fe] mb-5">
                <Briefcase className="h-5 w-5 text-[#0D99E4]" strokeWidth={2} />
              </div>
              <h3 className="text-[1.1rem] sm:text-[1.2rem] font-bold text-[#0D99E4] mb-4">
                Experience
              </h3>
              <ul className="flex flex-col gap-3">
                <li className="text-[13px] text-[#3b4963] leading-relaxed">
                  FICOI (USA) (Dental implant)
                </li>
                <li className="text-[13px] text-[#3b4963] leading-relaxed">
                  Specially trained in Smile Design
                </li>
                <li className="text-[13px] text-[#3b4963] leading-relaxed">
                  BMDC 9915
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
