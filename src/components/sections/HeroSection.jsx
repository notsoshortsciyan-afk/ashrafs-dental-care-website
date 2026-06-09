import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

export function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden bg-[#e8ebf2]">

      {/* ── Background Band — docbg.png ── */}
      <div className="hidden md:block absolute bottom-0 left-0 w-full h-[122px] z-0 pointer-events-none">
        <img
          src="/ASSETS/ASSETS/docbg.png"
          alt=""
          className="w-full h-full object-cover object-center"
          aria-hidden="true"
        />
      </div>

      {/* ═══════════════════════════════════════════════
          DESKTOP LAYOUT (md+) — absolute positioned
          ═══════════════════════════════════════════════ */}
      <div className="hidden md:flex relative mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 h-[650px] lg:h-[calc(100vh-80px)] lg:max-h-[1000px] items-center">

        {/* Headline */}
        <div className="absolute left-4 sm:left-8 lg:left-0 xl:-left-4 top-[40%] -translate-y-1/2 z-0 pointer-events-none">
          <h1 className="text-[4rem] lg:text-[4.5rem] xl:text-[5rem] font-black uppercase leading-[1.05] tracking-tight text-[#0D99E4] select-none text-left">
            Smile
            <span className="block">With</span>
            <span className="block">Confidence</span>
          </h1>
        </div>

        {/* Doctor Image */}
        <img
          src="/ASSETS/new image.png"
          alt="Dr. Ashraf"
          className="absolute bottom-0 left-[40%] lg:left-[37%] xl:left-[37%] -translate-x-1/2 h-[95%] xl:h-[98%] max-h-[900px] w-auto object-contain object-bottom z-10 pointer-events-none"
        />

        {/* Opening Time Card */}
        <Card className="absolute top-[30%] right-4 sm:right-8 lg:right-0 xl:right-0 z-20 w-[300px] sm:w-[340px] xl:w-[380px] rounded-2xl border-0 bg-white p-0 shadow-2xl pointer-events-auto">
          <div className="px-3 pt-3">
            <img
              src="/ASSETS/CHAMBER.png"
              alt="Ashrafs Dental Clinic interior"
              className="h-[150px] xl:h-[180px] w-full rounded-xl object-cover"
            />
          </div>
          <CardContent className="p-5 xl:p-6 pt-5">
            <h2 className="text-base xl:text-lg font-bold text-foreground">
              Opening time
            </h2>
            <div className="mt-4 grid grid-cols-[1fr_auto] gap-4 text-[13px] xl:text-sm leading-snug text-foreground">
              <p>
                Saturday to
                <span className="block">Thursday</span>
              </p>
              <p className="text-right">
                3:00 pm-
                <span className="block">10:00 pm</span>
              </p>
            </div>
            <Link
              to="/appointment"
              className="mt-5 inline-flex h-10 w-fit items-center rounded-[10px] bg-[#0D99E4] hover:bg-[#0D99E4]/90 px-5 text-[13px] xl:text-[14px] font-semibold text-white shadow-sm transition-colors"
            >
              <span>Appointment</span>
              <div className="w-[1.5px] h-[18px] bg-white mx-3 opacity-90"></div>
              <Plus className="h-5 w-5 shrink-0" strokeWidth={2.5} aria-hidden="true" />
            </Link>
          </CardContent>
        </Card>

      </div>

      {/* ═══════════════════════════════════════════════
          MOBILE LAYOUT (below md) — stacked flow
          ═══════════════════════════════════════════════ */}
      <div className="flex flex-col md:hidden w-full">

        {/* Top section: Headline beside doctor image */}
        <div className="relative w-full overflow-hidden">

          {/* Mobile Background Band — docbg.png */}
          <div className="absolute bottom-0 left-0 w-full h-[25%] min-[400px]:h-[28%] sm:h-[30%] z-0 pointer-events-none">
            <img
              src="/ASSETS/ASSETS/docbg.png"
              alt=""
              className="w-full h-full object-cover object-center"
              aria-hidden="true"
            />
          </div>

          {/* Headline — left side, positioned higher to clear the laptop */}
          <div className="absolute left-4 sm:left-8 top-[20%] min-[400px]:top-[25%] z-20 pointer-events-none">
            <h1 className="text-[1.5rem] min-[400px]:text-[1.75rem] sm:text-[2.25rem] font-black uppercase leading-[1.05] tracking-tight text-[#0D99E4] select-none text-left drop-shadow-md">
              Smile
              <span className="block">With</span>
              <span className="block">Confidence</span>
            </h1>
          </div>

          {/* Doctor Image — relative positioning defines the container height natively, removing top blank space */}
          <img
            src="/ASSETS/new image.png"
            alt="Dr. Ashraf"
            className="relative w-[115%] min-[400px]:w-[105%] sm:w-[95%] max-w-[600px] ml-auto -mr-[20%] min-[400px]:-mr-[10%] h-auto object-contain object-bottom z-10 pointer-events-none"
          />
        </div>

        {/* Opening Time Card — full-width below doctor */}
        <div className="px-5 sm:px-8 pb-8 pt-4">
          <Card className="w-full rounded-2xl border-0 bg-white p-0 shadow-xl">
            <div className="px-3 pt-3">
              <img
                src="/ASSETS/CHAMBER.png"
                alt="Ashrafs Dental Clinic interior"
                className="h-[160px] sm:h-[180px] w-full rounded-xl object-cover"
              />
            </div>
            <CardContent className="p-5 pt-5">
              <h2 className="text-base font-bold text-foreground">
                Opening time
              </h2>
              <div className="mt-3 grid grid-cols-[1fr_auto] gap-4 text-[13px] leading-snug text-foreground">
                <p>
                  Saturday to
                  <span className="block">Thursday</span>
                </p>
                <p className="text-right">
                  3:00 pm-
                  <span className="block">10:00 pm</span>
                </p>
              </div>
              <Link
                to="/appointment"
                className="mt-5 inline-flex h-10 w-fit items-center rounded-[10px] bg-[#0D99E4] hover:bg-[#0D99E4]/90 px-5 text-[13px] font-semibold text-white shadow-sm transition-colors"
              >
                <span>Appointment</span>
                <div className="w-[1.5px] h-[18px] bg-white mx-3 opacity-90"></div>
                <Plus className="h-5 w-5 shrink-0" strokeWidth={2.5} aria-hidden="true" />
              </Link>
            </CardContent>
          </Card>
        </div>

      </div>

    </section>
  );
}
