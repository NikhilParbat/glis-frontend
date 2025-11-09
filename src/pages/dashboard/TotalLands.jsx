import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { fetchLands, editLand }  from "../../services/api";

export default function TotalLands() {
  const [lands, setLands] = useState([]);

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

  const handleEdit = async (id) => {
    const newValue = prompt("Enter new land value (₹):");
    if (newValue) {
      try {
        await editLand(id, { value: newValue });
        setLands((prev) =>
          prev.map((land) =>
            land._id === id ? { ...land, value: newValue } : land
          )
        );
      } catch (error) {
        console.error("Error updating land:", error);
      }
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this land?")) {
      try {
        await API.delete(`/land/${id}`);
        setLands((prev) => prev.filter((l) => l._id !== id));
      } catch (error) {
        console.error("Error deleting land:", error);
      }
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar role="Viewer" />
      <div className="flex-1 flex flex-col bg-gray-50">
        <Navbar title="All Land Records" />

        <main className="p-6 overflow-auto">
          {lands.length === 0 ? (
            <p className="text-gray-600">No land records found.</p>
          ) : (
            <table className="min-w-full border bg-white rounded-xl shadow-md">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="p-3 text-left">Location</th>
                  <th className="p-3 text-left">Area (sq.m)</th>
                  <th className="p-3 text-left">Owner</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Value (₹)</th>
                  <th className="p-3 text-left">Encroached</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {lands.map((land) => (
                  <tr key={land._id} className="border-t hover:bg-gray-50">
                    <td className="p-3">{land.location}</td>
                    <td className="p-3">{land.area}</td>
                    <td className="p-3">{land.owner}</td>
                    <td className="p-3 capitalize">{land.status}</td>
                    <td className="p-3">{land.value}</td>
                    <td className="p-3">{land.encroached ? "Yes" : "No"}</td>
                    <td className="p-3 space-x-2">
                      <button
                        onClick={() => handleEdit(land._id)}
                        className="btn-secondary"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(land._id)}
                        className="btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </main>
      </div>
    </div>
  );
}
