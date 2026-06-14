import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, Rectangle, useMap } from "react-leaflet";
import L from "leaflet";
import { LOCATIONS } from "../data/locations";

// Custom marker — minimal white dot with pulsing ring, replaces default pin
const epIcon = L.divIcon({
  className: "ep-marker-wrapper",
  html: `<div class="ep-marker"><div class="ep-marker-ring"></div><div class="ep-marker-core"></div></div>`,
  iconSize: [14, 14],
  iconAnchor: [7, 7],
});

// Grayscale intensity ramps per layer (lighter = higher intensity)
const LAYER_RAMPS = {
  heat: [60, 110, 160, 220],
  rainfall: [60, 120, 200],
  vegetation: [60, 120, 200],
  airquality: [50, 90, 130, 170, 220],
  flood: [60, 120, 200],
};

// Deterministic 5x5 grid of overlay cells around a center point
function buildGrid(center, layerId, seed = 0) {
  const ramp = LAYER_RAMPS[layerId];
  const cellSize = 0.035;
  const cells = [];
  let i = 0;

  for (let row = -2; row <= 2; row++) {
    for (let col = -2; col <= 2; col++) {
      const lat = center[0] + row * cellSize;
      const lng = center[1] + col * cellSize;

      const hash = Math.abs(Math.sin(seed + row * 31.7 + col * 17.3 + i));
      const gray = ramp[Math.floor(hash * ramp.length)];
      const opacity = 0.06 + hash * 0.18;

      cells.push({
        id: `${row}-${col}`,
        color: `rgb(${gray}, ${gray}, ${gray})`,
        opacity,
        bounds: [
          [lat - cellSize / 2, lng - cellSize / 2],
          [lat + cellSize / 2, lng + cellSize / 2],
        ],
      });
      i++;
    }
  }
  return cells;
}

// Smoothly pans/zooms to the selected location
function FlyToHandler({ coords, zoom }) {
  const map = useMap();
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    map.flyTo(coords, zoom, { duration: 1, easeLinearity: 0.25 });
  }, [coords, zoom, map]);

  return null;
}

// Keeps Leaflet's internal size in sync with its container,
// which prevents the tile-rendering glitches seen in flex layouts.
function ResizeSync({ coords, zoom }) {
  const map = useMap();

  useEffect(() => {
    const container = map.getContainer();

    const sync = () => {
      map.invalidateSize();
      map.setView(coords, map.getZoom(), { animate: false });
    };

    sync();

    const observer = new ResizeObserver(() => {
      sync();
    });
    observer.observe(container);

    return () => observer.disconnect();
  }, [map, coords]);

  return null;
}

export default function MapPanel({ location, activeLayer }) {
  const gridCells = buildGrid(location.coords, activeLayer, location.current.riskScore);

  return (
    <div className="relative w-full h-full border-r border-line lg:border-r border-b lg:border-b-0 border-line">
      <div className="map-wrapper">
        <MapContainer
          center={location.coords}
          zoom={location.zoom}
          zoomControl={true}
          attributionControl={true}
          scrollWheelZoom={true}
          style={{ width: "100%", height: "100%" }}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; OpenStreetMap &copy; CARTO'
          />

          <ResizeSync coords={location.coords} zoom={location.zoom} />
          <FlyToHandler coords={location.coords} zoom={location.zoom} />

          {/* Environmental overlay grid for active layer */}
          {gridCells.map((cell) => (
            <Rectangle
              key={`${activeLayer}-${cell.id}`}
              bounds={cell.bounds}
              pathOptions={{
                color: cell.color,
                weight: 0,
                fillColor: cell.color,
                fillOpacity: cell.opacity,
                className: "ep-grid-cell",
              }}
            />
          ))}

          {/* Markers for all locations */}
          {LOCATIONS.map((loc) => (
            <Marker key={loc.id} position={loc.coords} icon={epIcon}>
              <Popup>
                <div style={{ fontFamily: "Inter, sans-serif" }}>
                  <strong>{loc.name}</strong>
                  <div style={{ fontSize: "12px", marginTop: 4 }}>
                    {loc.current.temperature.toFixed(1)}°C · AQI {loc.current.aqi}
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Active layer label */}
      <div className="absolute top-4 right-4 z-[400] panel rounded-md px-3.5 py-2 pointer-events-none">
        <p className="text-[10px] uppercase tracking-[0.12em] text-ink-400">
          Active Layer
        </p>
        <p className="font-semibold text-[13px] text-ink-900 capitalize">
          {activeLayer === "airquality" ? "Air Quality" : activeLayer}
        </p>
      </div>

      {/* Coordinates readout */}
      <div className="absolute bottom-4 left-4 z-[400] panel rounded-md px-3.5 py-2 pointer-events-none">
        <p className="text-[10px] font-mono text-ink-500 tracking-wide">
          {location.coords[0].toFixed(4)}°N, {location.coords[1].toFixed(4)}°E
        </p>
      </div>
    </div>
  );
}
