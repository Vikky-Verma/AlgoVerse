import axios from "axios";

const RAW_ORIGIN = import.meta.env.VITE_API_URL || "http://localhost:8000";

// Strip a trailing slash and a trailing "/api" if someone already included it
// in VITE_API_URL, so we never end up with "/api/api" in the final baseURL.
const API_ORIGIN = RAW_ORIGIN.replace(/\/+$/, "").replace(/\/api$/, "");

const API = axios.create({
  baseURL: `${API_ORIGIN}/api`,
  withCredentials: true,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;