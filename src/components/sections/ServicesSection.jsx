export function ServicesSection() {
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-[#e8ebf2] pt-20 pb-8 lg:pt-32 lg:pb-4 w-full flex items-center justify-center"
    >
      <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col items-center justify-center">
        
        {/* Title Section - positioned top-left on desktop */}
        <div className="w-full text-center lg:text-left mb-6 md:mb-8 lg:mb-0 lg:absolute lg:top-0 lg:left-0 xl:-left-8 z-30">
          <h2 className="text-[3rem] sm:text-[3.5rem] lg:text-[4rem] xl:text-[4.5rem] font-black leading-none text-[#0D99E4] select-none tracking-tight">
            Our Services
          </h2>
        </div>

        {/* Diamond Cards Section - perfectly centered */}
        <div className="w-full flex justify-center items-center relative h-[320px] min-[400px]:h-[380px] sm:h-[500px] md:h-[580px] lg:h-[640px]">
          
          {/* Responsive container scaling wrapper to prevent overflow/clipping on smaller viewports */}
          <div className="relative w-[800px] h-[560px] flex items-center justify-center scale-[0.5] min-[400px]:scale-[0.6] sm:scale-[0.8] md:scale-[0.9] lg:scale-[1.0] transition-transform duration-300 origin-center">
            
            {/* Large Center Circle - EXACT Figma Dimensions 458x458 */}
            <div className="absolute w-[458px] h-[458px] rounded-full bg-[#0D99E4] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 shadow-2xl" />
            
            {/* Small Floating Circle - top right */}
            <div className="absolute w-[80px] h-[80px] rounded-full bg-[#0D99E4] top-[-10px] right-[-10px] z-0 shadow-lg" />

            {/* Top Card - General Checkup */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[calc(50%+132px)] z-20">
              <ServiceCard img="/ASSETS/PAITENT.png" title="General Checkup" />
            </div>

            {/* Bottom Card - Cleaning & Scaling */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-[calc(-50%+132px)] z-20">
              <ServiceCard img="/ASSETS/PAITENT3.png" title="Cleaning & Scaling" />
            </div>

            {/* Left Card - Dental Crowns */}
            <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-[calc(50%+253px)] z-10">
              <ServiceCard img="/ASSETS/PAITENT2.png" title="Dental Crowns" />
            </div>

            {/* Right Card - Filling & Root Canal */}
            <div className="absolute left-1/2 top-1/2 -translate-y-1/2 translate-x-[calc(-50%+253px)] z-10">
              <ServiceCard img="/ASSETS/PAITENT4.png" title="Filling & Root Canal" />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

function ServiceCard({ img, title }) {
  // Exact Figma card dimensions: 241x252
  return (
    <div className="relative w-[241px] h-[252px] rounded-[20px] overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.15)] bg-white select-none">
      <img 
        src={img} 
        alt={title} 
        className="w-full h-full object-cover" 
      />
      
      {/* Label Pill - Matches Figma styling with color #0D99E4 */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%] bg-[#0D99E4] rounded-xl py-3 px-2 text-center shadow-md">
        <h3 className="text-white font-bold text-[14px] leading-none tracking-wide whitespace-nowrap">
          {title}
        </h3>
      </div>
    </div>
  );
}


