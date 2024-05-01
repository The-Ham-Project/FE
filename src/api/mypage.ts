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

export const checkDuplicateNickname = async (nickname: string) => {
  const response = await authInstance.get(
    `/api/v1/members/check-nickname?nickname=${nickname}`,
  );
  console.log(response.data);
  return response.data;
};

export const changeUserName = async (nickname: string): Promise<string> => {
  // const nicknameCheck = /^[a-zA-Z0-9가-힣]{3,10}$/;
  if (nickname.length >= 10) {
    throw new Error('닉네임은 특수문자 제외 3자~10자로 설정해주세요!');
  }
  const response = await authInstance.put('/api/v1/members', { nickname });
  console.log(response);
  console.log(nickname);
  console.log(response.data);
  return response.data;
};
