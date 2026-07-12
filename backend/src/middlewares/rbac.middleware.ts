import { NextFunction, Request, Response } from 'express';
import { RoleName } from '../constants/roles';
import { ForbiddenError, UnauthorizedError } from '../utils/appError';

export function authorize(...allowedRoles: RoleName[]) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) throw new UnauthorizedError();
    if (!allowedRoles.includes(req.user.role)) {
      throw new ForbiddenError(`Role '${req.user.role}' is not permitted to perform this action`);
    }
    next();
  };
}
