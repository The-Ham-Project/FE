import { authInstance } from './axios';

export const getMyPage = async () => {
  try {
    const Authorization = localStorage.getItem('Authorization') || '';
    const response = await authInstance.get('/user/mypage', {
      headers: {
        Authorization: `${Authorization}`,
      },
    });
    return response.data;
  } catch (error) {
    alert('잘못된 요청입니다.');
  }
};
