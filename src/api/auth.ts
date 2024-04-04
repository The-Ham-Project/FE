import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from 'axios';
;

const baseUrl = import.meta.env.VITE_SERVER_URL;

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});










// import axios from 'axios';

// import { setCookie } from '../util/cookies/cookies';

// export const instance = axios.create({
//   baseURL: import.meta.env.VITE_SERVER_URL,
// });

// export const authInstance = axios.create({
//   baseURL: import.meta.env.VITE_SERVER_URL,
//   withCredentials: true, // Cookies에 브라우저가 자동으로 쿠키를 넣어줌
//   headers: {
//     'Access-Control-Allow-Origin': 'https://api.openmpy.com',
//   },
// });

// // export const instance = axios.create({
// //   baseURL: 'https://api.openmpy.com',
//   // withCredentials: true, // Cookies에 브라우저가 자동으로 쿠키를 넣어줌
//   // headers: {
//   //   'Access-Control-Allow-Origin': 'https://api.openmpy.com',
//   // },
// // });

// authInstance.interceptors.request.use(
//   (config) => {
//     const Authorization = localStorage.getItem('Authorization') || '';
//     if (Authorization) {
//       config.headers['Authorization'] = `${Authorization}`;
//     }
//     return config;
//   },
//   (error) => {
//     console.error(error);
//     return Promise.reject(error);
//   },
// );

// export const postKakaoLogin = async (code) => {
//   try {
//     const response = await instance.post(
//       '/api/v1/members/kakao/callback',
//       { code },
//       { headers: { 'Content-Type': 'application/json' } },
//     );

//     if (response.status === 200) {
//       return response.data;
//     }
//   } catch (error) {
//     throw error;
//   }
// };


// import axios, {
//   AxiosInstance,
//   AxiosResponse,
//   AxiosError,
//   AxiosRequestConfig,
//   InternalAxiosRequestConfig,
// } from 'axios';
// import {
//   getNewAccessToken,
//   setClientHeader,
//   resetHeader,
//   tokenHandler,
// } from './loginAPI';
// // import { useRecoilState } from 'recoil';
// // import { UserState, userProfileSelector } from 'recoil/userInfo';

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// interface RetryConfig extends AxiosRequestConfig {
//   _retry: boolean;
// }

// const baseUrl = process.env.REACT_APP_SERVER_API_URL;

// export const axiosInstance: AxiosInstance = axios.create({
//   baseURL: baseUrl,
//   withCredentials: true,
// });

// /** access token 갱신 interceptor */
// axiosInstance.interceptors.response.use(
//   (response: AxiosResponse): AxiosResponse => {
//     // console.log('👀response interceptor 정상적으로 통과!');
//     return response;
//   },
//   async (err) => {
//     const originalRequest: RetryConfig = err.config;
//     // console.log('👀response interceptor err ', err);
//     // console.log('👀response interceptor err msg ', err.response.data.message);
//     // console.log('👀response interceptor config', originalRequest);
//     // console.log( '👀response interceptor config _retry ', originalRequest._retry);
//     if (
//       err.response &&
//       err.response.data.message == '토큰 유효기간 만료.' &&
//       !originalRequest._retry
//     ) {
//       // console.log('👀repsponse interceptor 분기 진입');
//       originalRequest._retry = true;

//       try {
//         const response: AxiosResponse = await getNewAccessToken();

//         // 새로 받은 액세스 토큰 넣어주기
//         const accessToken = response.headers['authorization'].replace(
//           'Bearer%20',
//           ''
//         );
//         tokenHandler(accessToken);
//         setClientHeader(accessToken);
//         // console.log('Got new access token', response.data);

//         return axiosInstance(originalRequest);
//       } catch (e) {
//         // console.log('getNewAccessToken Error', e);
//         resetHeader();
//         if (e instanceof AxiosError) {
//           throw new Error(e.response?.data || e.message);
//         }
//         throw e;
//       }
//     } else if (err.response.data.message === '유효한 토큰이 아닙니다.') {
//       // const [userState, setUserState] = useRecoilState(userProfileSelector);
//       // alert(userState.isLoggedIn);
//       // const newData: UserState = {
//       //   userId: '',
//       //   nickName: '',
//       //   isLoggedIn: false,
//       // };
//       // await setUserState(newData);
//       // window.localStorage.clear();
//       // alert(userState.isLoggedIn);
//       throw err;
//     } else throw err;
//   }
// );

// /** 요청 이전 access token 존재시 넣어주기 */
// axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
//   // console.log('👀request interceptor start');
//   const accessToken = window.localStorage.getItem('access_token');
//   if (accessToken) {
//     // console.log('👀request interceptor accessToken exists');
//     setClientHeader(accessToken);
//   }
//   return config;
// });