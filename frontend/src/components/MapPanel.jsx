import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

import "leaflet/dist/leaflet.css";

import locations from "../data/locations";

function FlyToLocation({
  selectedLocation,
}) {
  const map = useMap();

  useEffect(() => {
    map.flyTo(
      [
        selectedLocation.lat,
        selectedLocation.lng,
      ],
      13
    );
  }, [selectedLocation]);

  return null;
}

export default function MapPanel({
  selectedLocation,
  setSelectedLocation,
}) {
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
        <FlyToLocation
  selectedLocation={selectedLocation}
/>

        <TileLayer
  url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
/>

        {locations.map((location) => (
          <Marker
            key={location.id}
            position={[
              location.lat,
              location.lng,
            ]}
            eventHandlers={{
              click: () => {
                setSelectedLocation(location);
              },
            }}
          >
            <Popup>
              {location.name}
            </Popup>
          </Marker>
        ))}

      </MapContainer>

    </div>
  );
}