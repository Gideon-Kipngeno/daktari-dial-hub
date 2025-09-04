import { DoctorCard } from "./DoctorCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";

const sampleDoctors = [
  {
    name: "Sarah Wanjiku",
    specialty: "General Practitioner",
    location: "Nairobi CBD",
    rating: 4.8,
    reviews: 124,
    experience: "8 years",
    availability: "Available Today",
    fee: "KSh 2,500"
  },
  {
    name: "James Ochieng",
    specialty: "Cardiologist",
    location: "Westlands, Nairobi",
    rating: 4.9,
    reviews: 89,
    experience: "12 years",
    availability: "Next Slot: Tomorrow",
    fee: "KSh 5,000"
  },
  {
    name: "Grace Akinyi",
    specialty: "Pediatrician",
    location: "Karen, Nairobi",
    rating: 4.7,
    reviews: 156,
    experience: "6 years",
    availability: "Available Today",
    fee: "KSh 3,000"
  },
  {
    name: "Michael Kiprop",
    specialty: "Orthopedic Surgeon",
    location: "Mombasa",
    rating: 4.6,
    reviews: 73,
    experience: "15 years",
    availability: "Next Slot: Monday",
    fee: "KSh 6,500"
  },
  {
    name: "Catherine Muthoni",
    specialty: "Dermatologist",
    location: "Kisumu",
    rating: 4.8,
    reviews: 91,
    experience: "9 years",
    availability: "Available Today",
    fee: "KSh 4,000"
  },
  {
    name: "David Wekesa",
    specialty: "Neurologist",
    location: "Nakuru",
    rating: 4.9,
    reviews: 67,
    experience: "11 years",
    availability: "Next Slot: Wednesday",
    fee: "KSh 7,000"
  }
];

export const DoctorDirectory = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Find Your Perfect Healthcare Provider
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse through our network of verified healthcare professionals across Kenya.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-border/50 mb-12">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search by name, specialty, or location..." 
                className="pl-10"
              />
            </div>
            
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Specialty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General Practitioner</SelectItem>
                <SelectItem value="cardiology">Cardiologist</SelectItem>
                <SelectItem value="pediatrics">Pediatrician</SelectItem>
                <SelectItem value="orthopedics">Orthopedic Surgeon</SelectItem>
                <SelectItem value="dermatology">Dermatologist</SelectItem>
                <SelectItem value="neurology">Neurologist</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nairobi">Nairobi</SelectItem>
                <SelectItem value="mombasa">Mombasa</SelectItem>
                <SelectItem value="kisumu">Kisumu</SelectItem>
                <SelectItem value="nakuru">Nakuru</SelectItem>
                <SelectItem value="eldoret">Eldoret</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>Showing {sampleDoctors.length} doctors</span>
              <Button variant="ghost" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
            
            <Select defaultValue="rating">
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Sort by Rating</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="availability">Availability</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Doctor Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {sampleDoctors.map((doctor, index) => (
            <DoctorCard key={index} {...doctor} />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Doctors
          </Button>
        </div>
      </div>
    </section>
  );
};