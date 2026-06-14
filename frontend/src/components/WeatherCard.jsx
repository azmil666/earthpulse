import { Thermometer, Droplets, Wind, CloudSun } from "lucide-react";

function ConditionRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-line last:border-none">
      <div className="flex items-center gap-2.5 text-ink-400 text-[12.5px]">
        <Icon size={14} />
        {label}
      </div>
      <span className="font-medium text-ink-900 text-[13px]">{value}</span>
    </div>
  );
}

export default function WeatherCard({ current }) {
  return (
    <div className="panel rounded-md2 p-4">
      <h3 className="text-[11px] uppercase tracking-[0.12em] text-ink-400 mb-1">
        Current Conditions
      </h3>
      <ConditionRow icon={Thermometer} label="Temperature" value={`${current.temperature.toFixed(1)}°C`} />
      <ConditionRow icon={Droplets} label="Humidity" value={`${current.humidity}%`} />
      <ConditionRow icon={Wind} label="Wind Speed" value={`${current.windSpeed} km/h`} />
      <ConditionRow icon={CloudSun} label="Condition" value={current.condition} />
    </div>
  );
}
