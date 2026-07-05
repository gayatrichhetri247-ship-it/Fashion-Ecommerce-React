import axios from 'axios';

const api =axios.create({
    baseURL:import.meta.env.VITE_API_URL,
    withCredentials:true, // send request with cookies
});

export default api;