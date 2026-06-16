import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

const config: AxiosRequestConfig = {
  baseURL: '/apis',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
};

const instance = axios.create(config);

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error: AxiosError) => {
    if (error.response) {
      const status = error.response.status;

      if (status === 401) {
        console.warn('인증 토큰이 없거나 만료된 요청입니다:', error.config?.url);
      }
    }
    return Promise.reject(error);
  },
);

export default instance;
