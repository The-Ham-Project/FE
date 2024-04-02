import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { saveTokensToLocalStorage } from '../../util/localStorage/localStorage';
// // import { postKakaoLogin } from '../../api/auth';

// function Redirect() {
//   const client_id = '86e1404c807c52cb2261fa208ef88d27';
//   // const redirect_uri = 'http://localhost:5173/oauth/kakaologin';
//   const redirect_uri = 'https://api.openmpy.com/api/v1/members/kakao/callback';
//   function Login() {
//     const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code`;
//     //https://kauth.kakao.com/oauth/authorize?client_id=86e1404c807c52cb2261fa208ef88d27&redirect_uri=https://api.openmpy.com/api/v1/members/kakao/callback&response_type=code

//     const kakao = async () => {
//       window.location.href = kakaoURL;
//     };
//     // const location = useLocation();
//     // const navigate = useNavigate();

//     // const getData = async () => {
//     //   try {
//     //     const params = new URLSearchParams(location.search);

//     //     if (params.has('code')) {
//     //       const code = params.get('code');
//     //       const data = await postKakaoLogin(code);

//     //       if (data.data === true) {
//     //         //   dispatch(kakaoLogin()); // Redux 액션 디스패치
//     //         navigate('/');
//     //       }
//     //     }
//     //   } catch (error) {
//     //     console.error('카카오 로그인 오류');
//     //   }
//     // };

//     // useEffect(() => {
//     //   getData();
//     // }, []);

//     return (
//       <>
//         <button onClick={kakao}>까까오 로긴</button>
//       </>
//     );
//   }
// }
// export default Redirect;

// import { useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import { authInstance } from '../../api/auth';
// import styled from 'styled-components';

// function Redirect() {
//   const location = useLocation();
//   const CODE = location.search.split('=')[1];

//   useEffect(() => {
//     if (!location.search) return;
//     sendAuthorizationCode();
//   }, []);

//   const sendAuthorizationCode = () => {
//     authInstance
//       .post(`/kakao`, {
//         code: CODE,
//       })
//       .then((res) => console.log(res));
//   };

//   return <RedirectContainer>Redirect 페이지입니다</RedirectContainer>;
// }

// export default Redirect;

// const RedirectContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   margin-top: 340px;
//   font-weight: 500;
// `;

// // const code = new URL(window.location.href).searchParams.get('code'); // 안가코드만 쏘옥~ 푸헤헤~~~~
// // console.log('code');

// import axios from 'axios';
// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Redirection = () => {
//   const code = window.location.search;
//   const navigate = useNavigate();

//   // useEffect(() => {
//   //   console.log(process.env.VITE_SERVER_URL);
//   //   axios.post(`${process.env.VITE_SERVER_URL}kakaoLogin${code}`).then((r) => {
//   //     console.log(r.data);

//   //     // 토큰을 받아서 localStorage같은 곳에 저장하는 코드를 여기에 쓴다.
//   //     localStorage.setItem('name', r.data.user_name);
//   //     navigate('/');
//   //   });
//   // }, []);

//   return <div>로그인 중입니다.</div>;
// };

// export default Redirection;

// import React, { useEffect, useState } from 'react';
// import { loginKakaoCallback } from '../../api/loginAPI';
// import { useMutation } from '@tanstack/react-query';
// import { useVerifyUser } from 'hooks';
// import { useNavigate } from 'react-router-dom';

// export const KakaoCallbackPage = () => {
//   const navigate = useNavigate();
//   const [shouldVerify, setShouldVerify] = useState(false);
//   const { isSuccess } = useVerifyUser(shouldVerify);
//   const { mutate } = useMutation(loginKakaoCallback, {
//     onSuccess: () => {
//       setShouldVerify(true);
//     },
//   });

//   useEffect(() => {
//     const code = new URL(window.location.href).searchParams.get('code'); // 카카오 인가 코드
//     code && mutate(code);
//   }, []);

//   if (isSuccess) {
//     navigate('/');
//   }

//   return (
//     <div>하...</div>å
//   );
// };

// const fnGetKakaoOauthToken = async () => {
//   const makeFormData = (params: {[key: string]: string}) => {
//     const searchParams = new URLSearchParams()
//     Object.keys(params).forEach(key => {
//       searchParams.append(key, params[key])
//     })

//     return searchParams
//   }

//   try {
//     const res = await axios({
//       method: 'POST',
//       headers: {
//         'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
//       },
//       url: 'https://kauth.kakao.com/oauth/token',
//       data: makeFormData({
//         grant_type: 'authorization_code',
//         client_id: client_id,
//         redirect_uri: redirect_uri,
//         code // 인가 코드
//       })
//     })

// // sessionStorage/localStorage에 결과값 저장
// // state에 kakao accesstoken 저장
//   } catch (err) {
//     console.warn(err)
//   }
// }

const client_id = '86e1404c807c52cb2261fa208ef88d27';
// const redirect_uri = 'http://localhost:5173/oauth/kakaologin';
const redirect_uri = 'http://localhost:5173/kakao/callback';
function Redirect() {
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code`;
  //https://kauth.kakao.com/oauth/authorize?client_id=86e1404c807c52cb2261fa208ef88d27&redirect_uri=https://api.openmpy.com/api/v1/members/kakao/callback&response_type=code

  // const kakao = async () => {
  //   window.location.href = kakaoURL;
  // };

  // const location = useLocation();
  // const navigate = useNavigate();
  // const hyein = useStore((state) => state.login);

  // const getData = async (data) => {
  //   try {
  //     const params = new URLSearchParams(location.search);

  //     if (params.has('code')) {
  //       const code = params.get('code');
  //       const data = await postKakaoLogin(code);

  //       if (data?.data.code === 200) {
  //         // hyein();
  //         navigate('/');
  //       }
  //     }
  //   } catch (error) {
  //     console.error('카카오 로그인 오류');
  //   }

  //   useEffect(() => {
  //     getData(data);
  //   }, []);
  //   // useEffect(() => {
  //   //   const getUser = () => {
  //   //     fetch()
  //   //   }
  //   // }, []);
  // };
  // const code = new URL(window.location.href).searchParams.get('code');
  // console.log('code');
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
        // {
        //   authorization: KAKAO_CODE,
        // },
        // {
        //   headers: {
        //     'Content-Type': 'application/json',
        //     authorization: KAKAO_CODE,
        //   },
        // },
      );
      console.log('나 김동준이야', response);
      // const params = { code: KAKAO_CODE };
      // const params = { userIds: [1, 2] };
      // axios.get('http://api.com', { params });
      const accessToken = response.headers.authorization;
      console.log('accessToken:', accessToken);
      saveTokensToLocalStorage(accessToken);
      setAccessTokenFetching(false); // Reset fetching to false
      navigate('/')
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

export default Redirect;
