import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveTokensToLocalStorage } from '../../util/localStorage/localStorage';
import { instance } from '../../api/axios';
import NotFound from '../../pages/glitch/NotFound';

function RedirectGoogle() {
  const navigate = useNavigate();
  const PARAMS = new URL(window.location.href).searchParams;
  const GOOGLE_CODE = PARAMS.get('code');
  const [accessTokenFetching, setAccessTokenFetching] = useState(false);

  console.log('GOOGLE_CODE:', GOOGLE_CODE);

  // Access Token 받아오기
  const getAccessToken = async () => {
    if (accessTokenFetching) return; // Return early if fetching

    console.log('getAccessToken 호출');
    console.log('google_code', GOOGLE_CODE);

    try {
      setAccessTokenFetching(true); // Set fetching to true

      const response = await instance.get(
        `/api/v1/members/google/callback?code=${GOOGLE_CODE}&scope=email+https://www.googleapis.com/Fauth/Fuserinfo.email+openid&authuser=0&prompt=none`,
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
    if (GOOGLE_CODE) {
      getAccessToken();
    }
  }, [GOOGLE_CODE]);

  return <NotFound />;
}

export default RedirectGoogle;
