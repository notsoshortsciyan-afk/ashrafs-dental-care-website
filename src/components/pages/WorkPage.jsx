import { Stethoscope, Sparkles, ShieldPlus, Sun, Crown, SmilePlus, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

/* ─── Service Card Data ────────────────────────────────────── */
const SERVICES = [
  {
    icon: Stethoscope,
    iconBg: "#0D99E4",
    iconColor: "#ffffff",
    title: "General Checkup",
    description:
      "Comprehensive examinations to monitor your oral health and catch potential issues early.",
  },
  {
    icon: Sparkles,
    iconBg: "#0D99E4",
    iconColor: "#ffffff",
    title: "Teeth Cleaning & Scaling",
    description:
      "Professional removal of plaque and tartar to prevent gum disease and maintain a healthy smile.",
  },
  {
    icon: ShieldPlus,
    iconBg: "#0D99E4",
    iconColor: "#ffffff",
    title: "Tooth Filling & Root Canal",
    description:
      "Effective treatments to restore decayed teeth and save severely damaged teeth from extraction.",
  },
  {
    icon: Sun,
    iconBg: "#0D99E4",
    iconColor: "#ffffff",
    title: "Teeth Whitening",
    description:
      "Professional, safe, and effective whitening treatments to brighten your smile and remove stubborn stains.",
  },
  {
    icon: Crown,
    iconBg: "#0D99E4",
    iconColor: "#ffffff",
    title: "Dental Crowns",
    description:
      "Custom-crafted caps to restore the shape, size, and strength of damaged or weakened teeth.",
  },
  {
    icon: SmilePlus,
    iconBg: "#0D99E4",
    iconColor: "#ffffff",
    title: "Dental Implants",
    description:
      "Permanent, natural-looking replacements for missing teeth that restore full function and aesthetics.",
  },
];

/* ═══════════════════════════════════════════════════════════════
   WORK PAGE
   ═══════════════════════════════════════════════════════════════ */
export function WorkPage() {
  return (
    <section className="bg-[#e8ebf2] min-h-screen pt-10 pb-20">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">

        {/* ── Page Header ─────────────────────────────────── */}
        <div className="text-center mb-12">
          <h1 className="text-[2.5rem] sm:text-[3rem] md:text-[3.5rem] font-black text-[#0D99E4] leading-tight tracking-tight">
            Our Services
          </h1>
          <p className="mt-3 mx-auto max-w-xl text-[14px] sm:text-[15px] leading-relaxed text-[#3b4963]">
            Comprehensive dental care tailored to your needs, combining advanced
            technology with compassionate expertise.
          </p>
        </div>

        {/* ── Service Cards Grid ──────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>

      </div>
    </section>
  );
}

/* ─── Service Card Component ───────────────────────────────── */
function ServiceCard({ icon: Icon, iconBg, iconColor, title, description }) {
  return (
    <div className="rounded-2xl bg-white p-7 sm:p-8 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      {/* Icon Circle */}
      <div
        className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-full mb-5"
        style={{ backgroundColor: iconBg }}
      >
        <Icon className="h-5 w-5" style={{ color: iconColor }} strokeWidth={2} />
      </div>

      {/* Title */}
      <h2 className="text-[1.25rem] sm:text-[1.4rem] font-bold text-[#0D99E4] leading-tight mb-3">
        {title}
      </h2>

      {/* Description */}
      <p className="text-[13px] sm:text-[14px] leading-relaxed text-[#3b4963] mb-6 flex-1">
        {description}
      </p>

      {/* Book Appointment Button */}
      <div className="mt-auto">
        <Link
          to="/appointment"
          className="inline-flex h-[40px] items-center gap-2 rounded-xl bg-[#0D99E4] px-5 text-[13px] font-semibold text-white shadow-sm hover:bg-[#0D99E4] transition-colors"
        >
          Book Appointment
          <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
        </Link>
      </div>
    </div>
  );
}
