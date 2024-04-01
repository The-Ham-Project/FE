// import axios from 'axios';
// const client_id = 'a10dff590e44c0b8a20d68095fbb3dbf';
const client_id = '86e1404c807c52cb2261fa208ef88d27';
// const redirect_uri = 'http://localhost:5173/oauth/kakaologin';
const redirect_uri = 'https://api.openmpy.com/api/v1/members/kakao/callback';
function Login() {
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code`;
  //https://kauth.kakao.com/oauth/authorize?client_id=86e1404c807c52cb2261fa208ef88d27&redirect_uri=https://api.openmpy.com/api/v1/members/kakao/callback&response_type=code

  const kakao = () => {
    window.location.href = kakaoURL;
  };
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