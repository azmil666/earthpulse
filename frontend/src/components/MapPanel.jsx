// MapPanel.jsx 


import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Rectangle,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// ─── Geographic constants ────────────────────────────────────────────────────
const GRID = {
  south:   9.82,
  north:   10.18,
  west:    76.18,
  east:    76.55,
  spacing: 0.008,
};

// ─── Named locations ─────────────────────────────────────────────────────────
const LOCATIONS = [
  { id: "kochi",           label: "Kochi",           lat: 9.9312,  lon: 76.2673 },
  { id: "kakkanad",        label: "Kakkanad",         lat: 10.0167, lon: 76.35   },
  { id: "aluva",           label: "Aluva",            lat: 10.1004, lon: 76.3572 },
  { id: "fortkochi",       label: "Fort Kochi",       lat: 9.9658,  lon: 76.2421 },
  { id: "thrippunithura",  label: "Thrippunithura",   lat: 9.9374,  lon: 76.3099 },
  { id: "perumbavoor",     label: "Perumbavoor",      lat: 10.1071, lon: 76.4734 },
  { id: "vypin", label: "Vypin", lat: 10.0138, lon: 76.2200 },
{ id: "kaloor", label: "Kaloor", lat: 9.9981, lon: 76.2912 },
];

// ─── Layer definitions ───────────────────────────────────────────────────────
const LAYERS = {
  heat: {
    label: "Heat",
    unit: "°C",
    getColor(d) {
      const t = d.temperature ?? 28;
      if (t >= 34) return { color: "#e63946", opacity: 0.80 };
      if (t >= 28) return { color: "#f4a261", opacity: 0.65 };
      if (t >= 20) return { color: "#e9c46a", opacity: 0.45 };
      return           { color: "#4895ef", opacity: 0.25 };
    },
    getValue: (d) => `${(d.temperature ?? 28).toFixed(1)}°C`,
  },
  rainfall: {
    label: "Rainfall",
    unit: "mm",
    getColor(d) {
      const r = d.rainfall ?? 0;
      if (r >= 10) return { color: "#023e8a", opacity: 0.80 };
      if (r >= 5)  return { color: "#0096c7", opacity: 0.65 };
      if (r >= 2)  return { color: "#90e0ef", opacity: 0.45 };
      return         { color: "#caf0f8", opacity: 0.15 };
    },
    getValue: (d) => `${(d.rainfall ?? 0).toFixed(1)} mm`,
  },
  vegetation: {
    label: "Vegetation",
    unit: "%",
    getColor(d) {
      const h = d.humidity ?? 60;
      if (h >= 60) return { color: "#2d6a4f", opacity: 0.75 };
      if (h >= 30) return { color: "#95d5b2", opacity: 0.55 };
      return         { color: "#6b4226", opacity: 0.60 };
    },
    getValue: (d) => `Humidity ${(d.humidity ?? 60).toFixed(0)}%`,
  },
  airquality: {
    label: "Air Quality",
    unit: "AQI",
    getColor(d) {
      const aqi = d.aqi ?? (d.riskScore ?? 20) * 3;
      if (aqi >= 200) return { color: "#7b2d8b", opacity: 0.80 };
      if (aqi >= 150) return { color: "#e63946", opacity: 0.75 };
      if (aqi >= 100) return { color: "#f4a261", opacity: 0.65 };
      if (aqi >= 50)  return { color: "#e9c46a", opacity: 0.45 };
      return           { color: "#52b788", opacity: 0.30 };
    },
    getValue: (d) => `AQI ${(d.aqi ?? (d.riskScore ?? 20) * 3).toFixed(0)}`,
  },
  flood: {
    label: "Flood Risk",
    unit: "risk",
    getColor(d) {
      const score = (d.rainfall ?? 0) * 0.6 + (d.riskScore ?? 20) * 0.4;
      if (score >= 70) return { color: "#03045e", opacity: 0.80 };
      if (score >= 40) return { color: "#0077b6", opacity: 0.65 };
      if (score >= 20) return { color: "#48cae4", opacity: 0.45 };
      return            { color: "#ade8f4", opacity: 0.25 };
    },
    getValue: (d) => {
      const score = (d.rainfall ?? 0) * 0.6 + (d.riskScore ?? 20) * 0.4;
      if (score >= 70) return "High Risk";
      if (score >= 40) return "Medium Risk";
      if (score >= 20) return "Low Risk";
      return "Minimal";
    },
  },
};

const LAYER_KEYS = Object.keys(LAYERS);

// ─── Utility ─────────────────────────────────────────────────────────────────

