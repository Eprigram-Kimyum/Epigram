import instance from '../instance';
import { LoginRequest, LoginResponse, SignUpRequest, SignUpResponse } from './type';

export const loginUser = async (payload: LoginRequest): Promise<LoginResponse> => {
  return instance.post('/auth/signin', payload);
};

/* 회원가입 요청 API 함수 */
export const registerUser = async (payload: SignUpRequest) => {
  return instance.post('/auth/signup', payload);
};
