import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProblemSection from '@/components/ProblemSection';
import AboutSection from '@/components/AboutSection';
import MethodologySection from '@/components/MethodologySection';
import ServicesSection from '@/components/ServicesSection';
import ResultsSection from '@/components/ResultsSection';
import IdealClientSection from '@/components/IdealClientSection';
import CTAFinalSection from '@/components/CTAFinalSection';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pt-20">
        <Hero />
        <ProblemSection />
        <section id="about">
          <AboutSection />
        </section>
        <section id="methodology">
          <MethodologySection />
        </section>
        <section id="services">
          <ServicesSection />
        </section>
        <section id="results">
          <ResultsSection />
        </section>
        <IdealClientSection />
        <CTAFinalSection />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
