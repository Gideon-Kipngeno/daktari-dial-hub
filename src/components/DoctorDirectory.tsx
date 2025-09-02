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

const sampleDoctors: Doctor[] = [
  {
    id: "1",
    user_id: "1",
    license_number: "KMP-001-2023",
    specialty: "General Practitioner",
    experience_years: 8,
    consultation_fee: 2500,
    bio: "Experienced general practitioner with a passion for primary healthcare.",
    location: "Nairobi CBD",
    hospital_affiliation: "Nairobi Hospital",
    rating: 4.8,
    total_reviews: 124,
    is_verified: true,
    is_available: true,
    profiles: {
      full_name: "Sarah Wanjiku",
      avatar_url: null
    }
  },
  {
    id: "2",
    user_id: "2",
    license_number: "KMP-002-2023",
    specialty: "Cardiologist",
    experience_years: 12,
    consultation_fee: 5000,
    bio: "Specialist in cardiovascular diseases with extensive experience in interventional cardiology.",
    location: "Westlands, Nairobi",
    hospital_affiliation: "Aga Khan University Hospital",
    rating: 4.9,
    total_reviews: 89,
    is_verified: true,
    is_available: true,
    profiles: {
      full_name: "James Ochieng",
      avatar_url: null
    }
  },
  {
    id: "3",
    user_id: "3",
    license_number: "KMP-003-2023",
    specialty: "Pediatrician",
    experience_years: 6,
    consultation_fee: 3000,
    bio: "Dedicated pediatrician committed to child health and development.",
    location: "Karen, Nairobi",
    hospital_affiliation: "MP Shah Hospital",
    rating: 4.7,
    total_reviews: 156,
    is_verified: true,
    is_available: true,
    profiles: {
      full_name: "Grace Akinyi",
      avatar_url: null
    }
  },
  {
    id: "4",
    user_id: "4",
    license_number: "KMP-004-2023",
    specialty: "Orthopedic Surgeon",
    experience_years: 15,
    consultation_fee: 6500,
    bio: "Expert orthopedic surgeon specializing in joint replacement and sports medicine.",
    location: "Mombasa",
    hospital_affiliation: "Coast General Hospital",
    rating: 4.6,
    total_reviews: 73,
    is_verified: true,
    is_available: true,
    profiles: {
      full_name: "Michael Kiprop",
      avatar_url: null
    }
  },
  {
    id: "5",
    user_id: "5",
    license_number: "KMP-005-2023",
    specialty: "Dermatologist",
    experience_years: 9,
    consultation_fee: 4000,
    bio: "Dermatologist with expertise in medical and cosmetic dermatology.",
    location: "Kisumu",
    hospital_affiliation: "Jaramogi Oginga Odinga Teaching and Referral Hospital",
    rating: 4.8,
    total_reviews: 91,
    is_verified: true,
    is_available: true,
    profiles: {
      full_name: "Catherine Muthoni",
      avatar_url: null
    }
  },
  {
    id: "6",
    user_id: "6",
    license_number: "KMP-006-2023",
    specialty: "Neurologist",
    experience_years: 11,
    consultation_fee: 7000,
    bio: "Neurologist specializing in brain and nervous system disorders.",
    location: "Nakuru",
    hospital_affiliation: "Provincial General Hospital Nakuru",
    rating: 4.9,
    total_reviews: 67,
    is_verified: true,
    is_available: true,
    profiles: {
      full_name: "David Wekesa",
      avatar_url: null
    }
  }
];

export const DoctorDirectory = () => {
  const [doctors, setDoctors] = useState<Doctor[]>(sampleDoctors);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    // For now, just use sample data. In production, you'd fetch from Supabase
    // fetchDoctors();
  }, []);

  // const fetchDoctors = async () => {
  //   try {
  //     const { data, error } = await supabase
  //       .from("doctors")
  //       .select(`
  //         *,
  //         profiles!inner(
  //           full_name,
  //           avatar_url
  //         )
  //       `)
  //       .eq("is_verified", true)
  //       .eq("is_available", true);

  //     if (error) throw error;
  //     setDoctors((data as unknown as Doctor[]) || []);
  //   } catch (error: any) {
  //     toast({
  //       title: "Error",
  //       description: "Failed to load doctors",
  //       variant: "destructive",
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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