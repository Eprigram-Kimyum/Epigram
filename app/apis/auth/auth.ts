import axios from 'axios';
import {
  SignUpRequest,
  SignUpResponse,
  LoginRequest,
  LoginResponse,
} from './type';

const authInstance = axios.create({
  baseURL: '/api/auth',
});

// 회원가입 API
export const registerUser = async (
  signUpData: SignUpRequest,
): Promise<SignUpResponse> => {
  const response = await authInstance.post<SignUpResponse>(
    '/signUp',
    signUpData,
  );
  return response.data;
};

// 로그인 API
export const loginUser = async (
  loginData: LoginRequest,
): Promise<LoginResponse> => {
  const response = await authInstance.post('/signIn', loginData);
  return response.data as LoginResponse;
};
