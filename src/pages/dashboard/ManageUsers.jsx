import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import {
  getAllUsers,
  signupUser,
  deleteUser,
  editUser,
} from "../../services/auth";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const { data } = await getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error loading users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (userData) => {
    try {
      await signupUser(userData);
      await loadUsers();
      setShowAddModal(false);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleEditUser = async (id, updates) => {
    try {
      await editUser(id, updates);
      await loadUsers();
      setSelectedUser(null);
    } catch (error) {
      console.error("Error editing user:", error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter((u) => u._id !== id));
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center text-teal-700">
        Loading users...
      </div>
    );

  return (
    <div className="flex h-screen">
      <Sidebar role="Admin" />
      <div className="flex-1 flex flex-col bg-gray-50">
        <Navbar title="Manage Users" />
        <main className="p-6 overflow-auto">
          <button
            onClick={() => setShowAddModal(true)}
            className="mb-4 bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition"
          >
            Add New User
          </button>

          {users.length === 0 ? (
            <div className="text-center text-gray-500 mt-8">No users found.</div>
          ) : (
            <table className="min-w-full border bg-white rounded-xl shadow-md">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Role</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id} className="border-t hover:bg-gray-50 transition-all">
                    <td className="p-3">{u.name}</td>
                    <td className="p-3">{u.email}</td>
                    <td className="p-3 capitalize">{u.role}</td>
                    <td className="p-3 space-x-2">
                      <button
                        className="bg-blue-500 text-white px-3 py-1.5 rounded-md hover:bg-blue-600"
                        onClick={() => setSelectedUser(u)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1.5 rounded-md hover:bg-red-600"
                        onClick={() => {
                          setSelectedUser(u);
                          setShowDeleteModal(true);
                        }}
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

      {/* Add User Modal */}
      {showAddModal && (
        <UserModal
          title="Add New User"
          onClose={() => setShowAddModal(false)}
          onSave={handleAddUser}
          isNew={true}
        />
      )}

      {/* Edit User Modal */}
      {selectedUser && !showDeleteModal && (
        <UserModal
          title="Edit User"
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onSave={(data) => handleEditUser(selectedUser._id, data)}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <DeleteUserModal
          user={selectedUser}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={() => handleDeleteUser(selectedUser._id)}
        />
      )}
    </div>
  );
}

// ====================== USER ADD/EDIT MODAL ======================
function UserModal({ title, user = {}, onClose, onSave, isNew = false }) {
  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    password: "" || user.password,
    role: user.role || "Viewer",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>

        <div className="space-y-3">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
          {isNew && (
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          )}
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="Admin">Admin</option>
            <option value="Viewer">Viewer</option>
          </select>
        </div>

        <div className="flex justify-end mt-5 space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(formData)}
            className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

// ====================== DELETE MODAL ======================
function DeleteUserModal({ user, onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
        <h2 className="text-lg font-semibold mb-4">Delete User</h2>
        <p className="text-gray-600 mb-4">
          Are you sure you want to delete <strong>{user.name}</strong>?
        </p>
        <div className="flex justify-center space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}