export interface EpigramTag {
  id: number;
  name: string;
}

export interface Epigram {
  id: number;
  content: string;
  author: string;
  referenceTitle: string;
  referenceUrl: string;
  writerId: number;
  likeCount: number;
  tags: EpigramTag[];
}

export interface GetEpigramsQueryParams {
  limit?: number;
  cursor?: number | null;
  keyword?: string;
  writerId?: number;
}

export interface GetEpigramsResponse {
  totalCount: number;
  nextCursor: number | null;
  list: Epigram[];
}

export interface CreateEpigramRequest {
  content: string;
  author: string;
  referenceTitle?: string;
  referenceUrl?: string;
  tags?: string[];
}

export interface EpigramDetail {
  id: number;
  content: string;
  author: string;
  referenceTitle: string;
  referenceUrl: string;
  writerId: number;
  likeCount: number;
  isLiked: boolean;
  tags: EpigramTag[];
}

export interface UpdateEpigramPayload {
  content: string;
  author?: string;
  referenceTitle?: string;
  referenceUrl?: string;
  tags?: string[];
}

// 댓글 관련 타입
export interface CommentWriter {
  id: number;
  nickname: string;
  image: string | null;
}

export interface EpigramComment {
  id: number;
  content: string;
  isPrivate: boolean;
  epigramId: number;
  writer: CommentWriter;
  createdAt: string;
  updatedAt: string;
}

export interface GetCommentsQueryParams {
  limit?: number;
  cursor?: number | null;
}

export interface GetCommentsResponse {
  totalCount: number;
  nextCursor: number | null;
  list: EpigramComment[];
}
