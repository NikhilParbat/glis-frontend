import { useState } from "react";
import API from "../services/api";

export default function LandForm({ setLands }) {
  const [form, setForm] = useState({
    location: "",
    area: "",
    owner: "",
    status: "public",
    value: "",
    encroached: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await API.post("/lands", form);
    setLands((prev) => [...prev, data]);
    setForm({
      location: "",
      area: "",
      owner: "",
      status: "public",
      value: "",
      encroached: false,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-5 rounded-2xl shadow space-y-3">
      <h3 className="text-lg font-semibold">Add New Land</h3>
      <div className="grid md:grid-cols-2 gap-3">
        <input
          placeholder="Location"
          className="border p-2 rounded"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />
        <input
          placeholder="Area (sq km)"
          type="number"
          className="border p-2 rounded"
          value={form.area}
          onChange={(e) => setForm({ ...form, area: e.target.value })}
        />
        <input
          placeholder="Owner"
          className="border p-2 rounded"
          value={form.owner}
          onChange={(e) => setForm({ ...form, owner: e.target.value })}
        />
        <input
          placeholder="Value (₹)"
          type="number"
          className="border p-2 rounded"
          value={form.value}
          onChange={(e) => setForm({ ...form, value: e.target.value })}
        />
      </div>

      <select
        className="border p-2 rounded w-full"
        value={form.status}
        onChange={(e) => setForm({ ...form, status: e.target.value })}
      >
        <option value="public">Public</option>
        <option value="private">Private</option>
        <option value="disputed">Disputed</option>
      </select>

      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={form.encroached}
          onChange={(e) => setForm({ ...form, encroached: e.target.checked })}
        />
        <span>Encroached</span>
      </label>

      <button className="btn-primary w-full">Add Land</button>
    </form>
  );
}
