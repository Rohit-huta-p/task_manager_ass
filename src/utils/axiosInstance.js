import axios from "axios";

axios.defaults.withCredentials = true;
const axiosInstance = axios.create({
    // baseURL: "http://localhost:8000",
    baseURL: "https://task-manager-ass.vercel.app"
})
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    console.log(token);
    
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Attach token to headers
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

export default axiosInstance;