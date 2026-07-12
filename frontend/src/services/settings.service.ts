import { axiosClient } from '@/services/api/axiosClient';
import type { UserPreferences, ProfileUpdatePayload } from '@/types/settings.types';

export const settingsService = {
  async getPreferences(): Promise<UserPreferences> {
    const { data } = await axiosClient.get('/settings/preferences');
    return data;
  },
  async updatePreferences(payload: Partial<UserPreferences>): Promise<UserPreferences> {
    const { data } = await axiosClient.put('/settings/preferences', payload);
    return data;
  },
  async updateProfile(payload: ProfileUpdatePayload): Promise<void> {
    await axiosClient.put('/settings/profile', payload);
  },
};
