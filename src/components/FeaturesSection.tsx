import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Search, FileText, Shield, Clock, Star } from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Find Doctors",
    description: "Search and compare healthcare providers by specialty, location, ratings, and availability.",
    color: "text-primary"
  },
  {
    icon: Calendar,
    title: "Book Appointments",
    description: "Schedule appointments instantly with real-time availability and automated reminders.",
    color: "text-secondary"
  },
  {
    icon: FileText,
    title: "Medical Records",
    description: "Access your complete medical history, prescriptions, and test results securely.",
    color: "text-accent"
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your health data is protected with bank-level security and privacy standards.",
    color: "text-medical-blue"
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Get help anytime with our round-the-clock customer support and telehealth options.",
    color: "text-medical-green"
  },
  {
    icon: Star,
    title: "Quality Assured",
    description: "All healthcare providers are verified and rated by real patients for quality care.",
    color: "text-kenya-red"
  }
];

export const FeaturesSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Why Choose Daktari Dial Hub?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're revolutionizing healthcare access in Kenya with technology that puts patients first.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20 bg-gradient-to-br from-card to-card/50"
              >
                <CardHeader className="text-center pb-4">
                  <div className={`inline-flex p-3 rounded-full bg-gradient-to-br from-background to-muted/50 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl font-semibold text-foreground">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};