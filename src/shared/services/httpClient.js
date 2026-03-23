import axios from 'axios';
import { getToken } from '@/shared/services/authStorage.js';

const http = axios.create({
    baseURL: import.meta.env.VITE_API_URL ?? '/api',
    timeout: 15000,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
});

http.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default http;
