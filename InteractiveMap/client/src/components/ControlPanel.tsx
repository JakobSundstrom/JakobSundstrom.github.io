import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  MapIcon, 
  Search, 
  ArrowLeftToLine, 
  ArrowRightToLine, 
  Utensils, 
  Hotel, 
  Landmark 
} from "lucide-react";
import { MapStyle } from "@/lib/mapStyles";

interface ControlPanelProps {
  onStyleChange: (style: MapStyle) => void;
  onSearch: (query: string) => void;
  onToggleCategory: (category: string) => void;
  onMyLocation: () => void;
  onResetView: () => void;
  styles: MapStyle[];
  currentStyle: MapStyle;
  activeCategories: string[];
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  onStyleChange,
  onSearch,
  onToggleCategory,
  onMyLocation,
  onResetView,
  styles,
  currentStyle,
  activeCategories
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const togglePanel = () => {
    setIsExpanded(!isExpanded);
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };
  
  const handleCategoryToggle = (category: string) => {
    onToggleCategory(category);
  };

  return (
    <div className={`control-panel fixed top-4 left-4 md:top-6 md:left-6 z-10 bg-white bg-opacity-90 shadow-lg rounded-lg p-3 transition-all duration-300 ${!isExpanded ? 'translate-x-[-240px]' : ''}`}>
      <div className="control-panel-header flex items-center justify-between mb-3">
        <h1 className="text-lg font-semibold text-gray-800">Explore Map</h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={togglePanel}
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          {isExpanded ? <ArrowLeftToLine size={18} /> : <ArrowRightToLine size={18} />}
        </Button>
      </div>
      
      {/* Map Style Controls */}
      <div className="map-style-controls mb-4">
        <p className="text-sm font-medium text-gray-600 mb-2">Map Style</p>
        <div className="flex flex-wrap gap-2">
          {styles.map((style) => (
            <Button
              key={style.id}
              size="sm"
              variant={currentStyle.id === style.id ? "default" : "outline"}
              className={`px-3 py-1.5 text-xs font-medium rounded-full ${
                currentStyle.id === style.id ? "bg-primary text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => onStyleChange(style)}
            >
              {style.name}
            </Button>
          ))}
        </div>
      </div>
      
      {/* Location Search */}
      <div className="location-search mb-4">
        <p className="text-sm font-medium text-gray-600 mb-2">Find Location</p>
        <form onSubmit={handleSearch} className="flex">
          <Input
            type="text"
            placeholder="Search for a place..."
            className="text-sm rounded-r-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button 
            type="submit" 
            className="rounded-l-none"
          >
            <Search size={18} />
          </Button>
        </form>
      </div>
      
      {/* Points of Interest */}
      <div className="points-of-interest mb-4">
        <p className="text-sm font-medium text-gray-600 mb-2">Points of Interest</p>
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant={activeCategories.includes("restaurants") ? "default" : "outline"}
            className={`px-3 py-1.5 text-xs font-medium rounded-full ${
              activeCategories.includes("restaurants") ? "bg-primary text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => handleCategoryToggle("restaurants")}
          >
            <Utensils size={14} className="mr-1" /> Restaurants
          </Button>
          <Button
            size="sm"
            variant={activeCategories.includes("hotels") ? "default" : "outline"}
            className={`px-3 py-1.5 text-xs font-medium rounded-full ${
              activeCategories.includes("hotels") ? "bg-primary text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => handleCategoryToggle("hotels")}
          >
            <Hotel size={14} className="mr-1" /> Hotels
          </Button>
          <Button
            size="sm"
            variant={activeCategories.includes("attractions") ? "default" : "outline"}
            className={`px-3 py-1.5 text-xs font-medium rounded-full ${
              activeCategories.includes("attractions") ? "bg-primary text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => handleCategoryToggle("attractions")}
          >
            <Landmark size={14} className="mr-1" /> Attractions
          </Button>
        </div>
      </div>
      
      {/* Map Actions */}
      <div className="map-actions">
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="secondary"
            className="px-3 py-2 text-sm font-medium bg-secondary text-white rounded-lg hover:bg-emerald-600"
            onClick={onMyLocation}
          >
            <MapIcon size={14} className="mr-1" /> My Location
          </Button>
          <Button
            variant="outline"
            className="px-3 py-2 text-sm font-medium bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            onClick={onResetView}
          >
            <MapIcon size={14} className="mr-1" /> Reset View
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