/** Build full grid: returns array of { lat, lon, bounds } */
function buildGrid() {
  const cells = [];
  const s = GRID.spacing;
  for (let lat = GRID.south; lat < GRID.north; lat += s) {
    for (let lon = GRID.west; lon < GRID.east; lon += s) {
      const centerLat = +(lat + s / 2).toFixed(5);
      const centerLon = +(lon + s / 2).toFixed(5);
      cells.push({
        id:  `${centerLat}_${centerLon}`,
        lat: centerLat,
        lon: centerLon,
        // Leaflet bounds: [[south, west], [north, east]]
        bounds: [
          [+lat.toFixed(5),       +lon.toFixed(5)],
          [+(lat + s).toFixed(5), +(lon + s).toFixed(5)],
        ],
      });
    }
  }
  return cells;
}

/** Chunked concurrent fetch pool */
async function fetchPool(tasks, chunkSize = 10, onProgress) {
  const results = [];
  for (let i = 0; i < tasks.length; i += chunkSize) {
    const slice = tasks.slice(i, i + chunkSize);
    const settled = await Promise.allSettled(slice.map((fn) => fn()));
    settled.forEach((r) => {
      if (r.status === "fulfilled" && r.value) results.push(r.value);
    });
    if (onProgress) onProgress(Math.min(i + chunkSize, tasks.length), tasks.length);
  }
  return results;
}

async function fetchCell(cell) {
  const API = (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL)
    || "http://localhost:5000/api";
  const res = await fetch(`${API}/environment?lat=${cell.lat}&lon=${cell.lon}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const j = await res.json();
  const cur = j.current ?? j;
  return {
    ...cell,
    temperature: cur.temperature ?? 28,
    humidity:    cur.humidity    ?? 70,
    rainfall:    cur.rainfall    ?? 2,
    windSpeed:   cur.windSpeed   ?? 8,
    riskScore:   cur.riskScore   ?? 20,
    aqi:         cur.aqi         ?? 50,
  };
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function ResizeSync() {
  const map = useMap();
  useEffect(() => {
    const ro = new ResizeObserver(() => map.invalidateSize());
    ro.observe(map.getContainer());
    return () => ro.disconnect();
  }, [map]);
  return null;
}

function FlyToHandler({ target }) {
  const map = useMap();
  const prevId = useRef(null);
  useEffect(() => {
    if (!target || target.id === prevId.current) return;
    prevId.current = target.id;
    map.flyTo([target.lat, target.lon], 13, { duration: 1.6, easeLinearity: 0.25 });
  }, [map, target]);
  return null;
}

function CoordTracker({ onMove }) {
  useMapEvents({ mousemove: (e) => onMove(e.latlng) });
  return null;
}

/** Renders all raster cells for the active layer */
function RasterGrid({ cells, layerKey }) {
  const layerCfg = LAYERS[layerKey];
  return cells.map((cell) => {
    const { color, opacity } = layerCfg.getColor(cell);
    return (
      <Rectangle
        key={cell.id}
        bounds={cell.bounds}
        pathOptions={{
          fillColor:   color,
          fillOpacity: opacity,
          color:       "transparent",
          weight:      0,
        }}
      >
        <Popup
          className="earthpulse-popup"
          closeButton={false}
          offset={[0, 0]}
        >
          <div className="ep-popup">
            <div className="ep-popup-label">{layerCfg.label}</div>
            <div className="ep-popup-val">{layerCfg.getValue(cell)}</div>
            <div className="ep-popup-coords">
              {cell.lat.toFixed(4)}° N, {cell.lon.toFixed(4)}° E
            </div>
          </div>
        </Popup>
      </Rectangle>
    );
  });
}

/** Minimal pulse marker icon */
const pulseIcon = L.divIcon({
  className: "",
  iconSize: [12, 12],
  iconAnchor: [6, 6],
  html: `<span style="
    display:block;width:10px;height:10px;
    border-radius:50%;background:rgba(255,255,255,0.9);
    box-shadow:0 0 0 2px rgba(255,255,255,0.35),0 0 10px 3px rgba(255,255,255,0.2);
  "></span>`,
});

// ─── Legend config ────────────────────────────────────────────────────────────
const LEGEND = {
  heat:       [{ c:"#4895ef",label:"<20°C" },{ c:"#e9c46a",label:"20-28°C" },{ c:"#f4a261",label:"28-34°C" },{ c:"#e63946",label:"34+°C" }],
  rainfall:   [{ c:"#caf0f8",label:"<2mm" },{ c:"#90e0ef",label:"2-5mm" },{ c:"#0096c7",label:"5-10mm" },{ c:"#023e8a",label:"10+mm" }],
  vegetation: [{ c:"#6b4226",label:"Arid" },{ c:"#95d5b2",label:"Moderate" },{ c:"#2d6a4f",label:"Dense" }],
  airquality: [{ c:"#52b788",label:"Good" },{ c:"#e9c46a",label:"Moderate" },{ c:"#f4a261",label:"Unhealthy" },{ c:"#e63946",label:"Very Unhealthy" },{ c:"#7b2d8b",label:"Hazardous" }],
  flood:      [{ c:"#ade8f4",label:"Minimal" },{ c:"#48cae4",label:"Low" },{ c:"#0077b6",label:"Medium" },{ c:"#03045e",label:"High" }],
};

