import { authInstance } from './axios';

export const getMyPage = async () => {
  try {
    const accessToken = localStorage.getItem('accessToken') || '';
    const response = await authInstance.get('/api/v1/members', {
      headers: {
        Authorization: `${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    alert('잘못된 요청입니다.');
  }
};
