import { useState } from 'react';
import axios from 'axios';
import { saveTokensToLocalStorage } from '../store/store';

export const instance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true, // Cookies에 브라우저가 자동으로 쿠키를 넣어줌
  headers: {
    'Access-Control-Allow-Origin': `${import.meta.env.VITE_SERVER_URL}`,
  },
});

export const authInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});

authInstance.interceptors.request.use(
  (config) => {
    const authorization = localStorage.getItem('authorization') || '';
    if (authorization) {
      config.headers['authorization'] = `${authorization}`;
    }
    return config;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  },
);

// 카카오 로그인 API
const PARAMS = new URL(window.location.href).searchParams;
const KAKAO_CODE = PARAMS.get('code');
export const getKakaologin = async () => {
  //   const [accessTokenFetching, setAccessTokenFetching] =
  //     useState<boolean>(false);
  //   if (accessTokenFetching) return; // Return early if fetching
  try {
    // setAccessTokenFetching(true); // Set fetching to true
    const response = await axios.get(
      `https://api.openmpy.com/api/v1/members/kakao/callback?code=${KAKAO_CODE}`,
    );
    const accessToken = response.headers.authorization;
    saveTokensToLocalStorage(accessToken);
    // setAccessTokenFetching(false); // Reset fetching to false
  } catch (error) {
    console.error('Error:', error);
    // setAccessTokenFetching(false); // Reset fetching even in case of error
  }
};

// const getData = async () => {
//   try {
//     const params = new URLSearchParams(location.search);

//     if (params.has('code')) {
//       const code = params.get('code');
//       const data = await postKakaoLogin(code);

//       if (data.isSuccess === true) {
//         dispatch(kakaoLogin()); // Redux 액션 디스패치
//         navigate('/');
//         successToast(data.message);
//       }
//     }
//   } catch (error) {
//     console.error('카카오 로그인 오류');
//   }
// };

// useEffect(() => {
//   getData();
//   // eslint-disable-next-line react-hooks/exhaustive-deps
// }, []);
