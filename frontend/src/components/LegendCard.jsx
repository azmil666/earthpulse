import { LEGENDS } from "../data/locations";

// Monochrome legend: each stop is represented by a grayscale swatch
// derived from its position in the ramp, keeping the look consistent
// with the black & white theme while preserving relative ordering.
function swatchColor(index, total) {
  const min = 40; // darkest gray
  const max = 235; // near white
  const value = Math.round(min + (index / Math.max(total - 1, 1)) * (max - min));
  return `rgb(${value}, ${value}, ${value})`;
}

export default function LegendCard({ activeLayer }) {
  const legend = LEGENDS[activeLayer];

  return (
    <div className="panel rounded-md2 p-4">
      <h3 className="text-[11px] uppercase tracking-[0.12em] text-ink-400 mb-3">
        Legend
      </h3>
      <p className="text-[12.5px] text-ink-700 font-medium mb-3">{legend.title}</p>
      <div className="flex flex-col gap-2">
        {legend.stops.map((stop, i) => (
          <div key={stop.label} className="flex items-center gap-3">
            <span
              className="w-3.5 h-3.5 rounded-sm shrink-0 border border-line"
              style={{ background: swatchColor(i, legend.stops.length) }}
            />
            <span className="text-[12px] text-ink-400">{stop.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
