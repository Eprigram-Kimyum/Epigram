import instance from '../../apis/instance';
import { GetEpigramsResponse } from './type';

export const getEpigramsApi = async (
  cursor: number | null = null,
  limit: number = 4,
): Promise<GetEpigramsResponse> => {
  const response = await instance.get<GetEpigramsResponse>('', {
    params: {
      limit,
      ...(cursor !== null && { cursor }),
    },
  });

  return response.data;
};
