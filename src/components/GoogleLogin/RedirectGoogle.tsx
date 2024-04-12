// const client_id = import.meta.env.VITE_APP_GOOGLE_CLIENT_ID;
// // const redirect_uri = 'http://localhost:5173/oauth/kakaologin';
// const redirect_uri = import.meta.env.VITE_APP_GOOGLE_REDIRECT_URI;
// function RedirectGoogle() {
//   const googleURL = `https://accounts.google.com/o/oauth2/auth?client_id=${client_id}&scope=email&redirect_uri=${redirect_uri}&response_type=code`;
//   //https://accounts.google.com/o/oauth2/auth?client_id=410095691528-h2c6l3kv771u82sh50uv7gmi66cjaov8.apps.googleusercontent.com&scope=email&redirect_uri=https://api.openmpy.com/api/v1/members/google/callback&response_type=code

//   const google = () => {
//     window.location.href = googleURL;
//   };
//   return (
//     <>
//       <button onClick={google}>꾸글 로긴</button>
//     </>
//   );
// }

// export default RedirectGoogle;

//https://accounts.google.com/o/oauth2/auth?client_id=410095691528-h2c6l3kv771u82sh50uv7gmi66cjaov8.apps.googleusercontent.com&scope=email&redirect_uri=http://localhost:5173/google/callback&response_type=code'

// &scope=email+openid+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&authuser=0&prompt=none

//https://api.openmpy.com/api/v1/members/google/callback?code={code}&scope=email+openid+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&authuser=0&prompt=none

// 김수환무거북이와두루미
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveTokensToLocalStorage } from '../../util/localStorage/localStorage';
import { instance } from '../../api/axios';

// const client_id = import.meta.env.VITE_APP_KAKAO_CLIENT_ID;
// const redirect_uri = import.meta.env.VITE_APP_KAKAO_REDIRECT_URI;

function RedirectGoogle() {
  // const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code`;

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

  return (
    <>
      <button>구글 로긴 꼴백</button>
    </>
  );
}

export default RedirectGoogle;
