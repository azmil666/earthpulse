export default function Navbar() {
  return (
    <nav className="flex justify-between items-center py-4">
      <h1 className="text-2xl font-bold">
        EarthPulse
      </h1>

      <button className="bg-blue-600 px-4 py-2 rounded-lg">
        Search Location
      </button>
    </nav>
  );
}