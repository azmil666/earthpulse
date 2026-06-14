import locations from "../data/locations";

export default function LeftSidebar({
  selectedLocation,
  setSelectedLocation,
}) {
  return (
    <div className="w-72 bg-slate-900 border-r border-slate-800 p-5">

      <h2 className="text-xl font-bold mb-6">
        EarthPulse
      </h2>
      <div className="mb-4">
  <select
    value={selectedLocation.name}
    onChange={(e) => {
      const selected = locations.find(
        (loc) => loc.name === e.target.value
      );

      setSelectedLocation(selected);
    }}
    className="w-full bg-slate-800 p-3 rounded-lg"
  >
    {locations.map((location) => (
      <option
        key={location.id}
        value={location.name}
      >
        {location.name}
      </option>
    ))}
  </select>
</div>

      <div className="bg-slate-800 rounded-xl p-4 mb-4">
        <h3 className="font-semibold mb-2">
          Weather
        </h3>

        <p>🌡 Temp: --°C</p>
        <p>💧 Humidity: --%</p>
        <p>💨 Wind: -- km/h</p>
      </div>

      <div className="bg-slate-800 rounded-xl p-4 mb-4">
        <h3 className="font-semibold mb-2">
          Air Quality
        </h3>

        <p>AQI: --</p>
      </div>

      <div className="bg-slate-800 rounded-xl p-4">
        <h3 className="font-semibold mb-2">
          Layers
        </h3>

        <p>☑ Weather</p>
        <p>☑ AQI</p>
        <p>☑ Heat</p>
      </div>

    </div>
  );
}