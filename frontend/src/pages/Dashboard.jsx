import { useState } from "react";
import Navbar from "../components/Navbar";
import StatsBar from "../components/StatsBar";
import LeftSidebar from "../components/LeftSidebar";
import MapPanel from "../components/MapPanel";
import RightSidebar from "../components/RightSidebar";
import { LOCATIONS } from "../data/locations";

export default function Dashboard() {
  const [locationId, setLocationId] = useState(LOCATIONS[0].id);
  const [activeLayer, setActiveLayer] = useState("heat");

  const location = LOCATIONS.find((loc) => loc.id === locationId) || LOCATIONS[0];

  return (
    <div className="h-screen w-screen flex flex-col bg-canvas text-ink-700 overflow-hidden font-sans">
      <Navbar />
      <StatsBar location={location} />
      <div className="flex flex-1 min-h-0 flex-col lg:flex-row overflow-y-auto lg:overflow-hidden">
        <div className="order-1 lg:order-2 w-full lg:flex-1 lg:min-w-0 h-[60vh] lg:h-auto shrink-0">
          <MapPanel location={location} activeLayer={activeLayer} />
        </div>
        <div className="order-2 lg:order-1">
          <LeftSidebar
            location={location}
            onLocationChange={setLocationId}
            activeLayer={activeLayer}
            onLayerChange={setActiveLayer}
          />
        </div>
        <div className="order-3 lg:order-3">
          <RightSidebar location={location} />
        </div>
      </div>
    </div>
  );
}
