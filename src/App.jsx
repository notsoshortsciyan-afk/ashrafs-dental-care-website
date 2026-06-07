import { Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TransformingSection } from "@/components/sections/TransformingSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { EmergencyBanner } from "@/components/sections/EmergencyBanner";
import { AppointmentPage } from "@/components/pages/AppointmentPage";
import { WorkPage } from "@/components/pages/WorkPage";
import { ContactPage } from "@/components/pages/ContactPage";
import { AboutPage } from "@/components/pages/AboutPage";

function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <TransformingSection />
      <TestimonialsSection />
      <ContactSection />
      <EmergencyBanner />
    </>
  );
}

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/appointment" element={<AppointmentPage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Layout>
  );
}
