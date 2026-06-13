import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function MapPanel() {
  return (
    <div className="flex-1">

      <MapContainer
        center={[10.0159, 76.3419]}
        zoom={10}
        style={{
          height: "100vh",
          width: "100%",
        }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>

    </div>
  );
}