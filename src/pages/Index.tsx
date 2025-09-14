import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { DoctorDirectory } from "@/components/DoctorDirectory";
import { MedicalRecords } from "@/components/MedicalRecords";
import { AboutSection } from "@/components/AboutSection";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";

const Index = () => {
  return (
    <>
      <SEOHead />
      <div className="min-h-screen bg-background">
        <Header />
        <main>
        <HeroSection />
        <section id="features">
          <FeaturesSection />
        </section>
        <section id="doctors">
          <DoctorDirectory />
        </section>
        <section id="records">
          <MedicalRecords />
        </section>
        <section id="about">
          <AboutSection />
        </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
