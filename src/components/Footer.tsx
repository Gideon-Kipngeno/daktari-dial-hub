import { Stethoscope, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-primary to-secondary p-2 rounded-lg">
                <Stethoscope className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Daktari Dial Hub</h3>
                <p className="text-sm text-muted">Healthcare at your fingertips</p>
              </div>
            </div>
            <p className="text-muted mb-4 max-w-md">
              Connecting Kenyans with quality healthcare through our innovative digital platform. 
              Book appointments, access medical records, and receive care from verified professionals.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-muted hover:text-primary cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-muted hover:text-primary cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-muted hover:text-primary cursor-pointer transition-colors" />
              <Linkedin className="h-5 w-5 text-muted hover:text-primary cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-muted">
              <li><a href="#doctors" className="hover:text-primary transition-colors">Find Doctors</a></li>
              <li><a href="#features" className="hover:text-primary transition-colors">Services</a></li>
              <li><a href="#records" className="hover:text-primary transition-colors">Medical Records</a></li>
              <li><a href="#about" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="/auth" className="hover:text-primary transition-colors">Sign In</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3 text-muted">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+254 700 123 456</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>info@daktaridialhub.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Nairobi, Kenya</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-muted/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted text-sm mb-4 md:mb-0">
            © 2024 Daktari Dial Hub. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-muted">
            <a href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="/support" className="hover:text-primary transition-colors">Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
};