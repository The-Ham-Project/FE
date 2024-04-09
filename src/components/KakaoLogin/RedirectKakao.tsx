import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { saveTokensToLocalStorage } from '../../util/localStorage/localStorage';

// const client_id = import.meta.env.VITE_APP_KAKAO_CLIENT_ID;
// const redirect_uri = import.meta.env.VITE_APP_KAKAO_REDIRECT_URI;

function RedirectKakao() {
  // const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code`;

  const navigate = useNavigate();
  const PARAMS = new URL(window.location.href).searchParams;
  const KAKAO_CODE = PARAMS.get('code');
  const [accessTokenFetching, setAccessTokenFetching] = useState(false);

  console.log('KAKAO_CODE:', KAKAO_CODE);

  // Access Token 받아오기
  const getAccessToken = async () => {
    if (accessTokenFetching) return; // Return early if fetching

    console.log('getAccessToken 호출');

    try {
      setAccessTokenFetching(true); // Set fetching to true

      const response = await axios.get(
        `https://api.openmpy.com/api/v1/members/kakao/callback?code=${KAKAO_CODE}`,
      );
      console.log('나 김동준이야', response);
      const accessToken = response.headers.authorization;
      console.log('accessToken:', accessToken);
      saveTokensToLocalStorage(accessToken);
      // localStorage.setItem('accessToken', accessToken);
      setAccessTokenFetching(false); // Reset fetching to false
      navigate('/thxkakaomap');
    } catch (error) {
      console.error('Error:', error);
      setAccessTokenFetching(false); // Reset fetching even in case of error
    }
  };

  useEffect(() => {
    if (KAKAO_CODE) {
      getAccessToken();
    }
  }, [KAKAO_CODE]);

  return (
    <>
      <button>까까오 로긴 꼴백</button>
    </>
  );
}

export default RedirectKakao;
