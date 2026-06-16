export interface UserResponse {
  image: string | null;
  updatedAt: string;
  createdAt: string;
  teamId: string;
  nickname: string;
  id: number;
}

export interface UpdateUserRequest {
  image?: string | null;
  nickname?: string;
}
