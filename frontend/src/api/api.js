import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api' // Spring Boot rodando localmente
});

// Add request interceptor to include token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Add response interceptor to handle 401 errors
api.interceptors.response.use((response) => response, (error) => {
    if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
    }
    return Promise.reject(error);
});

export const authApi = {
    login: (credentials) => api.post('/auth/login', credentials),
    register: (userData) => api.post('/auth/register', userData),
};

export const endpointsApi = {
    getAll: () => api.get('/endpoints'),
    getById: (id) => api.get(`/endpoints/${id}`),
    create: (endpoint) => api.post('/endpoints', endpoint),
    update: (id, endpoint) => api.put(`/endpoints/${id}`, endpoint),
    delete: (id) => api.delete(`/endpoints/${id}`),
    toggleStatus: (id) => api.patch(`/endpoints/${id}/toggle`),
};

export const mockApi = {
    call: (path, method, data) => api.request({
        url: `/mock${path}`,
        method,
        data,
    }),
};
