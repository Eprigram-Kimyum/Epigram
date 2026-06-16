import instance from '../instance';
import { LoginRequest, SignUpRequest } from './type';

/* 로그인 요청 API 함수 */
export const loginUser = async (payload: LoginRequest) => {
  return instance.post('/auth/signin', payload);
};

/* 회원가입 요청 API 함수 */
export const registerUser = async (payload: SignUpRequest) => {
  return instance.post('/auth/signup', payload);
};
