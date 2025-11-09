import { Link } from "react-router-dom";
import DarkModeButton from "./DarkModeButton";
import Govt from "../assets/govt.png";

export default function Header() {
  return (
    <header className="flex justify-between items-center bg-teal-800 text-white px-8 py-4 shadow-lg">
      <div className="flex items-center gap-3">
        <img
          src= {Govt}
          alt="Govt Logo"
          className="w-10 h-10 rounded-full"
        />
        <h1 className="text-xl font-semibold">
          Govt. Land Information System (GLIS)
        </h1>
      </div>
      <nav className="flex gap-6 items-center">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <Link to="/login" className="hover:underline">
          Login
        </Link>
        <Link to="/signup" className="hover:underline">
          Signup
        </Link>
        <DarkModeButton />
      </nav>
    </header>
  );
}
