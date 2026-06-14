import { riskLevel } from "../data/locations";

export default function RiskScoreCard({ score }) {
  const risk = riskLevel(score);
  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="panel rounded-md2 p-4">
      <h3 className="text-[11px] uppercase tracking-[0.12em] text-ink-400 mb-3">
        Environmental Risk Score
      </h3>

      <div className="flex items-center gap-5">
        <div className="relative w-[110px] h-[110px] shrink-0">
          <svg width="110" height="110" viewBox="0 0 110 110" className="-rotate-90">
            <circle
              cx="55"
              cy="55"
              r={radius}
              fill="none"
              stroke="#1F1F1F"
              strokeWidth="8"
            />
            <circle
              cx="55"
              cy="55"
              r={radius}
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              style={{ transition: "stroke-dashoffset 1s ease-out" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-bold text-[26px] text-ink-900 leading-none">
              {score}
            </span>
            <span className="text-[10px] text-ink-400 mt-0.5">/ 100</span>
          </div>
        </div>

        <div className="flex-1">
          <p className="text-[11px] text-ink-400 mb-1.5">Risk Level</p>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-semibold border border-line text-ink-900">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            {risk.label}
          </span>
          <p className="text-[11.5px] text-ink-400 mt-3 leading-relaxed">
            Composite of temperature, AQI, rainfall, and flood indicators across the region.
          </p>
        </div>
      </div>
    </div>
  );
}
