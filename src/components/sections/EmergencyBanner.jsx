import { Phone } from "lucide-react";

export function EmergencyBanner() {
  return (
    <section className="relative overflow-hidden bg-[#0D99E4] py-14 md:py-16">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8 z-10">
        
        {/* Left Content */}
        <div className="flex items-start gap-4 md:gap-5 max-w-2xl">
          <div>
            <h2 className="text-[1.35rem] md:text-[1.65rem] font-bold text-white mb-2 md:mb-2.5">
              Experiencing a Dental Emergency?
            </h2>
            <p className="text-black text-sm md:text-[15px] leading-relaxed">
              Severe pain, swelling, or a knocked-out tooth requires immediate attention. We offer same-day emergency appointments to relieve pain and save your smile.
            </p>
          </div>
        </div>

        {/* Right Content - Button */}
        <div className="shrink-0">
          <a 
            href="tel:01670152516"
            className="inline-flex items-center gap-2.5 bg-white text-[#0D99E4] px-7 py-3.5 md:px-8 md:py-4 rounded-full font-bold text-sm md:text-[15px] hover:bg-gray-50 transition-colors shadow-lg"
          >
            <Phone className="w-4 h-4 md:w-[18px] md:h-[18px]" />
            Call Now: 01670-152516
          </a>
        </div>

      </div>
    </section>
  );
}
