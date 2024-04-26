import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  saveTokensToLocalStorage,
  saveRefreshTokenToLocalStorage,
} from '../../util/localStorage/localStorage';
import { instance } from '../../api/axios';
import NotFound from '../../pages/glitch/NotFound';

function RedirectNaver() {
  const navigate = useNavigate();
  const PARAMS = new URL(window.location.href).searchParams;
  const NAVER_CODE = PARAMS.get('code');
  const [accessTokenFetching, setAccessTokenFetching] = useState(false);

  // Access Token 받아오기
  const getAccessToken = async () => {
    if (accessTokenFetching) return; // Return early if fetching

    try {
      setAccessTokenFetching(true); // Set fetching to true

      const response = await instance.get(
        `/api/v1/members/naver/callback?code=${NAVER_CODE}&state=false`,
      );

      const accessToken = response.headers.authorization;
      const refreshToken = response.headers['refresh-token'];

      saveTokensToLocalStorage(accessToken);
      saveRefreshTokenToLocalStorage(refreshToken);

      setAccessTokenFetching(false); // Reset fetching to false
    } catch (error) {
      setAccessTokenFetching(false); // Reset fetching even in case of error
    }
  };

  useEffect(() => {
    if (NAVER_CODE) {
      getAccessToken();
      navigate('/thxkakaomap');
    }
  }, [NAVER_CODE]);

  return <NotFound />;
}

export default RedirectNaver;
