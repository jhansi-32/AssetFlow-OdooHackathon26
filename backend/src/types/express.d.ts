import { RoleName } from '../constants/roles';

export interface AuthUser {
  id: string;
  email: string;
  role: RoleName;
  departmentId: string | null;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

export {};
