import { useState, useEffect } from "react";
import { DoctorCard } from "./DoctorCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Doctor {
  id: string;
  user_id: string;
  license_number: string;
  specialty: string;
  experience_years: number;
  consultation_fee: number;
  bio: string | null;
  location: string;
  hospital_affiliation: string | null;
  rating: number;
  total_reviews: number;
  is_verified: boolean;
  is_available: boolean;
  profiles: {
    full_name: string | null;
    avatar_url?: string | null;
  } | null;
}

export const DoctorDirectory = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const { data, error } = await supabase
        .from("doctors")
        .select(`
          *,
          profiles!inner(
            full_name,
            avatar_url
          )
        `)
        .eq("is_verified", true)
        .eq("is_available", true);

      if (error) throw error;
      setDoctors((data as unknown as Doctor[]) || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load doctors",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch = 
      doctor.profiles?.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSpecialty = !selectedSpecialty || doctor.specialty === selectedSpecialty;
    const matchesLocation = !selectedLocation || doctor.location.toLowerCase().includes(selectedLocation.toLowerCase());

    return matchesSearch && matchesSpecialty && matchesLocation;
  });
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
              <SelectTrigger>
                <SelectValue placeholder="Specialty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Specialties</SelectItem>
                <SelectItem value="General Practitioner">General Practitioner</SelectItem>
                <SelectItem value="Cardiologist">Cardiologist</SelectItem>
                <SelectItem value="Pediatrician">Pediatrician</SelectItem>
                <SelectItem value="Orthopedic Surgeon">Orthopedic Surgeon</SelectItem>
                <SelectItem value="Dermatologist">Dermatologist</SelectItem>
                <SelectItem value="Neurologist">Neurologist</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Locations</SelectItem>
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
              <span>Showing {filteredDoctors.length} doctors</span>
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
          {loading ? (
            <div className="col-span-full text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="text-muted-foreground mt-2">Loading doctors...</p>
            </div>
          ) : filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
              <DoctorCard 
                key={doctor.id}
                id={doctor.id}
                name={doctor.profiles?.full_name || "Doctor"}
                specialty={doctor.specialty}
                location={doctor.location}
                rating={doctor.rating}
                reviews={doctor.total_reviews}
                experience={`${doctor.experience_years} years`}
                availability={doctor.is_available ? "Available Today" : "Not Available"}
                image={doctor.profiles?.avatar_url}
                fee={doctor.consultation_fee}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No doctors found matching your criteria.</p>
            </div>
          )}
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