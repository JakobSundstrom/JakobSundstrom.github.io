import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";

interface ZoomControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
}

const ZoomControls: React.FC<ZoomControlsProps> = ({ onZoomIn, onZoomOut }) => {
  return (
    <div className="zoom-controls fixed bottom-4 right-4 md:bottom-6 md:right-6 z-10 bg-white bg-opacity-90 shadow-lg rounded-lg overflow-hidden">
      <Button
        variant="ghost"
        size="icon"
        className="w-10 h-10 flex items-center justify-center text-gray-700 hover:bg-gray-100 focus:outline-none border-b border-gray-200 rounded-none"
        onClick={onZoomIn}
      >
        <Plus size={18} />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="w-10 h-10 flex items-center justify-center text-gray-700 hover:bg-gray-100 focus:outline-none rounded-none"
        onClick={onZoomOut}
      >
        <Minus size={18} />
      </Button>
    </div>
  );
};

export default ZoomControls;
