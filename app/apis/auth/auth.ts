import instance from '../instance';
import {
  SignUpRequest,
  SignUpResponse,
  LoginRequest,
  LoginResponse,
} from './type'; // 로그인 타입 추가

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
    '/auth/signIn', // 💡 Swagger 명세서의 로그인 주소와 일치하는지 확인해 주세요 (예: /auth/login 또는 /auth/signIn)
    loginData,
  ) as unknown as Promise<LoginResponse>;
};
