import { Thermometer, Wind, ShieldAlert, CloudRain, TriangleAlert } from "lucide-react";

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="panel panel-hover flex items-center gap-3 rounded-md2 px-4 py-3 flex-1 min-w-[150px] transition-colors duration-200">
      <div className="w-8 h-8 rounded-md border border-line flex items-center justify-center shrink-0 text-ink-500">
        <Icon size={15} />
      </div>
      <div className="leading-tight">
        <p className="text-[11px] text-ink-400 tracking-wide">{label}</p>
        <p className="font-semibold text-[16px] text-ink-900">{value}</p>
      </div>
    </div>
  );
}

export default function StatsBar({ location }) {
  const { current, alerts } = location;

  return (
    <div className="flex flex-wrap gap-3 px-6 py-4 shrink-0 border-b border-line">
      <StatCard
        icon={Thermometer}
        label="Average Temperature"
        value={`${current.temperature.toFixed(1)}°C`}
      />
      <StatCard
        icon={Wind}
        label="Air Quality Index"
        value={`AQI ${current.aqi}`}
      />
      <StatCard
        icon={ShieldAlert}
        label="Risk Score"
        value={`${(current.riskScore / 10).toFixed(1)}/10`}
      />
      <StatCard
        icon={CloudRain}
        label="Rainfall"
        value={`${current.rainfall}mm`}
      />
      <StatCard
        icon={TriangleAlert}
        label="Active Alerts"
        value={`${alerts.length} Alert${alerts.length === 1 ? "" : "s"}`}
      />
    </div>
  );
}
