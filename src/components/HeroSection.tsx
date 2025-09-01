import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Calendar } from "lucide-react";
import heroImage from "@/assets/hero-medical.jpg";

export const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-background via-blue-50/30 to-green-50/30 py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                Find & Book
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> Healthcare</span>
                <br />
                in Kenya
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg">
                Connect with trusted doctors, book appointments instantly, and manage your health records all in one place. Quality healthcare made accessible.
              </p>
            </div>

            {/* Quick Search */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-border/50">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Quick Find</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Doctor, clinic, or specialty" 
                    className="pl-10"
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Location" 
                    className="pl-10"
                  />
                </div>
                <Button variant="hero" className="w-full">
                  <Calendar className="h-4 w-4 mr-2" />
                  Find Doctors
                </Button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="flex-1 sm:flex-none">
                Book Appointment Now
              </Button>
              <Button variant="outline" size="lg" className="flex-1 sm:flex-none">
                View Medical Records
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Verified Doctors</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">10k+</div>
                <div className="text-sm text-muted-foreground">Happy Patients</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">24/7</div>
                <div className="text-sm text-muted-foreground">Support</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={heroImage} 
                alt="Kenyan healthcare professionals" 
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
            </div>
            
            {/* Floating Cards */}
            <div className="absolute -top-4 -left-4 bg-white rounded-lg p-4 shadow-lg border border-border/50">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-medical-green rounded-full"></div>
                <span className="text-sm font-medium">Online Consultations</span>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -right-4 bg-white rounded-lg p-4 shadow-lg border border-border/50">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span className="text-sm font-medium">Secure Records</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};