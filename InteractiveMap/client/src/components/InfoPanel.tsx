import React from "react";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Phone, 
  Clock, 
  Info, 
  X, 
  Heart, 
  Route
} from "lucide-react";
import { Location } from "@/lib/sampleData";
import { useToast } from "@/hooks/use-toast";

interface InfoPanelProps {
  location: Location | null;
  isOpen: boolean;
  onClose: () => void;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ location, isOpen, onClose }) => {
  const { toast } = useToast();
  
  const handleGetDirections = () => {
    if (location) {
      toast({
        title: "Getting directions",
        description: `Directions to ${location.title}`,
      });
    }
  };
  
  const handleSaveLocation = () => {
    if (location) {
      toast({
        title: "Location saved",
        description: `${location.title} has been saved to your favorites!`,
      });
    }
  };

  return (
    <div 
      className={`info-panel fixed bottom-0 left-0 right-0 bg-white bg-opacity-95 shadow-lg rounded-t-lg p-4 transform ${isOpen ? 'translate-y-0' : 'translate-y-full'} transition-transform duration-300 z-20 md:max-w-md md:left-6 md:bottom-6 md:right-auto`}
    >
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold text-gray-800">
          {location ? location.title : "Location Information"}
        </h2>
        <Button 
          variant="ghost" 
          size="icon"
          className="text-gray-500 hover:text-gray-700 focus:outline-none" 
          onClick={onClose}
        >
          <X size={18} />
        </Button>
      </div>
      
      <div>
        {location ? (
          <>
            <p className="text-gray-600 mb-3">{location.description}</p>
            <div className="info-details space-y-2">
              <div className="flex items-start">
                <MapPin className="text-primary mt-1 mr-2" size={16} />
                <p className="text-sm text-gray-700">{location.address}</p>
              </div>
              <div className="flex items-start">
                <Phone className="text-primary mt-1 mr-2" size={16} />
                <p className="text-sm text-gray-700">{location.phone}</p>
              </div>
              <div className="flex items-start">
                <Clock className="text-primary mt-1 mr-2" size={16} />
                <p className="text-sm text-gray-700">{location.hours}</p>
              </div>
              <div className="flex items-start">
                <Info className="text-primary mt-1 mr-2" size={16} />
                <p className="text-sm text-gray-700">{location.details}</p>
              </div>
            </div>
          </>
        ) : (
          <p className="text-gray-600 mb-3">
            Select a marker on the map to see detailed information about that location.
          </p>
        )}
      </div>
      
      <div className="mt-4 flex space-x-2">
        <Button 
          className="px-3 py-2 text-sm font-medium bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors flex-1"
          onClick={handleGetDirections}
          disabled={!location}
        >
          <Route size={14} className="mr-1" /> Directions
        </Button>
        <Button 
          variant="outline"
          className="px-3 py-2 text-sm font-medium bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex-1"
          onClick={handleSaveLocation}
          disabled={!location}
        >
          <Heart size={14} className="mr-1" /> Save
        </Button>
      </div>
    </div>
  );
};

export default InfoPanel;
