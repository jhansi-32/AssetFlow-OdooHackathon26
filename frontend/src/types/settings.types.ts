export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  emailNotifications: boolean;
  pushNotifications: boolean;
  weeklyDigest: boolean;
}

export interface ProfileUpdatePayload {
  name: string;
  email: string;
  department?: string;
}
