import { ChevronDown, MapPin } from "lucide-react";
import { LOCATIONS } from "../data/locations";
import WeatherCard from "./WeatherCard";
import LayerSelector from "./LayerSelector";
import LegendCard from "./LegendCard";

export default function LeftSidebar({ location, onLocationChange, activeLayer, onLayerChange }) {
  return (
    <aside className="w-full lg:w-[300px] shrink-0 border-r border-line bg-canvas flex flex-col gap-4 p-4 lg:overflow-y-auto">
      {/* Location selector */}
      <div>
        <label className="text-[11px] uppercase tracking-[0.12em] text-ink-400 mb-2 block">
          Location
        </label>
        <div className="relative">
          <MapPin
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-500 pointer-events-none"
          />
          <select
            value={location.id}
            onChange={(e) => onLocationChange(e.target.value)}
            className="w-full appearance-none panel panel-hover rounded-md pl-9 pr-9 py-2.5 text-[13px] font-medium text-ink-900 outline-none transition-colors cursor-pointer"
          >
            {LOCATIONS.map((loc) => (
              <option key={loc.id} value={loc.id} className="bg-black text-ink-900">
                {loc.name}
              </option>
            ))}
          </select>
          <ChevronDown
            size={14}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-500 pointer-events-none"
          />
        </div>
      </div>

      <WeatherCard current={location.current} />

      <LayerSelector activeLayer={activeLayer} onChange={onLayerChange} />

      <LegendCard activeLayer={activeLayer} />

      <div className="mt-auto pt-2">
        <div className="divider-line mb-3" />
        <p className="text-[10.5px] text-ink-300 leading-relaxed">
          EarthPulse v1.0 — Environmental Intelligence Platform.
          Data refreshed every 15 minutes from regional sensor networks.
        </p>
      </div>
    </aside>
  );
}
