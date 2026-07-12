const ACCESS_TOKEN_KEY = 'assetflow_access_token';
const REFRESH_TOKEN_KEY = 'assetflow_refresh_token';
const REMEMBER_KEY = 'assetflow_remember_me';

function getStorage(): Storage {
  const remember = localStorage.getItem(REMEMBER_KEY) === 'true';
  return remember ? localStorage : sessionStorage;
}

export const tokenStorage = {
  setTokens(accessToken: string, refreshToken: string, rememberMe: boolean) {
    localStorage.setItem(REMEMBER_KEY, String(rememberMe));
    const store = rememberMe ? localStorage : sessionStorage;
    store.setItem(ACCESS_TOKEN_KEY, accessToken);
    store.setItem(REFRESH_TOKEN_KEY, refreshToken);
  },
  getAccessToken(): string | null {
    return getStorage().getItem(ACCESS_TOKEN_KEY);
  },
  getRefreshToken(): string | null {
    return getStorage().getItem(REFRESH_TOKEN_KEY);
  },
  clear() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(REMEMBER_KEY);
    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    sessionStorage.removeItem(REFRESH_TOKEN_KEY);
  },
};
