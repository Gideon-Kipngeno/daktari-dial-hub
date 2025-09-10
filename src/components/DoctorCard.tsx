import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, MapPin, Clock, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface DoctorCardProps {
  id: string;
  name: string;
  specialty: string;
  location: string;
  rating: number;
  reviews: number;
  experience: string;
  availability: string;
  image?: string;
  fee: string;
}

export const DoctorCard = ({ 
  id,
  name, 
  specialty, 
  location, 
  rating, 
  reviews, 
  experience, 
  availability, 
  image, 
  fee 
}: DoctorCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20 bg-gradient-to-br from-card to-card/50">
      <CardHeader className="pb-4">
        <div className="flex items-start space-x-4">
          <Avatar className="h-16 w-16 border-2 border-primary/20">
            <AvatarImage src={image} alt={name} />
            <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white font-semibold">
              {name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 space-y-2">
            <div>
              <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                Dr. {name}
              </h3>
              <p className="text-muted-foreground">{specialty}</p>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{rating}</span>
                <span>({reviews} reviews)</span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{location}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{experience} experience</span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm">
            <Calendar className="h-4 w-4 text-medical-green" />
            <span className="text-medical-green font-medium">{availability}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          <div>
            <span className="text-sm text-muted-foreground">Consultation Fee</span>
            <div className="font-semibold text-lg text-primary">{fee}</div>
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              View Profile
            </Button>
            <Button 
              variant="medical" 
              size="sm"
              onClick={() => navigate(`/book/${id}`)}
            >
              Book Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};