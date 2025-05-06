export interface MapStyle {
  id: string;
  name: string;
  url: string;
}

export const mapStyles: MapStyle[] = [
  {
    id: "streets",
    name: "Streets",
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  },
  {
    id: "satellite",
    name: "Satellite",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  },
  {
    id: "light",
    name: "Light",
    url: "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png",
  },
  {
    id: "dark",
    name: "Dark",
    url: "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png",
  },
];
