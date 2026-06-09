import instance from '../instance';
import { SignUpRequest, SignUpResponse } from './type';

export const registerUser = async (
  signUpData: SignUpRequest,
): Promise<SignUpResponse> => {
  return instance.post(
    '/auth/signup',
    signUpData,
  ) as unknown as Promise<SignUpResponse>;
};
