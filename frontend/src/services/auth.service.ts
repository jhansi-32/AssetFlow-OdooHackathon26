import { axiosClient } from '@/services/api/axiosClient';
import type {
  LoginPayload,
  LoginResponse,
  ForgotPasswordPayload,
  ResetPasswordPayload,
  AuthUser,
} from '@/types/auth.types';

export const authService = {
  async login(payload: LoginPayload): Promise<LoginResponse> {
    const { data } = await axiosClient.post<LoginResponse>('/auth/login', payload);
    return data;
  },
  async logout(): Promise<void> {
    await axiosClient.post('/auth/logout');
  },
  async forgotPassword(payload: ForgotPasswordPayload): Promise<{ message: string }> {
    const { data } = await axiosClient.post('/auth/forgot-password', payload);
    return data;
  },
  async resetPassword(payload: ResetPasswordPayload): Promise<{ message: string }> {
    const { data } = await axiosClient.post('/auth/reset-password', payload);
    return data;
  },
  async getCurrentUser(): Promise<AuthUser> {
    const { data } = await axiosClient.get<AuthUser>('/auth/me');
    return data;
  },
};
