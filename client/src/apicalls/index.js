


import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL:"https://backend-assignment-1-3pjl.onrender.com/" ,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Interceptor to attach the token to requests
axiosInstance.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// "http://localhost:3001"