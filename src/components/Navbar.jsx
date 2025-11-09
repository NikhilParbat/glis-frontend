import DarkModeButton from "./DarkModeButton";

export default function Navbar({ title }) {
  return (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center">
      <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      <span className="text-sm text-gray-500">Government Land Information System</span>
      {/* <DarkModeButton /> */}
    </header>
  );
}
