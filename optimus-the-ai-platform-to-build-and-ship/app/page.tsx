import { Navigation } from "@/components/landing/navigation";
import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { CtaSection } from "@/components/landing/cta-section";
import { FooterSection } from "@/components/landing/footer-section";
import { LanguageProvider } from "@/components/landing/language-context";

export default function Home() {
  return (
    <LanguageProvider>
      <main className="relative min-h-screen overflow-x-hidden noise-overlay">
        <Navigation />
      <HeroSection />
      <FeaturesSection />
      <CtaSection />
        <FooterSection />
      </main>
    </LanguageProvider>
  );
}
