export default function LeftSidebar() {
  return (
    <div className="w-80 bg-slate-900 border-r border-slate-800 p-5">

      <h2 className="text-xl font-bold mb-6">
        EarthPulse
      </h2>

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