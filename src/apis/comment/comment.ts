import instance from '../instance';
import {
  CommentListResponse,
  CommentItemType,
  CreateCommentRequest,
  UpdateCommentRequest,
  DeleteCommentResponse,
} from './type';

// 댓글 목록 조회 (커서 기반 무한 스크롤)
export const getCommentsApi = async (
  epigramId: number,
  cursor: number | null = null,
  limit: number = 5,
): Promise<CommentListResponse> => {
  const response = await instance.get<CommentListResponse>('/comments', {
    params: {
      limit,
      epigramId,
      ...(cursor !== null && { cursor }),
    },
  });
  return response.data;
};

// 댓글 작성
export const createCommentApi = async (payload: CreateCommentRequest): Promise<CommentItemType> => {
  const response = await instance.post<CommentItemType>('/comments', payload);
  return response.data;
};

// 댓글 수정
export const updateCommentApi = async (
  commentId: number,
  payload: UpdateCommentRequest,
): Promise<CommentItemType> => {
  const response = await instance.patch<CommentItemType>(`/comments/${commentId}`, payload);
  return response.data;
};

// 댓글 삭제
export const deleteCommentApi = async (commentId: number): Promise<DeleteCommentResponse> => {
  const response = await instance.delete<DeleteCommentResponse>(`/comments/${commentId}`);
  return response.data;
};
