import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import StatsBar from "../components/StatsBar";
import LeftSidebar from "../components/LeftSidebar";
import MapPanel from "../components/MapPanel";
import RightSidebar from "../components/RightSidebar";
import { LOCATIONS } from "../data/locations";
import { getEnvironment } from "../services/environmentApi";

export default function Dashboard() {
  const [locationId, setLocationId] = useState(LOCATIONS[0].id);
  const [activeLayer, setActiveLayer] = useState("heat");
  const [environment, setEnvironment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  async function loadEnvironment() {
    try {
      setLoading(true);

      const data = await getEnvironment(
  location.coords[0],
  location.coords[1]
);

      setEnvironment(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  loadEnvironment();
}, [locationId]);

  const location = LOCATIONS.find((loc) => loc.id === locationId) || LOCATIONS[0];
  const liveLocation = {
  ...location,

  current: {
    ...location.current,

    temperature:
      environment?.temperature ??
      location.current.temperature,

    humidity:
      environment?.humidity ??
      location.current.humidity,

    windSpeed:
      environment?.windSpeed ??
      location.current.windSpeed,

    rainfall:
      environment?.rainfall ??
      location.current.rainfall,

    aqi:
      environment?.aqi ??
      location.current.aqi,

    riskScore:
      environment?.riskScore ??
      location.current.riskScore,
  },

  alerts:
    environment?.alerts ??
    location.alerts,
};
  console.log(environment);

  return (
    <div className="h-screen w-screen flex flex-col bg-canvas text-ink-700 overflow-hidden font-sans">
      <Navbar />
      <StatsBar location={liveLocation} />
      <div className="flex flex-1 min-h-0 flex-col lg:flex-row overflow-y-auto lg:overflow-hidden">
        <div className="order-1 lg:order-2 w-full lg:flex-1 lg:min-w-0 h-[60vh] lg:h-auto shrink-0">
          <MapPanel location={liveLocation} activeLayer={activeLayer} />
        </div>
        <div className="order-2 lg:order-1">
          <LeftSidebar
            location={liveLocation}
            onLocationChange={setLocationId}
            activeLayer={activeLayer}
            onLayerChange={setActiveLayer}
          />
        </div>
        <div className="order-3 lg:order-3">
          <RightSidebar location={liveLocation} />
        </div>
      </div>
    </div>
  );
}
