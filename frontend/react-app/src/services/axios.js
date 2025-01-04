import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8080',  // API base URL
    timeout: 5000,  // 5 saniye timeout
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request interceptor
instance.interceptors.request.use(
    config => {
        // Token varsa header'a ekle
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default instance; 