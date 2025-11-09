import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { addLand } from "../../services/api"; // ✅ import the correct function

export default function AddLand() {
  const [form, setForm] = useState({
    location: "",
    area: "",
    owner: "",
    status: "public",
    value: "",
    encroached: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addLand(form); // ✅ use your API helper
      alert("✅ Land added successfully!");
      setForm({
        location: "",
        area: "",
        owner: "",
        status: "public",
        value: "",
        encroached: false,
      });
    } catch (error) {
      console.error("Error adding land:", error);
      alert("❌ Failed to add land");
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gray-50">
        <Navbar title="Add New Land" />

        <main className="flex justify-center items-center flex-1 px-4">
          <form
            onSubmit={handleSubmit}
            className="bg-white w-full max-w-lg p-8 rounded-2xl shadow-xl border border-gray-100"
          >
            <h2 className="text-2xl font-semibold text-teal-800 mb-6 text-center">
              🏡 Add Land Details
            </h2>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-gray-700 mb-1">Location</label>
                <input
                  name="location"
                  placeholder="Enter location"
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  value={form.location}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Area (sq.m)</label>
                <input
                  name="area"
                  type="number"
                  placeholder="Enter area"
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  value={form.area}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Owner</label>
                <input
                  name="owner"
                  placeholder="Owner name"
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  value={form.owner}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Status</label>
                <select
                  name="status"
                  className="w-full border rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                  <option value="disputed">Disputed</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Value (₹)</label>
                <input
                  name="value"
                  type="number"
                  placeholder="Enter value"
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  value={form.value}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  name="encroached"
                  checked={form.encroached}
                  onChange={handleChange}
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                />
                <span className="text-gray-700">Mark as Encroached</span>
              </div>

              <button
                type="submit"
                className="mt-6 w-full bg-teal-700 hover:bg-teal-800 text-white font-semibold py-2.5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
              >
                ➕ Add Land
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
