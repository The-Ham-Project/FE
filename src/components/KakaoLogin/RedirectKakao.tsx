import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  saveTokensToLocalStorage,
  saveRefreshTokenToLocalStorage,
} from '../../util/localStorage/localStorage';
import { instance } from '../../api/axios';
import NotFound from '../../pages/glitch/NotFound';

function RedirectKakao() {
  const navigate = useNavigate();
  const PARAMS = new URL(window.location.href).searchParams;
  const KAKAO_CODE = PARAMS.get('code');
  const [accessTokenFetching, setAccessTokenFetching] = useState(false);



  // Access Token 받아오기
  const getAccessToken = async () => {
    if (accessTokenFetching) return; // Return early if fetching

    try {
      setAccessTokenFetching(true); // Set fetching to true

      const response = await instance.get(
        `/api/v1/members/kakao/callback?code=${KAKAO_CODE}`,
      );

      const accessToken = response.headers.authorization;
      const refreshToken = response.headers['refresh-token'];

      saveTokensToLocalStorage(accessToken);
      saveRefreshTokenToLocalStorage(refreshToken);

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

  return <NotFound />;
}

export default RedirectKakao;