// ─── Main MapPanel ────────────────────────────────────────────────────────────
export default function MapPanel() {
  const [activeLayer,  setActiveLayer]  = useState("heat");
  const [selectedLoc,  setSelectedLoc]  = useState(null);
  const [cellData,     setCellData]     = useState([]);
  const [loadState,    setLoadState]    = useState("idle");
  const [loadProgress, setLoadProgress] = useState({ done: 0, total: 0 });
  const [cursorCoords, setCursorCoords] = useState(null);

  // Stable grid — built once
  const gridCells = useMemo(() => buildGrid(), []);

  // Fetch all cells on mount
  useEffect(() => {
    let cancelled = false;
    setLoadState("loading");
    setLoadProgress({ done: 0, total: gridCells.length });

    const tasks = gridCells.map((cell) => () => fetchCell(cell));

    fetchPool(tasks, 10, (done, total) => {
      if (!cancelled) setLoadProgress({ done, total });
    }).then((results) => {
      if (!cancelled) {
        setCellData(results);
        setLoadState(results.length < gridCells.length ? "partial" : "done");
      }
    });

    return () => { cancelled = true; };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleLocChange = useCallback((e) => {
    const loc = LOCATIONS.find((l) => l.id === e.target.value);
    setSelectedLoc(loc || null);
  }, []);

  const pct = loadProgress.total
    ? Math.round((loadProgress.done / loadProgress.total) * 100)
    : 0;

  return (
    <div
      className="relative w-full h-full bg-[#07090f] select-none overflow-hidden"
      style={{ fontFamily: "'DM Mono', 'JetBrains Mono', monospace" }}
    >

      {/* ── Top-left: Location selector ── */}
      <div className="absolute top-3 left-3 z-[1000]">
        <select
          onChange={handleLocChange}
          defaultValue=""
          className="
            bg-[#0d1221]/95 border border-white/10 text-white/75 text-[11px]
            px-3 py-1.5 rounded-md backdrop-blur-sm
            focus:outline-none focus:border-white/25 cursor-pointer
          "
        >
          <option value="" disabled>— Jump to location —</option>
          {LOCATIONS.map((l) => (
            <option key={l.id} value={l.id}>{l.label}</option>
          ))}
        </select>
      </div>

      {/* ── Top-center: Layer selector ── */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 z-[1000]">
        <div className="flex gap-1 bg-[#0d1221]/95 border border-white/10 rounded-lg p-1 backdrop-blur-sm">
          {LAYER_KEYS.map((key) => (
            <button
              key={key}
              onClick={() => setActiveLayer(key)}
              className={`
                text-[10px] px-3 py-1 rounded-md transition-all duration-150 tracking-wider uppercase
                ${activeLayer === key
                  ? "bg-white/15 text-white font-semibold border border-white/20"
                  : "text-white/35 hover:text-white/60 hover:bg-white/5"}
              `}
            >
              {LAYERS[key].label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Top-right: Active layer badge ── */}
      <div className="absolute top-3 right-3 z-[1000]">
        <div className="
          flex items-center gap-2 bg-[#0d1221]/95 border border-white/10
          rounded-md px-3 py-1.5 backdrop-blur-sm
        ">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] text-white/40 uppercase tracking-widest">Layer</span>
          <span className="text-[10px] text-white font-semibold">
            {LAYERS[activeLayer].label}
          </span>
        </div>
      </div>

      {/* ── Bottom-left: Cursor coordinates ── */}
      <div className="absolute bottom-5 left-3 z-[1000]">
        <div className="
          bg-[#0d1221]/85 border border-white/8 rounded-md
          px-2.5 py-1 text-[10px] text-white/35 backdrop-blur-sm
        ">
          {cursorCoords
            ? `${cursorCoords.lat.toFixed(5)}° N   ${cursorCoords.lng.toFixed(5)}° E`
            : "Hover over map for coordinates"}
        </div>
      </div>

      {/* ── Bottom-right: Cell count status ── */}
      <div className="absolute bottom-5 right-3 z-[1000]">
        <div className="
          bg-[#0d1221]/85 border border-white/8 rounded-md
          px-2.5 py-1 text-[10px] backdrop-blur-sm flex items-center gap-2
        ">
          {loadState === "done" && (
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-white/35">{cellData.length.toLocaleString()} cells loaded</span>
            </>
          )}
          {loadState === "partial" && (
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span className="text-white/35">{cellData.length} / {gridCells.length} cells</span>
            </>
          )}
          {loadState === "loading" && (
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
              <span className="text-white/35">{pct}% · {loadProgress.done}/{loadProgress.total} cells</span>
            </>
          )}
        </div>
      </div>

      {/* ── Bottom-center: Legend ── */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-[1000]">
        <div className="
          flex items-center gap-2 bg-[#0d1221]/85 border border-white/8 rounded-md
          px-3 py-1.5 backdrop-blur-sm
        ">
          {LEGEND[activeLayer].map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
                style={{ backgroundColor: item.c, opacity: 0.9 }}
              />
              <span className="text-[9px] text-white/40 whitespace-nowrap">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Loading overlay ── */}
      {loadState === "loading" && cellData.length === 0 && (
        <div className="
          absolute inset-0 z-[2000] flex flex-col items-center justify-center
          bg-[#07090f]/95 backdrop-blur-sm gap-5
        ">
          <div className="flex flex-col items-center gap-4">
            {/* Animated grid icon */}
            <div className="grid grid-cols-3 gap-1">
              {[...Array(9)].map((_, i) => (
                <div
                  key={i}
                  className="w-3 h-3 rounded-sm bg-sky-400/40"
                  style={{ animationDelay: `${i * 0.08}s` }}
                />
              ))}
            </div>
            <div className="text-center">
              <p className="text-white/60 text-xs tracking-[0.2em] uppercase mb-1">
                Building Raster Grid
              </p>
              <p className="text-white/25 text-[10px]">
                Ernakulam District · {gridCells.length} cells
              </p>
            </div>
            <div className="w-52 h-px bg-white/8 rounded-full overflow-hidden">
              <div
                className="h-full bg-sky-400 rounded-full transition-all duration-200"
                style={{ width: `${pct}%` }}
              />
            </div>
            <p className="text-white/20 text-[10px] tracking-widest">{pct}% LOADED</p>
          </div>
        </div>
      )}

      {/* ── Leaflet Map ── */}
      <MapContainer
        center={[9.9816, 76.2999]}
        zoom={11}
        minZoom={9}
        maxZoom={16}
        style={{ width: "100%", height: "100%" }}
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; CARTO'
          subdomains="abcd"
          maxZoom={19}
        />

        <ResizeSync />
        <FlyToHandler target={selectedLoc} />
        <CoordTracker onMove={setCursorCoords} />

        {/* Raster grid — rendered as true rectangles, not interpolated blobs */}
        {cellData.length > 0 && (
          <RasterGrid cells={cellData} layerKey={activeLayer} />
        )}

        {/* Location markers */}
        {LOCATIONS.map((loc) => (
          <Marker key={loc.id} position={[loc.lat, loc.lon]} icon={pulseIcon}>
            <Popup
              className="earthpulse-popup"
              closeButton={false}
              offset={[0, -6]}
            >
              <div className="ep-popup">
                <div className="ep-popup-label">{loc.label}</div>
                <div className="ep-popup-coords">
                  {loc.lat.toFixed(4)}° N, {loc.lon.toFixed(4)}° E
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* ── Scoped styles (no external CSS deps) ── */}
      <style>{`
        .leaflet-container { background: #07090f !important; }

        .earthpulse-popup .leaflet-popup-content-wrapper {
          background: rgba(10,14,28,0.95);
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: 6px;
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 28px rgba(0,0,0,0.6);
          padding: 0;
        }
        .earthpulse-popup .leaflet-popup-content { margin: 0; }
        .earthpulse-popup .leaflet-popup-tip-container { display: none; }

        .ep-popup {
          padding: 9px 13px;
          font-family: 'DM Mono', 'JetBrains Mono', monospace;
        }
        .ep-popup-label {
          font-size: 11px;
          font-weight: 600;
          color: rgba(255,255,255,0.90);
          letter-spacing: 0.04em;
          margin-bottom: 2px;
        }
        .ep-popup-val {
          font-size: 13px;
          font-weight: 700;
          color: #7dd3fc;
          margin-bottom: 4px;
        }
        .ep-popup-coords {
          font-size: 9px;
          color: rgba(255,255,255,0.30);
          letter-spacing: 0.05em;
        }

        /* Suppress default Leaflet focus outline on raster cells */
        .leaflet-interactive:focus { outline: none; }

        /* Subtle highlight on hover for raster cells */
        .leaflet-interactive:hover {
          filter: brightness(1.25);
          cursor: crosshair;
        }

        /* Loading grid pulse animation */
        @keyframes rasterPulse {
          0%, 100% { opacity: 0.2; }
          50%       { opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}