import startwithkakao from '../../../public/assets/startwithkakaotalk.svg';
import styled from 'styled-components';
// import Header from '../layout/Header';

const client_id = import.meta.env.VITE_APP_KAKAO_CLIENT_ID;
const redirect_uri = import.meta.env.VITE_APP_KAKAO_REDIRECT_URI;
function KakaoLogin() {
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code`;

  const kakao = async () => {
    window.location.href = kakaoURL;
  };

  return (
    <>
      {/* <Header></Header> */}
      <Button onClick={kakao}>
        <IMG src={startwithkakao} alt="카카오 로그인 버튼" />
      </Button>
    </>
  );
}

export default KakaoLogin;

// token api 서버에서 자동으로 요청해서 응답 보내줄때 브라우저에 쿠키생성하라고 백에서 보낼 예정
// 끝!
// 프론트는 이게 끝?! 와우~
// 401 뜨면 재발급하기

// import styled from 'styled-components';

const Button = styled.button`
background-color: white;
  @media screen and (max-width: 430px) {
    width: 350px;
    height: 45px;
  }
`;

const IMG = styled.img`
  @media screen and (max-width: 430px) {
    position: absolute;
    width: 350px;
    height: 45px;
    left: 20.16px;
    top: 615.06px;
  }
`;
