import { Card, CardContent } from "@/components/ui/card";
import { Users, Award, Clock, Shield } from "lucide-react";

export const AboutSection = () => {
  const stats = [
    {
      icon: Users,
      number: "500+",
      label: "Verified Doctors",
      description: "Qualified healthcare professionals"
    },
    {
      icon: Award,
      number: "10K+",
      label: "Happy Patients",
      description: "Satisfied with our services"
    },
    {
      icon: Clock,
      number: "24/7",
      label: "Support",
      description: "Round-the-clock assistance"
    },
    {
      icon: Shield,
      number: "100%",
      label: "Secure",
      description: "Your data is protected"
    }
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            About HealthConnect
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We're revolutionizing healthcare in Kenya by connecting patients with trusted medical professionals 
            through our innovative platform. Quality healthcare made accessible for everyone.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <stat.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-foreground mb-2">{stat.number}</h3>
                <p className="text-lg font-medium text-foreground mb-1">{stat.label}</p>
                <p className="text-sm text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-6">Our Mission</h3>
            <p className="text-muted-foreground mb-4">
              To make quality healthcare accessible to every Kenyan by providing a seamless platform 
              that connects patients with verified healthcare professionals.
            </p>
            <p className="text-muted-foreground mb-4">
              We believe that everyone deserves access to quality healthcare, regardless of their location 
              or economic status. Our platform breaks down barriers and makes it easier than ever to 
              find, connect with, and receive care from qualified medical professionals.
            </p>
            <p className="text-muted-foreground">
              Through technology and innovation, we're building a healthier Kenya, one patient at a time.
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="bg-primary/10 p-6 rounded-lg">
              <h4 className="font-semibold text-foreground mb-2">Verified Professionals</h4>
              <p className="text-sm text-muted-foreground">
                All our healthcare providers are thoroughly vetted and verified to ensure quality care.
              </p>
            </div>
            
            <div className="bg-secondary/10 p-6 rounded-lg">
              <h4 className="font-semibold text-foreground mb-2">Secure Platform</h4>
              <p className="text-sm text-muted-foreground">
                Your medical data is encrypted and stored securely with the highest privacy standards.
              </p>
            </div>
            
            <div className="bg-accent/10 p-6 rounded-lg">
              <h4 className="font-semibold text-foreground mb-2">Easy Booking</h4>
              <p className="text-sm text-muted-foreground">
                Book appointments instantly with real-time availability and automated reminders.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};