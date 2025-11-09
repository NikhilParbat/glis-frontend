// Sidebar.jsx
import { Link, useLocation } from "react-router-dom";
import { Home, Map, FileText, Users, LogOut } from "lucide-react";
import { useAuth } from "../context/authContext"; // import useAuth

export default function Sidebar({ onLogout }) {
  const location = useLocation();
  const { user, logout } = useAuth();

  // safely check role from user context or fallback to 'Viewer'
  const role = user?.role || "Viewer";

  const navItems = [
    {
      path: role === "Admin" ? "/admin" : "/viewer",
      label: "Dashboard",
      icon: <Home size={18} />,
    },
    { path: "/lands", label: "Lands Data", icon: <Map size={18} /> },
    { path: "/encroachments", label: "Reports", icon: <FileText size={18} /> },
  ];

  if (role === "Admin") {
    navItems.push({
      path: "/admin/users",
      label: "Manage Users",
      icon: <Users size={18} />,
    });
  }

  const handleLogout = () => {
    logout();
    if (onLogout) onLogout();
  };

  return (
    <aside className="w-64 bg-teal-800 text-white h-screen p-5 flex flex-col justify-between">
      <div>
        <h1 className="text-2xl font-bold mb-6 text-center">GLIS</h1>
        <nav className="space-y-3">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                location.pathname === item.path
                  ? "bg-teal-600"
                  : "hover:bg-teal-700"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 px-3 py-2 mt-5 bg-red-600 hover:bg-red-700 rounded-lg transition"
      >
        <LogOut size={18} />
        Logout
      </button>
    </aside>
  );
}
