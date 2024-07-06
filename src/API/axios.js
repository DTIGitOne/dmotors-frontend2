import axios from "axios";

export const serverURL = process.env.REACT_APP_SERVER_URL;

const axiosInstance = axios.create({
   baseURL: serverURL,
   headers: {
      'Content-Type': 'application/json',
    },
});

export default axiosInstance;