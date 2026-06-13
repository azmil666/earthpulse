import LeftSidebar from "../components/LeftSidebar";
import MapPanel from "../components/MapPanel";
import RightSidebar from "../components/RightSidebar";

export default function Dashboard() {
  return (
    <div className="h-screen flex bg-slate-950 text-white">

      <LeftSidebar />

      <MapPanel />

      <RightSidebar />

    </div>
  );
}