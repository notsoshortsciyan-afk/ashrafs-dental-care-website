import { Star } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const testimonials = [
  {
    id: 1,
    name: "Tanvir Ahmed",
    treatment: "Root Canal Treatment",
    text: "I came in with severe pain and left the same day completely relieved. Dr. Ashraf explained every step before doing it, which made the whole procedure feel easy.",
    rating: 5,
  },
  {
    id: 2,
    name: "Nusrat Jahan",
    treatment: "Scaling & Polishing",
    text: "I've always been anxious about the dentist, but this clinic completely changed that. The staff is so welcoming and the environment is incredibly calming.",
    rating: 5,
  },
  {
    id: 3,
    name: "Rafiqul Islam",
    treatment: "Dental Crown",
    text: "Excellent work on my crown — it matches my natural teeth perfectly. The clinic is clean, modern, and appointments always start on time.",
    rating: 5,
  },
];

const avatarColors = [
  "bg-[#0D99E4]",
  "bg-[#0B7BC0]",
  "bg-[#38bdf8]",
];

export function TestimonialsSection() {
  return (
    <section className="bg-[#e8ebf2] py-8 md:py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <ScrollReveal className="text-center mb-16 md:mb-20">
          <h2 className="text-4xl md:text-[2.75rem] font-bold text-[#0D99E4] tracking-tight mb-4">
            Patient Stories
          </h2>
          <p className="text-[#64748B] text-[15px] md:text-base">
            Read what our patients have to say about their experience with us.
          </p>
        </ScrollReveal>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.id} delay={i * 150} direction="up">
              <div className="bg-white rounded-[24px] p-8 shadow-sm hover:shadow-md transition-shadow h-full">
                {/* User Info */}
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className={`flex w-14 h-14 shrink-0 items-center justify-center rounded-full ${avatarColors[i % avatarColors.length]} text-white text-lg font-bold shadow-sm`}
                    aria-hidden="true"
                  >
                    {t.name.split(" ").map((part) => part[0]).join("")}
                  </div>
                  <div>
                    <h3 className="text-[#0D99E4] font-bold text-sm md:text-base leading-tight">
                      {t.name}
                    </h3>
                    <p className="text-[#64748B] text-xs md:text-[13px] mb-1">
                      {t.treatment}
                    </p>
                    <div className="flex items-center gap-[2px]">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#38bdf8] text-[#38bdf8]" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-[#64748B] text-[14px] md:text-[15px] italic leading-relaxed">
                  "{t.text}"
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
