import axios from 'axios';

export const instance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});

export const authInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});

authInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken') || '';

    if (accessToken) {
      config.headers['Authorization'] = `${accessToken}`;
    }
    return config;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  },
);

authInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          // 리프레시 토큰이 없는 경우 로그인 페이지로 리다이렉트 또는 다른 처리를 수행합니다.
          return Promise.reject('Refresh token not found');
        }

        // 리프레시 토큰을 사용하여 새로운 액세스 토큰을 가져옵니다.
        const response = await axios.post('your-refresh-token-endpoint', {
          refreshToken: refreshToken,
        });

        // 새로운 액세스 토큰을 로컬 스토리지에 저장합니다.
        // saveRefreshTokenToLocalStorage(response.data.accessToken);

        // 원래 요청을 재시도합니다.
        return authInstance(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);
