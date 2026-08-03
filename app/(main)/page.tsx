import {
  HeroSection,
  AboutSection,
  ServicesSection,
  WhyWorkWithMeSection,
  TestimonialsSection,
  FreeResourcesSection,
  FinalCTASection,
  FAQSection,
  EventsGallery,
} from "@/components/sections";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <WhyWorkWithMeSection />
      <EventsGallery />
      <TestimonialsSection />
      <FAQSection />
      <FreeResourcesSection />
      <FinalCTASection />
    </>
  );
}
