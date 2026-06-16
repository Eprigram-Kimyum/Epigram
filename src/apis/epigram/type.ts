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
