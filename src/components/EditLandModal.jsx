// src/components/LandEditModal.jsx
import React, { useState, useEffect } from "react";

export default function LandEditModal({ land, onSave, onClose }) {
  const [formData, setFormData] = useState({
    location: "",
    area: "",
    owner: "",
    status: "",
    value: "",
    encroached: false,
  });

  useEffect(() => {
    if (land) {
      setFormData({
        location: land.location || "",
        area: land.area || "",
        owner: land.owner || "",
        status: land.status || "",
        value: land.value || "",
        encroached: !!land.encroached,
      });
    }
  }, [land]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!land) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl w-96">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
          Edit Land Details
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Area (sq.m)</label>
            <input
              name="area"
              value={formData.area}
              onChange={handleChange}
              type="number"
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Owner</label>
            <input
              name="owner"
              value={formData.owner}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="">Select</option>
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="disputed">Disputed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Value (₹)</label>
            <input
              name="value"
              value={formData.value}
              onChange={handleChange}
              type="number"
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="encroached"
              checked={formData.encroached}
              onChange={handleChange}
            />
            <label>Encroached</label>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
