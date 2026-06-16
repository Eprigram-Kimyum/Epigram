export interface UserInfo {
  id: number;
  email: string;
  nickname: string;
  teamId: string;
  updatedAt: string;
  createdAt: string;
  image: string | null;
}

export interface SignUpRequest {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

export interface SignUpResponse {
  accessToken: string;
  refreshToken: string;
  user: UserInfo;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: UserInfo;
}
