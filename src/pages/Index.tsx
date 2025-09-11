import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { DoctorDirectory } from "@/components/DoctorDirectory";
import { MedicalRecords } from "@/components/MedicalRecords";
import { AboutSection } from "@/components/AboutSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <DoctorDirectory />
        <MedicalRecords />
        <AboutSection />
      </main>
    </div>
  );
};

export default Index;
