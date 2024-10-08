import axios from 'axios'

const apiClient = axios.create({
    baseURL: process.env.REACT_APP_baseURL,
    withCredentials: false,
    headers: {
        'Accept': 'application/json',
    },
});


apiClient.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('auth_token')

    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});


apiClient.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (error.response?.status === 401 && window.location.pathname !== '/login') {
        sessionStorage.clear()
        // window.location.reload()
    }

    return Promise.reject(error);
});

export default apiClient;