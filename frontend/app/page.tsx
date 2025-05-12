import CTA from '@/components/container/landing/cta';
import Feature from '@/components/container/landing/feature';
import Hero from '@/components/container/landing/hero';
import HowItWorksSection from '@/components/container/landing/how-it-works';
import ScreenshotSection from '@/components/container/landing/screenshot-section';
import Footer from '@/components/shared/footer';

export default function LandingPage() {
  return (
    <div>
      <main className="w-full h-full container mx-auto">
        <Hero />
        <Feature />
        <HowItWorksSection />
        <ScreenshotSection />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
