import { useState, useRef, useEffect } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ChevronLeft, ChevronRight } from "lucide-react";

const treatments = [
  {
    id: 1,
    title: "Professional Whitening",
    description: "Significant shade improvement in just one session.",
    beforeImg: "/ASSETS/before1.png",
    afterImg: "/ASSETS/after1.png",
  },
  {
    id: 2,
    title: "Invisalign Treatment",
    description: "Perfect alignment achieved in 12 months.",
    beforeImg: "/ASSETS/before2.png",
    afterImg: "/ASSETS/after2.png",
  },
  {
    id: 3,
    title: "Dental Implants",
    description: "Complete restoration of function and aesthetics.",
    beforeImg: "/ASSETS/before3.png",
    afterImg: "/ASSETS/after3.png",
  },
];

export function TransformingSection() {
  return (
    <section className="relative overflow-hidden bg-[#e8ebf2] pt-8 pb-8 md:pt-12 md:pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal className="mx-auto max-w-3xl text-center mb-16 md:mb-24">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0D99E4] tracking-tight mb-4">
            Transforming Smiles
          </h2>
          <p className="text-[15px] md:text-base text-[#64748B] leading-relaxed max-w-xl mx-auto">
            See the real results of our advanced dental treatments. Drag the slider to compare before and after.
          </p>
        </ScrollReveal>

        {/* 3-Column Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {treatments.map((treatment, idx) => (
            <ScrollReveal key={treatment.id} delay={idx * 150} direction="up">
              <BeforeAfterCard {...treatment} />
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}

function BeforeAfterCard({ title, description, beforeImg, afterImg }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  // Ensure dragging stops when leaving the card or lifting mouse outside
  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    if (isDragging) {
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchend", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="flex flex-col bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 h-full">
      
      {/* Slider Area */}
      <div 
        ref={containerRef}
        className="relative w-full aspect-[4/5] bg-gray-100 overflow-hidden cursor-ew-resize select-none touch-pan-y"
        onMouseDown={(e) => { setIsDragging(true); handleMove(e.clientX); }}
        onMouseMove={handleMouseMove}
        onTouchStart={(e) => { setIsDragging(true); handleMove(e.touches[0].clientX); }}
        onTouchMove={handleTouchMove}
      >
        {/* After Image (Base Layer) */}
        <img 
          src={afterImg} 
          alt={`${title} After`} 
          className="absolute inset-0 w-full h-full object-cover pointer-events-none" 
        />
        
        {/* Before Image (Clipped Layer with Grayscale) */}
        <div 
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img 
            src={beforeImg} 
            alt={`${title} Before`} 
            className="absolute inset-0 w-full h-full object-cover grayscale brightness-90 contrast-110 pointer-events-none" 
          />
        </div>

        {/* Slider Line & Handle */}
        <div 
          className="absolute top-0 bottom-0 w-[2px] bg-white pointer-events-none shadow-sm"
          style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
        >
          {/* Handle Icon */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 md:w-8 md:h-8 bg-white rounded-full shadow-lg flex items-center justify-center text-[#0B2E59]">
            <ChevronLeft className="w-3 h-3 md:w-4 md:h-4 -mr-[2px]" />
            <ChevronRight className="w-3 h-3 md:w-4 md:h-4 -ml-[2px]" />
          </div>
        </div>

        {/* Pill Labels */}
        <div className="absolute bottom-4 left-4 bg-black/60 text-white text-[10px] md:text-[11px] font-semibold px-2.5 py-1 rounded pointer-events-none z-10">
          Before
        </div>
        <div className="absolute bottom-4 right-4 bg-[#28508F] text-white text-[10px] md:text-[11px] font-semibold px-2.5 py-1 rounded pointer-events-none z-10">
          After
        </div>
      </div>

      {/* Card Content Area */}
      <div className="p-5 md:p-6 lg:p-8 flex flex-col flex-grow bg-white">
        <h3 className="text-[1.1rem] md:text-[1.2rem] font-bold text-[#0D99E4] mb-2 leading-tight">
          {title}
        </h3>
        <p className="text-[13px] md:text-[14px] text-[#64748B] leading-relaxed">
          {description}
        </p>
      </div>
      
    </div>
  );
}
