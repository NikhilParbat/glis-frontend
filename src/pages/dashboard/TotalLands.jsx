import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import EditLandModal from "../../components/EditLandModal";
import DeleteLandModal from "../../components/DeleteLandModal";
import { fetchLands, editLand, deleteLand } from "../../services/api";
import { useAuth } from "../../context/authContext";

export default function TotalLands() {
  const [lands, setLands] = useState([]);
  const [selectedLand, setSelectedLand] = useState(null);
  const [deleteLandData, setDeleteLandData] = useState(null);
  const { user, logout } = useAuth();

  // Change this dynamically when auth is ready
  const userRole = user?.role || "Viewer"; // or "Viewer"

  useEffect(() => {
    const loadLands = async () => {
      try {
        const { data } = await fetchLands();
        setLands(data);
      } catch (error) {
        console.error("Error fetching lands:", error);
      }
    };
    loadLands();
  }, []);

  const handleEditClick = (land) => setSelectedLand(land);
  const handleDeleteClick = (land) => setDeleteLandData(land);

  const handleSave = async (updatedData) => {
    try {
      await editLand(selectedLand._id, updatedData);
      setLands((prev) =>
        prev.map((l) =>
          l._id === selectedLand._id ? { ...l, ...updatedData } : l
        )
      );
      setSelectedLand(null);
    } catch (error) {
      console.error("Error editing land:", error);
    }
  };

  const handleDeleteConfirm = async (id) => {
    try {
      await deleteLand(id);
      setLands((prev) => prev.filter((l) => l._id !== id));
      setDeleteLandData(null);
    } catch (error) {
      console.error("Error deleting land:", error);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar role={userRole} />
      <div className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-900 dark:text-gray-100">
        <Navbar title="All Land Records" />

        <main className="p-6 overflow-auto">
          <table className="min-w-full border bg-white dark:bg-gray-800 rounded-xl shadow-md">
            <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
              <tr>
                <th className="p-3 text-left">Location</th>
                <th className="p-3 text-left">Area (sq.m)</th>
                <th className="p-3 text-left">Owner</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Value (₹)</th>
                <th className="p-3 text-left">Encroached</th>
                {userRole === "Admin" && (
                  <th className="p-3 text-left">Actions</th>
                )}
              </tr>
            </thead>
            <tbody>
              {lands.map((land) => (
                <tr
                  key={land._id}
                  className="border-t hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="p-3">{land.location}</td>
                  <td className="p-3">{land.area}</td>
                  <td className="p-3">{land.owner}</td>
                  <td className="p-3">{land.status}</td>
                  <td className="p-3">{land.value}</td>
                  <td className="p-3">{land.encroached ? "Yes" : "No"}</td>

                  {userRole === "Admin" && (
                    <td className="p-3 space-x-2">
                      <button
                        onClick={() => handleEditClick(land)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(land)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </main>

        {/* Edit Modal */}
        {selectedLand && (
          <EditLandModal
            land={selectedLand}
            onSave={handleSave}
            onClose={() => setSelectedLand(null)}
          />
        )}

        {/* Delete Modal */}
        {deleteLandData && (
          <DeleteLandModal
            land={deleteLandData}
            onClose={() => setDeleteLandData(null)}
            onConfirm={handleDeleteConfirm}
          />
        )}
      </div>
    </div>
  );
}
