import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // for cookies/JWT
});

// Response Interceptor (Token Refresh ke liye)
api.interceptors.response.use(
  (response) => {
    // Success response ko seedha pass kar do
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // 401 (Unauthorized) ka matlab hai accessToken expire ho gaya hai
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // /refresh route ko call karo. Browser apne aap refreshToken cookie bhej dega
        await api.post("/refresh");

        // Server naya accessToken cookie mein set kar dega
        // Ab original request (jo fail hui thi) dobara bhejo
        return api(originalRequest);
      } catch (refreshError) {
        // Agar refresh bhi fail ho (refreshToken expire ho gaya hai)
        // User ko login page par bhej do

        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
export default api;
