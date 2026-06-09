import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';

const config: AxiosRequestConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://api.example.com',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
};

const instance: AxiosInstance = axios.create(config);

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('accessToken');

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error: AxiosError) => {
    if (error.response) {
      const { status } = error.response;

      switch (status) {
        case 401:
          console.error('인증이 만료되었습니다. 다시 로그인해주세요.');
          break;
        case 403:
          console.error('접근 권한이 없습니다.');
          break;
        case 500:
          console.error('서버 내부 에러가 발생했습니다.');
          break;
        default:
          console.error(`에러가 발생했습니다: ${status}`);
      }
    } else if (error.request) {
      console.error('네트워크 연결 상태를 확인해주세요.');
    }

    return Promise.reject(error);
  },
);

export default instance;
