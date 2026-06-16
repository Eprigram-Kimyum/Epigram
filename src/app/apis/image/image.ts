import instance from '@/app/apis/instance';
import { UploadImageParams, UploadImageResponse } from './type';

export const uploadImage = async ({
  teamId,
  image,
}: UploadImageParams): Promise<UploadImageResponse> => {
  const formData = new FormData();
  formData.append('image', image);

  const response = await instance.post<UploadImageResponse>(`/${teamId}/images/upload`, formData);

  return response.data;
};
