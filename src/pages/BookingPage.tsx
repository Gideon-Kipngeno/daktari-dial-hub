import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Clock, Calendar as CalendarIcon, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/Header";

interface Doctor {
  id: string;
  user_id: string;
  specialty: string;
  location: string;
  experience_years: number;
  consultation_fee: number;
  rating: number;
  total_reviews: number;
  bio: string;
  available_from: string;
  available_to: string;
  working_days: number[];
  profiles?: {
    full_name: string;
    avatar_url?: string;
  };
}

export default function BookingPage() {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState('');
  const [chiefComplaint, setChiefComplaint] = useState('');
  const [consultationType, setConsultationType] = useState('in_person');

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    
    fetchDoctor();
  }, [doctorId, user]);

  const fetchDoctor = async () => {
    try {
      const { data, error } = await supabase
        .from('doctors')
        .select(`
          *,
          profiles:user_id (
            full_name,
            avatar_url
          )
        `)
        .eq('id', doctorId)
        .eq('is_verified', true)
        .single();

      if (error) throw error;
      setDoctor(data);
    } catch (error) {
      console.error('Error fetching doctor:', error);
      toast({
        title: "Error",
        description: "Could not load doctor information",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime || !user || !doctor) {
      toast({
        title: "Missing information",
        description: "Please select a date and time for your appointment",
        variant: "destructive"
      });
      return;
    }

    setBooking(true);

    try {
      const { error } = await supabase
        .from('appointments')
        .insert({
          patient_id: user.id,
          doctor_id: doctor.id,
          appointment_date: format(selectedDate, 'yyyy-MM-dd'),
          appointment_time: selectedTime,
          consultation_type: consultationType,
          chief_complaint: chiefComplaint,
          status: 'scheduled'
        });

      if (error) throw error;

      toast({
        title: "Appointment booked!",
        description: "Your appointment has been successfully scheduled.",
      });
      
      navigate('/');
    } catch (error: any) {
      console.error('Error booking appointment:', error);
      toast({
        title: "Booking failed",
        description: error.message || "Could not book appointment",
        variant: "destructive"
      });
    } finally {
      setBooking(false);
    }
  };

  const generateTimeSlots = () => {
    if (!doctor) return [];
    
    const slots = [];
    const startTime = parseInt(doctor.available_from.split(':')[0]);
    const endTime = parseInt(doctor.available_to.split(':')[0]);
    
    for (let hour = startTime; hour < endTime; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
      slots.push(`${hour.toString().padStart(2, '0')}:30`);
    }
    
    return slots;
  };

  const isDateAvailable = (date: Date) => {
    if (!doctor) return false;
    const dayOfWeek = date.getDay();
    const mappedDay = dayOfWeek === 0 ? 7 : dayOfWeek; // Convert Sunday from 0 to 7
    return doctor.working_days.includes(mappedDay);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading doctor information...</div>
        </div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Doctor not found</h1>
            <Button onClick={() => navigate('/')}>Back to Home</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Doctors
        </Button>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Doctor Information */}
          <Card>
            <CardHeader>
              <div className="flex items-start space-x-4">
                <Avatar className="h-20 w-20 border-2 border-primary/20">
                  <AvatarImage src={doctor.profiles?.avatar_url} />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white font-semibold text-lg">
                    {doctor.profiles?.full_name?.split(' ').map(n => n[0]).join('') || 'DR'}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <CardTitle className="text-xl">
                    Dr. {doctor.profiles?.full_name || 'Unknown'}
                  </CardTitle>
                  <p className="text-muted-foreground mb-2">{doctor.specialty}</p>
                  
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{doctor.rating}</span>
                      <span>({doctor.total_reviews} reviews)</span>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 text-sm">
                      <MapPin className="h-4 w-4" />
                      <span>{doctor.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Clock className="h-4 w-4" />
                      <span>{doctor.experience_years} years experience</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">About</h4>
                <p className="text-sm text-muted-foreground">
                  {doctor.bio || 'No biography available.'}
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Consultation Fee</h4>
                <div className="text-2xl font-bold text-primary">
                  KSh {doctor.consultation_fee.toLocaleString()}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Working Hours</h4>
                <p className="text-sm text-muted-foreground">
                  {doctor.available_from} - {doctor.available_to}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Booking Form */}
          <Card>
            <CardHeader>
              <CardTitle>Book Appointment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Select Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => 
                        date < new Date() || !isDateAvailable(date)
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Select Time</Label>
                <Select value={selectedTime} onValueChange={setSelectedTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose time slot" />
                  </SelectTrigger>
                  <SelectContent>
                    {generateTimeSlots().map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Consultation Type</Label>
                <Select value={consultationType} onValueChange={setConsultationType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="in_person">In-Person</SelectItem>
                    <SelectItem value="video_call">Video Call</SelectItem>
                    <SelectItem value="phone_call">Phone Call</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Chief Complaint (Optional)</Label>
                <Textarea
                  placeholder="Briefly describe your symptoms or reason for visit"
                  value={chiefComplaint}
                  onChange={(e) => setChiefComplaint(e.target.value)}
                />
              </div>

              <Button 
                onClick={handleBooking}
                disabled={booking || !selectedDate || !selectedTime}
                className="w-full"
                variant="hero"
              >
                {booking ? "Booking..." : `Book Appointment - KSh ${doctor.consultation_fee.toLocaleString()}`}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}