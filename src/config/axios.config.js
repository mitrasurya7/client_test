import axios from "axios";

const api = axios.create({
  baseURL: "https://server-production-e6df.up.railway.app",
  // baseURL: "http://localhost:8000",
});
api.interceptors.request.use((config) => {
  if (localStorage.access_token) {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      config.headers["access_token"] = access_token;
    }
  }
  return config;
});

export default api;
