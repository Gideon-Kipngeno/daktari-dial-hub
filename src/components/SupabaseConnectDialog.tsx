import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { getSupabaseKeys, isSupabaseConfigured, setSupabaseConfig } from "@/lib/supabaseClient";
import { toast } from "@/components/ui/use-toast";
import { Database } from "lucide-react";

export function SupabaseConnectDialog() {
  const [{ url, anon }, setVals] = useState(getSupabaseKeys());
  const [open, setOpen] = useState(false);
  const [connected, setConnected] = useState(isSupabaseConfigured());

  useEffect(() => {
    setConnected(isSupabaseConfigured());
  }, [open]);

  const onSave = () => {
    if (!url || !anon) {
      toast({ title: "Supabase config required", description: "Please paste your Supabase URL and anon key.", variant: "destructive" });
      return;
    }
    setSupabaseConfig(url, anon);
    setConnected(true);
    toast({ title: "Database connected", description: "Your Supabase client is configured.", });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={connected ? "secondary" : "outline"} size="sm">
          <span className="mr-2 relative inline-flex">
            <Database className="h-4 w-4" />
            <span className={`absolute -right-1 -top-1 h-2 w-2 rounded-full ${connected ? "bg-medical-green" : "bg-kenya-red"}`}></span>
          </span>
          {connected ? "DB Connected" : "Connect DB"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Connect Supabase</DialogTitle>
          <DialogDescription>
            Paste your Supabase project URL and public anon key. These are safe to use on the frontend.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Supabase URL</label>
            <Input
              placeholder="https://xyzcompany.supabase.co"
              value={url}
              onChange={(e) => setVals((v) => ({ ...v, url: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Anon Public Key</label>
            <Input
              placeholder="eyJhbGciOiJI..."
              value={anon}
              onChange={(e) => setVals((v) => ({ ...v, anon: e.target.value }))}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="hero" onClick={onSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
