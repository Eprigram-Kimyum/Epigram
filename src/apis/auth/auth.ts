// auth.ts
import axios from 'axios';
import {
  SignUpRequest,
  SignUpResponse,
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
} from './type';

const authInstance = axios.create({
  baseURL: '/api/auth',
});

// 회원가입 API
export const registerUser = async (signUpData: SignUpRequest): Promise<SignUpResponse> => {
  const response = await authInstance.post<SignUpResponse>('/signUp', signUpData);
  return response.data;
};

// 로그인 API
export const loginUser = async (loginData: LoginRequest): Promise<LoginResponse> => {
  const response = await authInstance.post<LoginResponse>('/signIn', loginData);
  return response.data;
};

// 토큰 갱신 API
export const refreshTokens = async (
  refreshData: RefreshTokenRequest,
): Promise<RefreshTokenResponse> => {
  const response = await authInstance.post<RefreshTokenResponse>('/refresh-token', refreshData);
  return response.data;
};
