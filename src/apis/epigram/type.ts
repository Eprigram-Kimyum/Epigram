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

export interface EpigramSuccessResponse {
  id: number;
  writerId: number;
  author: string;
  content: string;
  referenceTitle: string;
  referenceUrl: string;
  tags: {
    id: number;
    name: string;
  }[];
  likeCount: number;
}

export interface ApiErrorResponse {
  message: string;
}
