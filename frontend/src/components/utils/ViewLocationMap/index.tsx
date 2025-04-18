import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";

// Configuração do ícone do marcador (caso ainda não esteja global)
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

interface ViewLocationMapProps {
  location: [number, number]; // [lat, lng]
}

const SetViewOnly = ({ center }: { center: [number, number] }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(center, 15); // Zoom fixo em 15
    map.scrollWheelZoom.disable(); // Desabilita scroll com roda do mouse
    map.dragging.disable(); // Desabilita arrastar o mapa
    map.doubleClickZoom.disable(); // Desabilita zoom duplo clique
    map.touchZoom.disable(); // Desabilita zoom por pinch
    map.boxZoom.disable(); // Desabilita zoom por box
    map.keyboard.disable(); // Desabilita controles de teclado
  }, [map, center]);

  return null;
};

export const ViewLocationMap = ({ location }: ViewLocationMapProps) => {
  return (
    <MapContainer
      center={location}
      zoom={15}
      className="w-full h-full rounded-xl"
      dragging={false}
      zoomControl={false}
      doubleClickZoom={false}
      scrollWheelZoom={false}
    >
      <SetViewOnly center={location} />
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={location} />
    </MapContainer>
  );
};
