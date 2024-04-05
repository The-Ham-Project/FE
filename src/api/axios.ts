// import { useState } from 'react';
// import axios from 'axios';
// export const instance = axios.create({
//   baseURL: import.meta.env.VITE_SERVER_URL,
//   withCredentials: true, // Cookies에 브라우저가 자동으로 쿠키를 넣어줌
//   headers: {
//     'Access-Control-Allow-Origin': `${import.meta.env.VITE_SERVER_URL}`,
//   },
// });

// export const authInstance = axios.create({
//   baseURL: import.meta.env.VITE_SERVER_URL,
// });

// authInstance.interceptors.request.use(
//   (config) => {
//     const authorization = localStorage.getItem('authorization') || '';
//     if (authorization) {
//       config.headers['authorization'] = `${authorization}`;
//     }
//     return config;
//   },
//   (error) => {
//     console.error(error);
//     return Promise.reject(error);
//   },
// );

// // 카카오 로그인 API
// const PARAMS = new URL(window.location.href).searchParams;
// const KAKAO_CODE = PARAMS.get('code');
// export const getKakaologin = async () => {
//   //   const [accessTokenFetching, setAccessTokenFetching] =
//   //     useState<boolean>(false);
//   //   if (accessTokenFetching) return; // Return early if fetching
//   try {
//     // setAccessTokenFetching(true); // Set fetching to true
//     const response = await axios.get(
//       `https://api.openmpy.com/api/v1/members/kakao/callback?code=${KAKAO_CODE}`,
//     );
//     const accessToken = response.headers.authorization;
//     saveTokensToLocalStorage(accessToken);
//     // setAccessTokenFetching(false); // Reset fetching to false
//   } catch (error) {
//     console.error('Error:', error);
//     // setAccessTokenFetching(false); // Reset fetching even in case of error
//   }
// };

// // const getData = async () => {
// //   try {
// //     const params = new URLSearchParams(location.search);

// //     if (params.has('code')) {
// //       const code = params.get('code');
// //       const data = await postKakaoLogin(code);

// //       if (data.isSuccess === true) {
// //         dispatch(kakaoLogin()); // Redux 액션 디스패치
// //         navigate('/');
// //         successToast(data.message);
// //       }
// //     }
// //   } catch (error) {
// //     console.error('카카오 로그인 오류');
// //   }
// // };

// // useEffect(() => {
// //   getData();
// //   // eslint-disable-next-line react-hooks/exhaustive-deps
// // }, []);

import axios from 'axios';
// import { saveRefreshTokenToLocalStorage } from '../util/localStorage/localStorage';

export const instance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});

export const authInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});


authInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken') || '';

    console.log("아무글",accessToken)
    if (accessToken) {
      config.headers['Authorization'] = `${accessToken}`;
      console.log("다른글",accessToken)
    }
    return config;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  },
);

authInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          // 리프레시 토큰이 없는 경우 로그인 페이지로 리다이렉트 또는 다른 처리를 수행합니다.
          return Promise.reject('Refresh token not found');
        }

        // 리프레시 토큰을 사용하여 새로운 액세스 토큰을 가져옵니다.
        const response = await axios.post('your-refresh-token-endpoint', {
          refreshToken: refreshToken
        });

        // 새로운 액세스 토큰을 로컬 스토리지에 저장합니다.
        // saveRefreshTokenToLocalStorage(response.data.accessToken);

        // 원래 요청을 재시도합니다.
        return authInstance(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

