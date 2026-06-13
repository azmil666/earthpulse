import Navbar from "../components/Navbar";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto p-6">

        <Navbar />

        <h1 className="text-5xl font-bold mt-10">
          Environmental Intelligence
        </h1>

        <p className="text-slate-400 mt-2">
          Real-time weather, pollution and environmental risk tracking.
        </p>
        <div className="grid md:grid-cols-3 gap-6 mt-10">

  <div className="bg-slate-900 p-6 rounded-2xl">
    <h2 className="text-xl font-semibold">
      Weather
    </h2>
    <p className="text-slate-400 mt-2">
      -- °C
    </p>
  </div>

  <div className="bg-slate-900 p-6 rounded-2xl">
    <h2 className="text-xl font-semibold">
      Air Quality
    </h2>
    <p className="text-slate-400 mt-2">
      Loading...
    </p>
  </div>

  <div className="bg-slate-900 p-6 rounded-2xl">
    <h2 className="text-xl font-semibold">
      Risk Score
    </h2>
    <p className="text-slate-400 mt-2">
      Calculating...
    </p>
  </div>

</div>
      </div>
    </div>
  );
}