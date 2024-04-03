// import axios from 'axios';
// import { useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { postKakaoLogin } from '../../api/auth';
// import useStore from '../../store/store';

// const client_id = 'a10dff590e44c0b8a20d68095fbb3dbf';
const client_id = import.meta.env.VITE_APP_KAKAO_CLIENT_ID;
// const redirect_uri = 'http://localhost:5173/oauth/kakaologin';
const redirect_uri = import.meta.env.VITE_APP_KAKAO_REDIRECT_URI;
function Login() {
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code`;
  //https://kauth.kakao.com/oauth/authorize?client_id=86e1404c807c52cb2261fa208ef88d27&redirect_uri=https://api.openmpy.com/api/v1/members/kakao/callback&response_type=code

  const kakao = async () => {
    window.location.href = kakaoURL;
  };

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

  return (
    <>
      <button onClick={kakao}>까까오 로긴</button>
    </>
  );
}

export default Login;

// token api 서버에서 자동으로 요청해서 응답 보내줄때 브라우저에 쿠키생성하라고 백에서 보낼 예정
// 끝!
// 프론트는 이게 끝?! 와우~
// 401 뜨면 재발급하기


// import axios from 'axios';
// import { useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { postKakaoLogin } from '../../api/auth';
// import useStore from '../../store/store';

// const client_id = '86e1404c807c52cb2261fa208ef88d27';
// const redirect_uri = 'https://api.openmpy.com/api/v1/members/kakao/callback';

// function Login() {
//   const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code`;

//   const kakao = async () => {
//     window.location.href = kakaoURL;
//   };

//   const location = useLocation();
//   const navigate = useNavigate();
//   const hyein = useStore((state) => state.login);

//   const saveAccessTokenToLocalStorage = (token) => {
//     localStorage.setItem('accessToken', token);
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const params = new URLSearchParams(location.search);

//         if (params.has('code')) {
//           const code = params.get('code');
//           const response = await postKakaoLogin(code);
//           const { access_token } = response.data;

//           if (access_token) {
//             saveAccessTokenToLocalStorage(access_token);
//             navigate('/');
//           }
//         }
//       } catch (error) {
//         console.error('카카오 로그인 오류:', error);
//       }
//     };

//     fetchData();
//   }, [location, navigate]);

//   return (
//     <>
//       <button onClick={kakao}>카카오 로그인</button>
//     </>
//   );
// }

// export default Login;

