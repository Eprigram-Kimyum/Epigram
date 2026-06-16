export interface CommentWriter {
  image: string | null;
  nickname: string;
  id: number;
}

export interface CommentItemType {
  epigramId: number;
  writer: CommentWriter;
  updatedAt: string;
  createdAt: string;
  isPrivate: boolean;
  content: string;
  id: number;
}

export interface CommentListResponse {
  totalCount: number;
  nextCursor: number | null;
  list: CommentItemType[];
}

export interface CreateCommentRequest {
  epigramId: number;
  isPrivate: boolean;
  content: string;
}

export interface UpdateCommentRequest {
  isPrivate: boolean;
  content: string;
}

export interface DeleteCommentResponse {
  id: number;
}
