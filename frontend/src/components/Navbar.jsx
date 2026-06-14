import { Activity, Bell, Settings } from "lucide-react";

export default function Navbar() {
  return (
    <header className="h-14 flex items-center justify-between px-6 border-b border-line bg-canvas z-30 shrink-0">
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-md bg-white flex items-center justify-center">
          <Activity size={15} className="text-black" />
        </div>
        <div className="leading-tight">
          <h1 className="font-semibold text-[14px] tracking-tight text-ink-900">
            EarthPulse
          </h1>
        </div>
        <span className="hidden sm:inline text-[12px] text-ink-400 ml-1">
          Environmental Intelligence Platform
        </span>
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-md border border-line text-[11px] text-ink-500">
          <span className="w-1.5 h-1.5 rounded-full bg-white" />
          Live Feed
        </div>
        <button className="w-8 h-8 rounded-md border border-line flex items-center justify-center text-ink-500 hover:text-ink-900 hover:border-line-hover transition-colors">
          <Bell size={14} />
        </button>
        <button className="w-8 h-8 rounded-md border border-line flex items-center justify-center text-ink-500 hover:text-ink-900 hover:border-line-hover transition-colors">
          <Settings size={14} />
        </button>
      </div>
    </header>
  );
}
