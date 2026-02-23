import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProblemSection from '@/components/ProblemSection';
import MethodologySection from '@/components/MethodologySection';
import ServicesSection from '@/components/ServicesSection';
import GuaranteeSection from '@/components/GuaranteeSection';
import ResultsSection from '@/components/ResultsSection';
import IdealClientSection from '@/components/IdealClientSection';
import AboutSection from '@/components/AboutSection';
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

        <section id="methodology">
          <MethodologySection />
        </section>

        <section id="services">
          <ServicesSection />
        </section>

        <GuaranteeSection />

        <section id="results">
          <ResultsSection />
        </section>

        <IdealClientSection />

        <section id="about">
          <AboutSection />
        </section>

        <CTAFinalSection />

        <ContactForm />

      </main>
      <Footer />
    </>
  );
}