import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { getAllUsers } from "../../services/auth";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        console.log("Fetching users...");
        const { data } = await getAllUsers();
        console.log("Fetched data:", data);
        setUsers(data);
      } catch (error) {
        console.error("Error loading users:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

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
          <button className="btn-primary mb-4">Add New User</button>
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
                  <tr key={u._id} className="border-t hover:bg-gray-50 transition-all duration-200">
                    <td className="p-3">{u.name}</td>
                    <td className="p-3">{u.email}</td>
                    <td className="p-3 capitalize">{u.role}</td>
                    <td className="p-3 space-x-2">
                      <button
                        className="inline-flex items-center gap-1 rounded-lg bg-blue-500 text-white px-3 py-1.5 text-sm font-medium hover:bg-blue-600 active:scale-95 transition-transform shadow-sm"
                        onClick={() => alert(`Edit user ${u._id}`)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.862 3.487a2.25 2.25 0 013.182 3.182L7.5 19.313l-4.5 1.125 1.125-4.5L16.862 3.487z"
                          />
                        </svg>
                        Edit
                      </button>

                      <button
                        className="inline-flex items-center gap-1 rounded-lg bg-red-500 text-white px-3 py-1.5 text-sm font-medium hover:bg-red-600 active:scale-95 transition-transform shadow-sm"
                        onClick={() => alert(`Delete user ${u._id}`)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
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
