import axios from "axios";
import { isTokenExpired } from "./utils/Auth.js";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const baseURL =  "http://localhost:8800/api"
export const makeRequest = axios.create({
    baseURL,
    withCredentials: true,
})

// makeRequest.interceptors.request.use(async (config) => {
//     const token = localStorage.getItem('token');
//     const navigate = useNavigate();
//     if (token && isTokenExpired(token)) {
//         try {
//             const response = await axios.post(`${baseURL}/auth/refresh-token`, {token: localStorage.getItem('refreshToken')}, {
//                 withCredentials: true
//             });
//             const newToken = response.data.token;
//             localStorage.setItem('token', newToken);
//             config.headers['Authorization'] = `Bearer ${newToken}`;
//         } catch (error) {
//             console.error('Error refreshing token:', error);
//             navigate("/login")
//         }
//     } else if (token) {
//         config.headers['Authorization'] = `Bearer ${token}`;
//     }
    
//     return config;
// }, (error) => {
//     return Promise.reject(error);
// });

// export default makeRequest;

