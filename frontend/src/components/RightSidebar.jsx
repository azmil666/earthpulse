import { Thermometer, Droplets, Wind, CloudRain, Gauge } from "lucide-react";
import RiskScoreCard from "./RiskScoreCard";
import AlertsCard from "./AlertsCard";
import InsightsCard from "./InsightsCard";

function OverviewRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-line last:border-none">
      <div className="flex items-center gap-2.5 text-ink-400 text-[12.5px]">
        <Icon size={14} />
        {label}
      </div>
      <span className="font-medium text-ink-900 text-[13px]">{value}</span>
    </div>
  );
}

export default function RightSidebar({ location }) {
  const { current, alerts, insights } = location;

  return (
    <aside className="w-full lg:w-[340px] shrink-0 border-l border-line bg-canvas flex flex-col gap-4 p-4 lg:overflow-y-auto">
      <div>
        <h2 className="font-semibold text-[14px] text-ink-900">
          Environmental Intelligence
        </h2>
        <p className="text-[11.5px] text-ink-400 mt-0.5">{location.name} — Live Overview</p>
      </div>

      <div className="panel rounded-md2 p-4">
        <h3 className="text-[11px] uppercase tracking-[0.12em] text-ink-400 mb-2">
          Location Overview
        </h3>
        <OverviewRow icon={Thermometer} label="Temperature" value={`${current.temperature.toFixed(1)}°C`} />
        <OverviewRow icon={Droplets} label="Humidity" value={`${current.humidity}%`} />
        <OverviewRow icon={Gauge} label="AQI" value={current.aqi} />
        <OverviewRow icon={Wind} label="Wind Speed" value={`${current.windSpeed} km/h`} />
        <OverviewRow icon={CloudRain} label="Rainfall" value={`${current.rainfall}mm`} />
      </div>

      <RiskScoreCard score={current.riskScore} />
      <AlertsCard alerts={alerts} />
      <InsightsCard insights={insights} />
    </aside>
  );
}
