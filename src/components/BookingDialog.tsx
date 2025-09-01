import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabaseClient";
import { toast } from "@/components/ui/use-toast";

export interface BookingDoctor {
  id?: string | number;
  name: string;
  specialty?: string;
  location?: string;
  fee?: string;
}

interface BookingDialogProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  doctor: BookingDoctor | null;
}

export function BookingDialog({ open, onOpenChange, doctor }: BookingDialogProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    if (!doctor) return;
    if (!name || !email || !phone || !date || !time) {
      toast({ title: "Missing info", description: "Please complete all required fields.", variant: "destructive" });
      return;
    }
    if (!isSupabaseConfigured()) {
      toast({ title: "Database not connected", description: "Connect Supabase first (top-right Database button).", variant: "destructive" });
      return;
    }
    const supabase = getSupabaseClient();
    if (!supabase) return;

    setLoading(true);
    try {
      const start = new Date(`${date}T${time}:00`);
      const { error } = await supabase.from("appointments").insert({
        patient_name: name,
        patient_email: email,
        patient_phone: phone,
        provider_name: doctor.name,
        provider_id: doctor.id ?? null,
        start_time: start.toISOString(),
        status: "pending",
        notes,
      });
      if (error) throw error;
      toast({ title: "Appointment requested", description: `Your booking with Dr. ${doctor.name} has been submitted.` });
      onOpenChange(false);
      setName(""); setEmail(""); setPhone(""); setDate(""); setTime(""); setNotes("");
    } catch (e: any) {
      toast({ title: "Booking failed", description: e.message ?? "Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Book Appointment</DialogTitle>
          <DialogDescription>
            {doctor ? `Booking with Dr. ${doctor.name}${doctor.specialty ? ` · ${doctor.specialty}` : ""}` : "Select a doctor to continue."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Full Name</label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" />
            </div>
            <div>
              <label className="text-sm font-medium">Phone</label>
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="07xx xxx xxx" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Email</label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium">Date</label>
                <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-medium">Time</label>
                <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
              </div>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Notes (optional)</label>
            <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Reason for visit, preferences, etc." />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button variant="hero" onClick={onSubmit} disabled={loading}>{loading ? "Submitting..." : "Confirm Booking"}</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
