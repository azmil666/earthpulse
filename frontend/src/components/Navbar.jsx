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

      
    </header>
  );
}
