import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Location } from "@/lib/sampleData";
import { MapStyle } from "@/lib/mapStyles";
import MapLoader from "./MapLoader";
import { LucideLoader2, MapPin, Hotel, Utensils, Landmark, User } from "lucide-react";

interface MapProps {
  onMarkerClick: (location: Location) => void;
  currentStyle: MapStyle;
  visibleCategories: string[];
  locations: Location[];
}

const Map: React.FC<MapProps> = ({ onMarkerClick, currentStyle, visibleCategories, locations }) => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const markersRef = useRef<L.Marker[]>([]);
  const userMarkerRef = useRef<L.Marker | null>(null);

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapRef.current = L.map(mapContainerRef.current).setView([40.7484, -73.9857], 12);

    L.tileLayer(currentStyle.url, {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(mapRef.current);

    // Add scale control
    L.control.scale({ position: 'bottomleft', imperial: true, metric: true }).addTo(mapRef.current);

    // Set loading to false after map loads
    mapRef.current.whenReady(() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    });

    // Cleanup function
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Update map style when it changes
  useEffect(() => {
    if (!mapRef.current) return;

    L.tileLayer(currentStyle.url, {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(mapRef.current);
  }, [currentStyle]);

  // Create and update markers
  useEffect(() => {
    if (!mapRef.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add markers for visible categories
    locations.forEach(location => {
      if (visibleCategories.includes(location.category)) {
        const markerIcon = getMarkerIcon(location.category);
        
        const marker = L.marker(location.coordinates, { 
          icon: markerIcon 
        }).addTo(mapRef.current!);
        
        // Add tooltip with location name instead of facility title
        marker.bindTooltip(location.location, {
          permanent: false,
          direction: 'top',
          className: 'location-tooltip'
        });
        
        marker.on('click', () => {
          onMarkerClick(location);
          if (mapRef.current) {
            mapRef.current.flyTo(location.coordinates, 15, {
              duration: 1.5
            });
          }
        });
        
        markersRef.current.push(marker);
      }
    });
    
  }, [locations, visibleCategories, onMarkerClick]);

  // Helper function to get category-specific marker icon
  const getMarkerIcon = (category: string) => {
    let iconUrl = '';
    let iconColor = '';
    
    switch(category) {
      case 'attractions':
        iconUrl = `data:image/svg+xml;utf8,${encodeURIComponent(renderToSVG(<Landmark size={16} color="white" />))}`;
        iconColor = '#F59E0B'; // amber
        break;
      case 'restaurants':
        iconUrl = `data:image/svg+xml;utf8,${encodeURIComponent(renderToSVG(<Utensils size={16} color="white" />))}`;
        iconColor = '#EF4444'; // red
        break;
      case 'hotels':
        iconUrl = `data:image/svg+xml;utf8,${encodeURIComponent(renderToSVG(<Hotel size={16} color="white" />))}`;
        iconColor = '#3B82F6'; // blue
        break;
      default:
        iconUrl = `data:image/svg+xml;utf8,${encodeURIComponent(renderToSVG(<MapPin size={16} color="white" />))}`;
        iconColor = '#3B82F6'; // blue
    }
    
    return L.divIcon({
      html: `<div class="marker-icon marker-${category}" style="background-color: ${iconColor};">${renderToSVG(<MapPin size={16} color="white" />)}</div>`,
      className: '',
      iconSize: [25, 25],
      iconAnchor: [12.5, 12.5]
    });
  };

  // Helper function to render React components to SVG string
  function renderToSVG(component: React.ReactElement) {
    // This is a simplified version - in real app we'd use a proper library
    switch(component.type) {
      case Landmark:
        return '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 22 1.5-1.5L6 22l1.5-1.5L9 22l1.5-1.5L12 22l1.5-1.5L15 22l1.5-1.5L18 22l1.5-1.5L21 22V6l-9-2-9 2v16z"/><path d="M7 10h10v12H7z"/><path d="M10 10v3"/><path d="M14 10v3"/></svg>';
      case Utensils:
        return '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>';
      case Hotel:
        return '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z"/><path d="m9 16 .348-.24c1.465-1.013 3.84-1.013 5.304 0L15 16"/><path d="M8 7h.01"/><path d="M16 7h.01"/><path d="M12 7h.01"/><path d="M12 11h.01"/><path d="M16 11h.01"/><path d="M8 11h.01"/><path d="M10 22v-6.5m4 0V22"/></svg>';
      case User:
        return '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>';
      case MapPin:
      default:
        return '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>';
    }
  }

  // Add user location marker
  const addUserLocationMarker = (coords: [number, number]) => {
    if (!mapRef.current) return;
    
    // Remove previous user marker if exists
    if (userMarkerRef.current) {
      userMarkerRef.current.remove();
    }
    
    const userIcon = L.divIcon({
      html: `<div class="marker-icon marker-user">${renderToSVG(<User size={16} color="white" />)}</div>`,
      className: '',
      iconSize: [25, 25],
      iconAnchor: [12.5, 12.5]
    });
    
    userMarkerRef.current = L.marker(coords, { icon: userIcon }).addTo(mapRef.current);
  };

  // Expose methods to parent component
  React.useImperativeHandle(
    React.forwardRef((_, ref) => ref),
    () => ({
      flyTo: (coords: [number, number], zoom: number = 15) => {
        if (mapRef.current) {
          mapRef.current.flyTo(coords, zoom, {
            duration: 1.5
          });
        }
      },
      addUserLocationMarker,
      zoomIn: () => {
        if (mapRef.current) {
          mapRef.current.zoomIn(1, { animate: true });
        }
      },
      zoomOut: () => {
        if (mapRef.current) {
          mapRef.current.zoomOut(1, { animate: true });
        }
      },
      resetView: () => {
        if (mapRef.current) {
          mapRef.current.flyTo([40.7484, -73.9857], 12, {
            duration: 1.5
          });
        }
      }
    }),
    []
  );

  return (
    <div className="map-container" ref={mapContainerRef}>
      {isLoading && <MapLoader />}
    </div>
  );
};

export default React.forwardRef<any, MapProps>((props, ref) => <Map {...props} ref={ref} />);
