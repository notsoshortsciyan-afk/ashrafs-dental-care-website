import { Share2, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#383838] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-10 lg:gap-20 py-16 lg:py-20 md:grid-cols-[1.5fr_1fr_1fr]">
        <div className="flex flex-col">
          <div className="mb-5 flex items-center gap-3">
            <img
              src="/ASSETS/LOGO.png"
              alt="Ashrafs Dental Clinic Logo"
              className="h-8 w-8 object-contain"
            />
            <p className="text-[1.1rem] font-bold tracking-wide">Ashrafs Dental Clinic</p>
          </div>
          <p className="max-w-sm text-[15px] leading-relaxed text-white/70 mb-8">
            Committed to delivering excellence in modern dentistry with a focus on
            patient comfort and clinical clarity.
          </p>
          
          <div className="flex items-center gap-4">
            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors">
              <Share2 className="h-4 w-4 text-white" />
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors">
              <Mail className="h-4 w-4 text-white" />
            </button>
          </div>
        </div>

        <div className="pt-2">
          <h2 className="mb-6 text-[13px] font-bold uppercase tracking-widest text-white">
            PATIENT RESOURCES
          </h2>
          <ul className="space-y-4 text-[14px] font-medium text-white/80">
            <li><a href="#" className="hover:text-white transition-colors">Patient Portal</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Emergency Care</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Our Locations</a></li>
          </ul>
        </div>

        <div className="pt-2">
          <h2 className="mb-6 text-[13px] font-bold uppercase tracking-widest text-white">
            LEGAL
          </h2>
          <ul className="space-y-4 text-[14px] font-medium text-white/80">
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      
      {/* Subtle bottom border line to cap it off */}
      <div className="border-t border-white/5"></div>
    </footer>
  );
}
