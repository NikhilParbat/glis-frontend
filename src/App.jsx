import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/authContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Unauthorized from "./pages/auth/Unauthorized";

import AdminDashboard from "./pages/dashboard/AdminDashboard";
import TotalLands from "./pages/dashboard/TotalLands";
import EncroachmentReports from "./pages/dashboard/EnroachmentReports";
import AddLand from "./pages/dashboard/AddLand";
import ManageUsers from "./pages/dashboard/ManageUsers";
import Landing from "./pages/Landing";

import ViewerDashboard from "./pages/dashboard/ViewerDashboard";

function AppRoutes() {
  const { user } = useAuth();

  // Handle base redirect logic
  const getDefaultRoute = () => {
    if (!user) return "/login";
    if (user.role === "Admin") return "/admin";
    if (["Viewer", "Analyst"].includes(user.role)) return "/viewer";
    return "/login";
  };

  return (
    <Routes>
      {/* Default route */}
      <Route path="/" element={<Landing />} />

      {/* Auth routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute roles={["Admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/lands"
        element={
            <TotalLands />
        }
      />
      <Route
        path="encroachments"
        element={
            <EncroachmentReports />
        }
      />
      <Route
        path="/admin/add-land"
        element={
          <ProtectedRoute roles={["Admin"]}>
            <AddLand />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute roles={["Admin"]}>
            <ManageUsers />
          </ProtectedRoute>
        }
      />

      {/* Viewer Dashboard */}
      <Route
        path="/viewer"
        element={
          <ProtectedRoute roles={["Viewer", "Analyst", "Admin"]}>
            <ViewerDashboard />
          </ProtectedRoute>
        }
      />

      {/* Unknown route fallback */}
      <Route path="*" element={<Navigate to={getDefaultRoute()} replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
