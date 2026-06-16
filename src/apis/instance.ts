import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { getAccessToken, removeAccessToken } from '@/utils/authTokenStorage';

const ERROR_MESSAGES = {
  network: '네트워크 연결이 원활하지 않습니다.',
  server: '서버 내부 오류가 발생했습니다.',
  forbidden: '접근 권한이 없습니다.',
  unknown: '알 수 없는 오류가 발생했습니다.',
} as const;

const getValidToken = (): string | null => {
  return getAccessToken();
};

const config: AxiosRequestConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
};

const instance: AxiosInstance = axios.create(config);

instance.interceptors.request.use(
  (config) => {
    const token = getValidToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error: unknown) => {
    if (!axios.isAxiosError(error)) {
      alert(ERROR_MESSAGES.unknown);
      return Promise.reject(error);
    }

    if (!error.response) {
      alert(ERROR_MESSAGES.network);
      return Promise.reject(error);
    }

    const { status } = error.response;

    switch (status) {
      case 401:
        alert('인증이 만료되었습니다. 다시 로그인해주세요.');
        removeAccessToken();
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        break;
      case 403:
        alert(ERROR_MESSAGES.forbidden);
        break;
      case 500:
        alert(ERROR_MESSAGES.server);
        break;
      default:
        const serverMessage = (error.response.data as { message?: string })?.message;
        alert(serverMessage || ERROR_MESSAGES.unknown);
    }

    return Promise.reject(error);
  },
);

export default instance;
