import { useNavigate } from "react-router-dom";

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <h1 className="text-6xl font-bold text-red-600 mb-4">403</h1>
      <h2 className="text-3xl font-semibold text-gray-800 mb-2">
        Unauthorized Access
      </h2>
      <p className="text-gray-600 mb-6">
        You don’t have permission to view this page.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => navigate("/login")}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Go to Login
        </button>
        <button
          onClick={() => navigate("/")}
          className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
