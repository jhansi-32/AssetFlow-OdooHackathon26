import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { sendSuccess } from '../utils/response.util';
import { authService } from '../services/auth.service';
import { HTTP_STATUS } from '../constants/httpStatus';
import { UnauthorizedError } from '../utils/appError';

export const signup = asyncHandler(async (req: Request, res: Response) => {
  const user = await authService.signup(req.body);
  sendSuccess(res, HTTP_STATUS.CREATED, 'Account created successfully', user);
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const result = await authService.login(req.body);
  sendSuccess(res, HTTP_STATUS.OK, 'Login successful', result);
});

export const refresh = asyncHandler(async (req: Request, res: Response) => {
  const tokens = await authService.refresh(req.body.refreshToken);
  sendSuccess(res, HTTP_STATUS.OK, 'Token refreshed', tokens);
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  await authService.logout(req.body.refreshToken);
  sendSuccess(res, HTTP_STATUS.OK, 'Logged out successfully');
});

export const forgotPassword = asyncHandler(async (req: Request, res: Response) => {
  await authService.forgotPassword(req.body.email);
  sendSuccess(res, HTTP_STATUS.OK, 'If that email exists, a reset link has been sent');
});

export const resetPassword = asyncHandler(async (req: Request, res: Response) => {
  await authService.resetPassword(req.body.token, req.body.newPassword);
  sendSuccess(res, HTTP_STATUS.OK, 'Password reset successfully');
});

export const me = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) throw new UnauthorizedError();
  const user = await authService.getProfile(req.user.id);
  sendSuccess(res, HTTP_STATUS.OK, 'Profile fetched', user);
});
