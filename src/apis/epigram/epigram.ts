import instance from '../instance';

import {
  GetEpigramsQueryParams,
  GetEpigramsResponse,
  CreateEpigramRequest,
  EpigramDetail,
  UpdateEpigramPayload,
  GetCommentsQueryParams,
  GetCommentsResponse,
} from './type';

export const getEpigramsApi = async (
  params: GetEpigramsQueryParams = {},
): Promise<GetEpigramsResponse> => {
  const { limit = 4, cursor = null, keyword, writerId } = params;

  return instance.get('/epigrams', {
    params: {
      limit,
      ...(cursor !== null && { cursor }),
      ...(keyword && { keyword }),
      ...(writerId && { writerId }),
    },
  }) as unknown as GetEpigramsResponse;
};

// 에피그램 등록
export const createEpigram = async (payload: CreateEpigramRequest) => {
  const response = await instance.post('/epigrams', payload);
  return response;
};

// 에피그램 상세 조회
export const getEpigramDetailApi = async (id: string | number): Promise<EpigramDetail> => {
  return instance.get(`/epigrams/${id}`) as unknown as EpigramDetail;
};

// 에피그램 수정
export const updateEpigramApi = async (
  id: string | number,
  payload: UpdateEpigramPayload,
): Promise<EpigramDetail> => {
  return instance.patch(`/epigrams/${id}`, payload) as unknown as EpigramDetail;
};

//에피그램 삭제
export const deleteEpigramApi = async (id: string | number): Promise<{ id: number }> => {
  return instance.delete(`/epigrams/${id}`) as unknown as { id: number };
};

// 에피그램 좋아요 등록
export const likeEpigramApi = async (id: string | number): Promise<EpigramDetail> => {
  return instance.post(`/epigrams/${id}/like`) as unknown as EpigramDetail;
};

// 에피그램 좋아요 취소
export const unlikeEpigramApi = async (id: string | number): Promise<EpigramDetail> => {
  return instance.delete(`/epigrams/${id}/like`) as unknown as EpigramDetail;
};

// 에피그램 댓글 목록 조회
export const getEpigramCommentsApi = async (
  id: string | number,
  params: GetCommentsQueryParams = {},
): Promise<GetCommentsResponse> => {
  const { limit = 5, cursor = null } = params;

  return instance.get(`/epigrams/${id}/comments`, {
    params: {
      limit,
      ...(cursor !== null && { cursor }),
    },
  }) as unknown as GetCommentsResponse;
};
