import instance from '../instance';
import { UserResponse } from './type';

export const getUserMeApi = async (): Promise<UserResponse> => {
  const res = await instance.get('/users/me');
  return res as unknown as UserResponse;
};
