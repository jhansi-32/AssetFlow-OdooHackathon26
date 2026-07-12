import { RoleName } from '../constants/roles';

export interface AccessTokenPayload {
  sub: string;
  email: string;
  role: RoleName;
  departmentId: string | null;
}

export interface RefreshTokenPayload {
  sub: string;
  tokenId: string;
}
