import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const TREND_ICON = {
  up: TrendingUp,
  down: TrendingDown,
  neutral: Minus,
};

export default function InsightsCard({ insights }) {
  return (
    <div className="panel rounded-md2 p-4">
      <h3 className="text-[11px] uppercase tracking-[0.12em] text-ink-400 mb-3">
        Insights
      </h3>
      <div className="flex flex-col gap-2.5">
        {insights.map((insight) => {
          const Icon = TREND_ICON[insight.trend];

          return (
            <div key={insight.id} className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-md border border-line flex items-center justify-center shrink-0 text-ink-500">
                <Icon size={12} />
              </div>
              <p className="text-[12.5px] text-ink-700 leading-snug">{insight.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
