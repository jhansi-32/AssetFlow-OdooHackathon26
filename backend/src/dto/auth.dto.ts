import { RoleName } from '../constants/roles';

export interface SignupDto {
  name: string;
  email: string;
  password: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthTokensDto {
  accessToken: string;
  refreshToken: string;
}

export interface UserResponseDto {
  id: string;
  name: string;
  email: string;
  role: RoleName;
  departmentId: string | null;
  status: string;
}
