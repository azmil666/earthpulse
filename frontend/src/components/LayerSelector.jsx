import { Flame, CloudRain, Leaf, Wind, Waves } from "lucide-react";
import { LAYERS } from "../data/locations";

const ICONS = {
  flame: Flame,
  "cloud-rain": CloudRain,
  leaf: Leaf,
  wind: Wind,
  waves: Waves,
};

export default function LayerSelector({ activeLayer, onChange }) {
  return (
    <div className="panel rounded-md2 p-4">
      <h3 className="text-[11px] uppercase tracking-[0.12em] text-ink-400 mb-3">
        Environmental Layers
      </h3>
      <div className="flex flex-col gap-1.5">
        {LAYERS.map((layer) => {
          const Icon = ICONS[layer.icon];
          const active = activeLayer === layer.id;

          return (
            <button
              key={layer.id}
              onClick={() => onChange(layer.id)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-left text-[13px] transition-colors duration-150 border ${
                active
                  ? "bg-white text-black border-white"
                  : "text-ink-500 border-transparent hover:border-line hover:text-ink-900"
              }`}
            >
              <Icon size={15} />
              <span className="font-medium">{layer.label}</span>
              {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-black" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
