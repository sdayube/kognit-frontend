import axios, { AxiosError } from 'axios';
import { QueryClient } from 'react-query';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const queryClient = new QueryClient();

const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  baseURL: BASE_URL,
});

api.interceptors.response.use((response) => {
  const token = sessionStorage.getItem('@KOGNIT:token');

  if (token) {
    response.headers['Authorization'] = `Bearer ${token}`;
  }

  return response;
});

api.interceptors.request.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      sessionStorage.removeItem('@KOGNIT:token');
      window.location.href = '/login';
    }

    return Promise.reject(error);
  },
);

export default api;
