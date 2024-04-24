import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveTokensToLocalStorage } from '../../util/localStorage/localStorage';
import { instance } from '../../api/axios';
import NotFound from '../../pages/glitch/NotFound';

function RedirectNaver() {
  // const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code`;

  const navigate = useNavigate();
  const PARAMS = new URL(window.location.href).searchParams;
  const NAVER_CODE = PARAMS.get('code');
  const [accessTokenFetching, setAccessTokenFetching] = useState(false);

  console.log('NAVER_CODE:', NAVER_CODE);

  // Access Token 받아오기
  const getAccessToken = async () => {
    if (accessTokenFetching) return; // Return early if fetching

    console.log('getAccessToken 호출');
    console.log('naver_code', NAVER_CODE);

    try {
      setAccessTokenFetching(true); // Set fetching to true

      const response = await instance.get(
        `/api/v1/members/naver/callback?code=${NAVER_CODE}&state=false`,
      );
      console.log('나 김동준이야', response);
      const accessToken = response.headers.authorization;
      console.log('accessToken:', accessToken);
      saveTokensToLocalStorage(accessToken);
      // localStorage.setItem('accessToken', accessToken);
      setAccessTokenFetching(false); // Reset fetching to false
    } catch (error) {
      console.error('Error:', error);
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
