import { useEffect, useRef, useState } from "react";

/* Fixed diamond slots — exact positions taken from the original static layout.
   Cards keep their identity and only swap which slot they occupy, so the
   browser tweens the transform change into a smooth slide. */
const SLOT_STYLES = {
  top:    { transform: "translate(-50%, calc(-50% - 132px))", zIndex: 20 },
  bottom: { transform: "translate(-50%, calc(-50% + 132px))", zIndex: 20 },
  left:   { transform: "translate(calc(-50% - 253px), -50%)", zIndex: 10 },
  right:  { transform: "translate(calc(-50% + 253px), -50%)", zIndex: 10 },
};

/* Counter-clockwise Ferris-wheel order: top -> left -> bottom -> right -> top */
const SLOT_SEQUENCE = ["top", "left", "bottom", "right"];

/* startIndex into SLOT_SEQUENCE preserves the original arrangement */
const CARDS = [
  { img: "/ASSETS/PAITENT.png",  title: "General Checkup",    startIndex: 0 }, // top
  { img: "/ASSETS/PAITENT2.png", title: "Dental Crowns",      startIndex: 1 }, // left
  { img: "/ASSETS/PAITENT3.png", title: "Cleaning & Scaling", startIndex: 2 }, // bottom
  { img: "/ASSETS/PAITENT4.png", title: "Filling & Root Canal", startIndex: 3 }, // right
];

export function ServicesSection() {
  const [step, setStep] = useState(0);
  const paused = useRef(false);

  useEffect(() => {
    /* Respect reduced-motion: leave cards static in their original slots */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = setInterval(() => {
      if (!paused.current) setStep((s) => s + 1);
    }, 3000);

    return () => clearInterval(id);
  }, []);

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

          {/* Responsive container scaling wrapper to prevent overflow/clipping on smaller viewports.
              Hovering pauses the Ferris-wheel rotation. */}
          <div
            className="relative w-[800px] h-[560px] flex items-center justify-center scale-[0.5] min-[400px]:scale-[0.6] sm:scale-[0.8] md:scale-[0.9] lg:scale-[1.0] transition-transform duration-300 origin-center"
            onMouseEnter={() => { paused.current = true; }}
            onMouseLeave={() => { paused.current = false; }}
          >

            {/* Large Center Circle - EXACT Figma Dimensions 458x458 */}
            <div className="absolute w-[458px] h-[458px] rounded-full bg-[#0D99E4] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 shadow-2xl" />

            {/* Small Floating Circle - top right */}
            <div className="absolute w-[80px] h-[80px] rounded-full bg-[#0D99E4] top-[-10px] right-[-10px] z-0 shadow-lg" />

            {/* Rotating service cards — each slides to the next slot every 3s */}
            {CARDS.map((card) => {
              const slot = SLOT_SEQUENCE[(card.startIndex + step) % SLOT_SEQUENCE.length];
              const { transform, zIndex } = SLOT_STYLES[slot];
              return (
                <div
                  key={card.title}
                  className="absolute left-1/2 top-1/2"
                  style={{
                    transform,
                    zIndex,
                    willChange: "transform",
                    transition: "transform 1100ms cubic-bezier(0.65, 0, 0.35, 1)",
                  }}
                >
                  <ServiceCard img={card.img} title={card.title} />
                </div>
              );
            })}

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
