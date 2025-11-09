import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="flex h-screen">
      <Sidebar onLogout={handleLogout} role="Admin" />
      <div className="flex-1 flex flex-col bg-white text-black">
        <Navbar title="Admin Dashboard" />

        <main className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="card hover:shadow-lg">
            <h3 className="page-heading">Total Lands</h3>
            <p className="text-gray-600">View and manage all land records.</p>
            <button
              onClick={() => navigate("/lands")}
              className="btn-primary mt-3"
            >
              View Lands
            </button>
          </div>

          <div className="card hover:shadow-lg">
            <h3 className="page-heading">Encroachment Reports</h3>
            <p className="text-gray-600">
              Track areas marked as encroached.
            </p>
            <button
              onClick={() => navigate("/encroachments")}
              className="btn-primary mt-3"
            >
              View Reports
            </button>
          </div>

          <div className="card hover:shadow-lg">
            <h3 className="page-heading">Add New Land</h3>
            <p className="text-gray-600">Add new land entries to database.</p>
            <button
              onClick={() => navigate("/admin/add-land")}
              className="btn-primary mt-3"
            >
              Add Land
            </button>
          </div>

          <div className="card hover:shadow-lg">
            <h3 className="page-heading">Manage Users</h3>
            <p className="text-gray-600">
              Add, update, or delete user accounts.
            </p>
            <button
              onClick={() => navigate("/admin/users")}
              className="btn-primary mt-3"
            >
              Manage
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
