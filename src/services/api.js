import axios from "axios";

const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ||
    "https://your-backend-url.onrender.com/api",
});

// Example APIs
// export const fetchLandUsage = () => API.get("/land/usage");
export const fetchLands = () => API.get("/lands/");
export const fetchLandbyID = async (id) => API.get("/lands/", id);
export const editLand = async (id) => API.put("/lands/", id);
export const addLand = (landData) => API.post("/lands/", landData);
export const deleteLand = (id) => API.delete(`/lands/${id}`);
// export const fetchDisputes = () => API.get("/land/disputes");

export const encroachmentsReport = () => API.get("/reports/summary");

export default API;
