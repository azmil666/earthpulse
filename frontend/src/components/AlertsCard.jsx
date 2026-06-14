import { Flame, CloudRain, Wind, ShieldAlert, TriangleAlert } from "lucide-react";

const ICONS = {
  heat: Flame,
  rain: CloudRain,
  aqi: Wind,
  flood: ShieldAlert,
  wind: Wind,
};

export default function AlertsCard({ alerts }) {
  return (
    <div className="panel rounded-md2 p-4">
      <h3 className="text-[11px] uppercase tracking-[0.12em] text-ink-400 mb-3">
        Active Alerts
      </h3>

      {alerts.length === 0 ? (
        <div className="flex items-center gap-2 text-[12.5px] text-ink-400 py-2">
          <ShieldAlert size={14} />
          No active alerts for this location.
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {alerts.map((alert) => {
            const Icon = ICONS[alert.type] || TriangleAlert;

            return (
              <div
                key={alert.id}
                className="flex gap-3 p-3 rounded-md border border-line"
              >
                <div className="w-7 h-7 rounded-md border border-line flex items-center justify-center shrink-0 text-ink-500">
                  <Icon size={13} />
                </div>
                <div className="leading-tight">
                  <p className="text-[12.5px] font-semibold text-ink-900">{alert.title}</p>
                  <p className="text-[11.5px] text-ink-400 mt-0.5 leading-relaxed">
                    {alert.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
