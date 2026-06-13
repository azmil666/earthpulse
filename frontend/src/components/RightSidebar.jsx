export default function RightSidebar() {
  return (
    <div className="w-80 bg-slate-900 border-l border-slate-800 p-5">

      <h2 className="text-xl font-bold mb-4">
        Risk Analysis
      </h2>

      <div className="bg-slate-800 rounded-xl p-4 mb-4">
        <h3 className="font-semibold">
          Environmental Risk
        </h3>

        <p className="text-3xl font-bold mt-2">
          --/100
        </p>
      </div>

      <div className="bg-slate-800 rounded-xl p-4">
        <h3 className="font-semibold mb-2">
          Alerts
        </h3>

        <p>No alerts available</p>
      </div>

    </div>
  );
}