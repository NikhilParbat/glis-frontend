import { useState } from "react";
import { signupUser } from "../../services/auth";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "Viewer" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signupUser(form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Error signing up");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center text-teal-700">Create Account</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}

        <input
          type="text"
          placeholder="Full Name"
          className="w-full border p-2 rounded"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <select
          className="w-full border p-2 rounded"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="Viewer">Viewer</option>
          <option value="Admin">Admin</option>
          <option value="Analyst">Analyst</option>
        </select>

        <button className="btn-primary w-full">Sign Up</button>
        <p className="text-center text-sm">
          Already have an account? <Link to="/login" className="text-teal-700 font-medium">Login</Link>
        </p>
      </form>
    </div>
  );
}
