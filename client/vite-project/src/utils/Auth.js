import { jwtDecode } from "jwt-decode";

export const isTokenExpired = (token) => {
    if (!token) {
        return true;
    }
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
};

export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    const currentUser = localStorage.getItem('userId')
    return !!token; 
  };