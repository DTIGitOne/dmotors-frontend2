import axios from "axios";

export const serverURL = "http://localhost:8000";

const axiosInstance = axios.create({
   baseURL: serverURL,
   headers: {
      'Content-Type': 'application/json',
    },
});

export default axiosInstance;