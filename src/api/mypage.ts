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
    `/api/v1/members/check-nickname/${nickname}`,
  );
  console.log(response.data);
  return response.data;
};

export const changeUserName = async (userInfo): Promise<string> => {
  // const nicknameCheck = /^[a-zA-Z0-9가-힣]{3,10}$/;
  if (userInfo.length >= 10) {
    throw new Error('닉네임은 특수문자 제외 3자~10자로 설정해주세요!');
  }
  try {
    const response = await authInstance.put(
      `/api/v1/members`,
      userInfo.formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    // ('/nickname', { nickname });
    console.log(response);
    console.log(userInfo);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error('사용자 정보를 수정하는 중 오류가 발생했습니다.');
  }
};
