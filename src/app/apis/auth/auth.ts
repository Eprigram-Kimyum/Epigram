import instance from '../instance';
import { LoginRequest, LoginResponse, SignUpRequest, SignUpResponse } from './type';

export const loginUser = async (payload: LoginRequest): Promise<LoginResponse> => {
  return instance.post('/auth/signin', payload);
};

export const registerUser = async (payload: SignUpRequest) => {
  return instance.post('/auth/signup', payload);
};
