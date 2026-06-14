import { useState } from "react";

import LeftSidebar from "../components/LeftSidebar";
import MapPanel from "../components/MapPanel";
import RightSidebar from "../components/RightSidebar";

import locations from "../data/locations";

export default function Dashboard() {

  const [selectedLocation, setSelectedLocation] =
    useState(locations[0]);

  return (
    <div className="h-screen flex bg-slate-950 text-white">

      <LeftSidebar
  selectedLocation={selectedLocation}
  setSelectedLocation={setSelectedLocation}
/>

      <MapPanel
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
      />

      <RightSidebar
        selectedLocation={selectedLocation}
      />

    </div>
  );
}