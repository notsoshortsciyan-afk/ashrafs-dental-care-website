import { MapPin, Clock, Phone } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function ContactSection() {
  return (
    <section className="bg-[#e8ebf2] pt-8 pb-20 md:pt-8 md:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column - Contact Info */}
          <ScrollReveal direction="left" className="flex flex-col">
            <h2 className="text-4xl md:text-[2.75rem] font-bold text-[#0D99E4] tracking-tight mb-4">
              Visit Our Clinic
            </h2>
            <p className="text-[#64748B] text-[15px] md:text-base mb-10 max-w-md leading-relaxed">
              Conveniently located in the heart of the city, our modern facility is designed for your comfort and peace of mind.
            </p>

            <div className="space-y-8">
              {/* Info Item 1 */}
              <div className="flex items-start gap-5">
                <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#D6E6F5]">
                  <MapPin className="h-5 w-5 text-[#38bdf8]" />
                </div>
                <div>
                  <h4 className="text-[15px] font-bold text-[#0D99E4] mb-1.5">Address</h4>
                  <p className="text-[14px] text-[#64748B] leading-relaxed">
                    House-01, Road-01, Lane-02, H-Block<br />
                    Halishahar H/E, CTG<br />
                    (Opposite to Garib-E-Newaz High School)
                  </p>
                </div>
              </div>

              {/* Info Item 2 */}
              <div className="flex items-start gap-5">
                <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#D6E6F5]">
                  <Clock className="h-5 w-5 text-[#38bdf8]" />
                </div>
                <div>
                  <h4 className="text-[15px] font-bold text-[#0D99E4] mb-1.5">Hours</h4>
                  <p className="text-[14px] text-[#64748B] leading-relaxed">
                    Saturday - Thursday: 8:00 AM - 8:00 PM<br />
                    Friday: Closed
                  </p>
                </div>
              </div>

              {/* Info Item 3 */}
              <div className="flex items-start gap-5">
                <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#D6E6F5]">
                  <Phone className="h-5 w-5 text-[#38bdf8]" />
                </div>
                <div>
                  <h4 className="text-[15px] font-bold text-[#0D99E4] mb-1.5">Contact</h4>
                  <p className="text-[14px] text-[#64748B] leading-relaxed">
                    Phone: 01670-152516, 01704-747391<br />
                    Email: info@dentalcare.com
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column - Map */}
          <ScrollReveal direction="right" className="h-full w-full">
            <div className="h-[350px] md:h-[450px] w-full rounded-[24px] overflow-hidden shadow-lg border border-gray-100">
              <iframe 
                src="https://maps.google.com/maps?q=Ashraf's%20Dental%20Care,%20Halishahar,%20Chattogram&t=&z=16&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Clinic Location"
              />
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
