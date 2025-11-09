import axios from "axios";

const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ||
    "https://your-backend-url.onrender.com/api",
});

export const signupUser = async (data) => API.post("/auth/register", data);
export const loginUser = async (data) => API.post("/auth/login", data);
export const getAllUsers = () => API.get("/auth/users");
export const deleteUser = async (id) => {
  const token = localStorage.getItem("token");
  return API.delete(`/auth/user/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
