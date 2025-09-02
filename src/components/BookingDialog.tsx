import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Clock, User } from "lucide-react";

interface BookingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  doctorId: string;
  doctorName: string;
  consultationFee: number;
}

export const BookingDialog = ({ isOpen, onClose, doctorId, doctorName, consultationFee }: BookingDialogProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [consultationType, setConsultationType] = useState("in_person");
  const [chiefComplaint, setChiefComplaint] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to book an appointment",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase
        .from("appointments")
        .insert({
          patient_id: user.id,
          doctor_id: doctorId,
          appointment_date: appointmentDate,
          appointment_time: appointmentTime,
          consultation_type: consultationType,
          chief_complaint: chiefComplaint,
          status: "scheduled",
        });

      if (error) {
        throw error;
      }

      toast({
        title: "Appointment Booked",
        description: `Your appointment with Dr. ${doctorName} has been scheduled successfully!`,
      });

      onClose();
    } catch (error: any) {
      toast({
        title: "Booking Failed",
        description: error.message || "Failed to book appointment",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Book Appointment
          </DialogTitle>
          <DialogDescription>
            Schedule your consultation with Dr. {doctorName}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Date
              </Label>
              <Input
                id="date"
                type="date"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
                min={today}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Time
              </Label>
              <Input
                id="time"
                type="time"
                value={appointmentTime}
                onChange={(e) => setAppointmentTime(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="consultation-type">Consultation Type</Label>
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
            <Label htmlFor="complaint">Chief Complaint (Optional)</Label>
            <Textarea
              id="complaint"
              placeholder="Briefly describe your main concern..."
              value={chiefComplaint}
              onChange={(e) => setChiefComplaint(e.target.value)}
              rows={3}
            />
          </div>

          <div className="bg-muted/50 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Consultation Fee:</span>
              <span className="font-semibold">KSh {consultationFee.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading ? "Booking..." : "Book Appointment"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};