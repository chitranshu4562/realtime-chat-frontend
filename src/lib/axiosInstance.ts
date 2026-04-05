import axios from "axios";

const getBaseUrl = (): string => {
    if (window.location.origin) return window.location.origin;
    return "";
}

const axiosInstance = axios.create({
    baseURL: getBaseUrl(),
    withCredentials: true,
})

axiosInstance.interceptors.request.use((config) => {
    config.headers.Accept = "application/json";
    return config;
})

axiosInstance.interceptors.response.use((response) => {
    return response.data;
}, (error) => {
    return Promise.reject(error.response.data);
})

export default axiosInstance;