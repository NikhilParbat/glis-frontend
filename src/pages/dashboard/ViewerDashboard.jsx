import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

export default function ViewerDashboard() {
  const navigate = useNavigate();
  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   window.location.href = "/login";
  // };

  return (
    <div className="flex h-screen">
      <Sidebar role="Viewer" />
      <div className="flex-1 flex flex-col bg-gray-100">
        <Navbar title="Viewer Dashboard" />

        <main className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="card">
            <h3 className="page-heading">Public Lands</h3>
            <p className="text-gray-600">Explore all publicly owned land records.</p>
            <button
              onClick={() => navigate("/lands")}
              className="btn-primary mt-3"
            >
              View Lands
            </button>
          </div>

        </main>
      </div>
    </div>
  );
}
