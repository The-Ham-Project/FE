const client_id = import.meta.env.VITE_APP_KAKAO_CLIENT_ID;
const redirect_uri = import.meta.env.VITE_APP_KAKAO_REDIRECT_URI;
function Login() {
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code`;

  const kakao = async () => {
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
// 401 뜨면 재발급하기
