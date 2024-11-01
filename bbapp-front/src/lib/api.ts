import axios from 'axios';
import { APP_ROUTES } from '../routes.ts';

export const API_HOST = import.meta.env.VITE_API_HOST as string;

const api = axios.create({
    baseURL: API_HOST,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response.status === 498) {
            localStorage.removeItem('token');
            window.location.href = APP_ROUTES.login;
        }
    }
);

export default api;
