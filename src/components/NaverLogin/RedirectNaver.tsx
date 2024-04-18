// 리다이렉트 화면
// import { useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import styled from "styled-components";

// const RedirectURI = (props) => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     // 백엔드로 코드값을 넘겨주는 로직
//     // 요청 성공 코드값
//     let code = new URL(window.location.href).searchParams.get("code");
//     console.log(code);

//     // 요청이 성공하면 navigate('/main')
//   });

//   return (
//     <Wrap>
//       {/* 로그인중이라는 것을 표시할 수 있는 로딩중 화면 */}
//     </Wrap>
//   );
// };

// const Wrap = styled.div`
//   margin-top: 200px;
//   min-height: 1100px;
// `;

// export default RedirectURI;

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveTokensToLocalStorage } from '../../util/localStorage/localStorage';
import { instance } from '../../api/axios';
import NotFound from '../../pages/NotFound/NotFound';

// const client_id = import.meta.env.VITE_APP_KAKAO_CLIENT_ID;
// const redirect_uri = import.meta.env.VITE_APP_KAKAO_REDIRECT_URI;

function RedirectNaver() {
  // const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code`;

  const navigate = useNavigate();
  const PARAMS = new URL(window.location.href).searchParams;
  const NAVER_CODE = PARAMS.get('code');
  const [accessTokenFetching, setAccessTokenFetching] = useState(false);

  console.log('NAVER_CODE:', NAVER_CODE);

  // // 컴포넌트가 마운트되면 로그인 로직 실행
  // useEffect(() => {
  //   async function NaverLogin() {
  //     // setAccessTokenFetching(true); // Set fetching to true
  //     const response = await axios.get(
  //       `https://api.openmpy.com/api/v1/members/naver/callback?code=${NAVER_CODE}&state=false`,
  //     );
  //     const accessToken = response.headers.authorization;
  //     console.log('accessToken:', accessToken);
  //     saveTokensToLocalStorage(accessToken);
  //     // localStorage.setItem('accessToken', accessToken);
  //     // setAccessTokenFetching(false); // Reset fetching to false
  //   }
  //   NaverLogin();
  //   navigate('/thxkakaomap'); // 로그인 완료시 메인으로 이동
  // }, []);

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
