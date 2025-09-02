import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

interface LocationPickerMapProps {
  value?: [number, number] | null;
  onChange: (coords: [number, number]) => void;
  isEdit?: boolean
}

const SetViewOnMount = ({ center }: { center: [number, number] }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(center);
  }, [center, map]);

  return null;
};

const EnableCtrlZoomOnly = () => {
  const map = useMap();

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!e.ctrlKey) {
        map.getContainer().style.cursor = "not-allowed";
      } else {
        map.getContainer().style.cursor = "";
      }
    };

    const enableCtrlScroll = (e: WheelEvent) => {
      if (!e.ctrlKey) {
        e.preventDefault();
      }
    };

    const container = map.getContainer();
    container.addEventListener("wheel", enableCtrlScroll, { passive: false });
    container.addEventListener("wheel", handleWheel);

    return () => {
      container.removeEventListener("wheel", enableCtrlScroll);
      container.removeEventListener("wheel", handleWheel);
    };
  }, [map]);

  return null;
};

export const LocationPickerMap = ({ value, onChange }: LocationPickerMapProps) => {
  const [mapCenter, setMapCenter] = useState<[number, number]>([-23.549, -46.633]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      if (latitude && longitude) {
        setMapCenter([latitude, longitude]);
      }
    });
  }, []);

  const MarkerComponent = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        onChange([lat, lng]);
      },
    });

    return value ? <Marker position={value} /> : null;
  };

  
  return (
    <MapContainer center={mapCenter} zoom={13} scrollWheelZoom={true} className="w-full h-full">
      <EnableCtrlZoomOnly />
      <SetViewOnMount center={mapCenter} />
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerComponent />
    </MapContainer>
  );
};
