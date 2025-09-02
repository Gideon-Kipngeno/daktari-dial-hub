import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Stethoscope, User, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-primary to-secondary p-2 rounded-lg">
              <Stethoscope className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Daktari Dial Hub</h1>
              <p className="text-xs text-muted-foreground">Healthcare at your fingertips</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-foreground hover:text-primary transition-colors">Find Doctors</a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">Book Appointment</a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">Medical Records</a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">About</a>
          </nav>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {user.email?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-muted-foreground">
                    {user.email}
                  </span>
                </div>
                <Button variant="ghost" size="sm" onClick={logout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <a href="/auth">Login</a>
                </Button>
                <Button asChild>
                  <a href="/auth">Sign Up</a>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-border">
            <nav className="flex flex-col space-y-3">
              <a href="#" className="text-foreground hover:text-primary transition-colors py-2">Find Doctors</a>
              <a href="#" className="text-foreground hover:text-primary transition-colors py-2">Book Appointment</a>
              <a href="#" className="text-foreground hover:text-primary transition-colors py-2">Medical Records</a>
              <a href="#" className="text-foreground hover:text-primary transition-colors py-2">About</a>
              <div className="flex flex-col space-y-2 pt-4">
                {user ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {user.email?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-muted-foreground">
                        {user.email}
                      </span>
                    </div>
                    <Button variant="ghost" className="w-full justify-start" onClick={logout}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                ) : (
                  <>
                    <Button variant="ghost" size="sm" asChild>
                      <a href="/auth">Login</a>
                    </Button>
                    <Button size="sm" asChild>
                      <a href="/auth">Sign Up</a>
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};