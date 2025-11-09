import axios from "axios";

const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ||
    "https://your-backend-url.onrender.com/api",
});

export const signupUser = async (data) => API.post("/auth/register", data);
export const loginUser = async (data) => API.post("/auth/login", data);
export const getAllUsers = () => API.get("/auth/users");
export const editUser = async (id, data) => API.put(`/auth/user/${id}`, data);
export const deleteUser = async (id) => API.delete(`/auth/user/${id}`);
