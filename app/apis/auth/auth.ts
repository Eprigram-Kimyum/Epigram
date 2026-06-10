import instance from '../instance';
import {
  SignUpRequest,
  SignUpResponse,
  LoginRequest,
  LoginResponse,
} from './type';

// 회원가입 API
export const registerUser = async (
  signUpData: SignUpRequest,
): Promise<SignUpResponse> => {
  return instance.post(
    '/auth/signUp',
    signUpData,
  ) as unknown as Promise<SignUpResponse>;
};

// 로그인 API 추가
export const loginUser = async (
  loginData: LoginRequest,
): Promise<LoginResponse> => {
  return instance.post(
    '/auth/signIn',
    loginData,
  ) as unknown as Promise<LoginResponse>;
};
