import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Star,
  Plus,
} from "lucide-react";
import { Link } from "react-router-dom";

/* ═══════════════════════════════════════════════════════════════
   CONTACT PAGE
   ═══════════════════════════════════════════════════════════════ */
export function ContactPage() {
  return (
    <div className="bg-[#e8ebf2] min-h-screen">

      {/* ── Page Header ─────────────────────────────────── */}
      <section className="pt-10 pb-8">
        <div className="mx-auto w-full max-w-[1100px] px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-[2.5rem] sm:text-[3rem] md:text-[3.5rem] font-black text-[#0D99E4] leading-tight tracking-tight">
            Get in Touch
          </h1>
          <p className="mt-3 mx-auto max-w-lg text-[14px] sm:text-[15px] leading-relaxed text-[#3b4963]">
            Ready to schedule your next appointment or have a question about our services?
            Our team is here to help you achieve your best smile.
          </p>
        </div>
      </section>

      {/* ── Form + Contact Info Grid ──────────────────────── */}
      <section className="pb-14">
        <div className="mx-auto w-full max-w-[1100px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">

            {/* ═══ LEFT — Send us a Message Form ═══ */}
            <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-md">
              <div className="flex items-center gap-2 mb-6">
                <Star className="h-5 w-5 text-[#0D99E4] fill-[#0D99E4]" strokeWidth={0} />
                <h2 className="text-[1.2rem] sm:text-[1.35rem] font-bold text-[#0D99E4]">
                  Send us a Message
                </h2>
              </div>

              <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
                {/* First Name + Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[12px] font-semibold text-[#0D99E4] mb-1.5">
                      First Name
                    </label>
                    <input
                      type="text"
                      placeholder="John"
                      className="h-[42px] w-full rounded-xl border border-[#d5dbe5] bg-white px-4 text-[13px] text-[#0D99E4] placeholder:text-[#a3afc0] outline-none focus:border-[#0D99E4] focus:ring-1 focus:ring-[#0D99E4]/20 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-semibold text-[#0D99E4] mb-1.5">
                      Last Name
                    </label>
                    <input
                      type="text"
                      placeholder="Doe"
                      className="h-[42px] w-full rounded-xl border border-[#d5dbe5] bg-white px-4 text-[13px] text-[#0D99E4] placeholder:text-[#a3afc0] outline-none focus:border-[#0D99E4] focus:ring-1 focus:ring-[#0D99E4]/20 transition-colors"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-[12px] font-semibold text-[#0D99E4] mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="h-[42px] w-full rounded-xl border border-[#d5dbe5] bg-white px-4 text-[13px] text-[#0D99E4] placeholder:text-[#a3afc0] outline-none focus:border-[#0D99E4] focus:ring-1 focus:ring-[#0D99E4]/20 transition-colors"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-[12px] font-semibold text-[#0D99E4] mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className="h-[42px] w-full rounded-xl border border-[#d5dbe5] bg-white px-4 text-[13px] text-[#0D99E4] placeholder:text-[#a3afc0] outline-none focus:border-[#0D99E4] focus:ring-1 focus:ring-[#0D99E4]/20 transition-colors"
                  />
                </div>

                {/* How can we help? */}
                <div>
                  <label className="block text-[12px] font-semibold text-[#0D99E4] mb-1.5">
                    How can we help?
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your needs..."
                    className="w-full rounded-xl border border-[#d5dbe5] bg-white px-4 py-3 text-[13px] text-[#0D99E4] placeholder:text-[#a3afc0] outline-none focus:border-[#0D99E4] focus:ring-1 focus:ring-[#0D99E4]/20 transition-colors resize-none"
                  />
                </div>

                {/* Send Message Button */}
                <button
                  type="submit"
                  className="flex h-[48px] w-full items-center justify-center gap-2 rounded-2xl bg-[#0D99E4] text-white text-[15px] font-bold shadow-lg hover:bg-[#0D99E4] transition-colors"
                >
                  Send Message
                  <Send className="h-4 w-4" strokeWidth={2.5} />
                </button>
              </form>
            </div>

            {/* ═══ RIGHT — Contact Info + Clinic Hours ═══ */}
            <div className="flex flex-col gap-6">

              {/* Contact Information Card */}
              <div className="rounded-2xl bg-white p-6 shadow-md">
                <h2 className="text-[1.1rem] font-bold text-[#0D99E4] mb-5">
                  Contact Information
                </h2>

                <div className="flex flex-col gap-5">
                  {/* Clinic Address */}
                  <div className="flex items-start gap-3.5">
                    <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full bg-[#e8f0fe]">
                      <MapPin className="h-[18px] w-[18px] text-[#0D99E4]" strokeWidth={2} />
                    </div>
                    <div>
                      <h3 className="text-[12px] font-bold text-[#0D99E4] mb-0.5">Clinic Address</h3>
                      <p className="text-[12px] text-[#3b4963] leading-relaxed">
                        House-01, Road-01, Lane-02, H-Block<br />
                        Halishahar H/E, CTG<br />
                        (Opposite to Garib-E-Newaz High School)
                      </p>
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div className="flex items-start gap-3.5">
                    <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full bg-[#e8f0fe]">
                      <Phone className="h-[18px] w-[18px] text-[#0D99E4]" strokeWidth={2} />
                    </div>
                    <div>
                      <h3 className="text-[12px] font-bold text-[#0D99E4] mb-0.5">Phone Number</h3>
                      <p className="text-[12px] text-[#3b4963] leading-relaxed">
                        01670-152516, 01704-747391
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-3.5">
                    <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full bg-[#e8f0fe]">
                      <Mail className="h-[18px] w-[18px] text-[#0D99E4]" strokeWidth={2} />
                    </div>
                    <div>
                      <h3 className="text-[12px] font-bold text-[#0D99E4] mb-0.5">Email</h3>
                      <p className="text-[12px] text-[#3b4963] leading-relaxed">
                        contact@drashrafdental.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Clinic Hours Card — dark navy */}
              <div className="relative rounded-2xl bg-[#0D99E4] p-6 shadow-md overflow-hidden">
                {/* Decorative circle top-right */}
                <div className="absolute -top-4 -right-4 w-[80px] h-[80px] rounded-full bg-[#1a3a6a] opacity-60" />

                <h2 className="text-[1.1rem] font-bold text-white mb-4 relative z-10">
                  Clinic Hours
                </h2>

                <div className="flex flex-col gap-2.5 relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] text-black font-medium">Saturday to Thursday</span>
                    <span className="text-[13px] font-semibold text-white">3:00 pm - 10:00 pm</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] text-black font-medium">Friday</span>
                    <span className="text-[13px] font-semibold text-white">Closed</span>
                  </div>
                </div>

                {/* Book Appointment Button */}
                <Link
                  to="/appointment"
                  className="mt-5 flex h-[42px] w-full items-center justify-center gap-2 rounded-xl bg-[#1a4a8a] text-white text-[13px] font-semibold hover:bg-[#2a5a9a] transition-colors relative z-10"
                >
                  Book Appointment
                  <Plus className="h-4 w-4" strokeWidth={2.5} />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Visit Our Clinic Section ──────────────────────── */}
      <section className="pb-14">
        <div className="mx-auto w-full max-w-[1100px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

            {/* Left — Info */}
            <div>
              <h2 className="text-[1.75rem] sm:text-[2rem] font-bold text-[#0D99E4] tracking-tight mb-3">
                Visit Our Clinic
              </h2>
              <p className="text-[13px] sm:text-[14px] text-[#3b4963] leading-relaxed mb-8 max-w-md">
                Conveniently located in the heart of the city, our modern facility is designed for
                your comfort and peace of mind.
              </p>

              <div className="flex flex-col gap-6">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full bg-[#e8f0fe]">
                    <MapPin className="h-[16px] w-[16px] text-[#0D99E4]" strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="text-[14px] font-bold text-[#0D99E4] mb-1">Address</h3>
                    <p className="text-[13px] text-[#3b4963] leading-relaxed">
                      House-01, Road-01, Lane-02, H-Block<br />
                      Halishahar H/E, CTG<br />
                      (Opposite to Garib-E-Newaz High School)
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4">
                  <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full bg-[#e8f0fe]">
                    <Clock className="h-[16px] w-[16px] text-[#0D99E4]" strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="text-[14px] font-bold text-[#0D99E4] mb-1">Hours</h3>
                    <p className="text-[13px] text-[#3b4963] leading-relaxed">
                      Saturday - Thursday: 8:00 AM - 8:00 PM<br />
                      Friday: Closed
                    </p>
                  </div>
                </div>

                {/* Contact */}
                <div className="flex items-start gap-4">
                  <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full bg-[#e8f0fe]">
                    <Phone className="h-[16px] w-[16px] text-[#0D99E4]" strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="text-[14px] font-bold text-[#0D99E4] mb-1">Contact</h3>
                    <p className="text-[13px] text-[#3b4963] leading-relaxed">
                      Phone: 01670-152516, 01704-747391<br />
                      Email: info@dentalcare.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — Map */}
            <div className="h-[300px] sm:h-[350px] lg:h-[400px] w-full rounded-2xl overflow-hidden shadow-lg border border-gray-100">
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

          </div>
        </div>
      </section>

      {/* ── Emergency Banner ──────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#0B2E59] py-14 md:py-16">
        <div className="relative mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8 z-10">

          {/* Left Content */}
          <div className="flex items-start gap-4 md:gap-5 max-w-2xl">
            <div>
              <h2 className="text-[1.2rem] md:text-[1.4rem] font-bold text-white mb-2 md:mb-2.5">
                Experiencing a Dental Emergency?
              </h2>
              <p className="text-[#94A3B8] text-sm md:text-[14px] leading-relaxed">
                Severe pain, swelling, or a knocked-out tooth requires immediate attention. We offer
                same-day emergency appointments to relieve pain and save your smile.
              </p>
            </div>
          </div>

          {/* Right Content - Button */}
          <div className="shrink-0">
            <a
              href="tel:01670152516"
              className="inline-flex items-center gap-2.5 bg-white text-[#0B2E59] px-7 py-3.5 md:px-8 md:py-4 rounded-full font-bold text-sm md:text-[15px] hover:bg-gray-50 transition-colors shadow-lg"
            >
              <Phone className="w-4 h-4 md:w-[18px] md:h-[18px]" />
              Call Now: 01670-152516
            </a>
          </div>

        </div>
      </section>

    </div>
  );
}
