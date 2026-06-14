export default function RightSidebar({
  selectedLocation,
}) {
  return (
    <div className="w-72 bg-slate-900 p-5">

      <h2 className="text-xl font-bold mb-6">
        Location Details
      </h2>

      <div className="bg-slate-800 rounded-xl p-4">

        <h3 className="text-2xl font-bold">
          {selectedLocation.name}
        </h3>

        <p className="mt-3">
          Latitude:
          {" "}
          {selectedLocation.lat}
        </p>

        <p>
          Longitude:
          {" "}
          {selectedLocation.lng}
        </p>

      </div>

    </div>
  );
}