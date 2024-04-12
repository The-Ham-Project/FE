// VITE_APP_KAKAO_REST_API_KEY="1df8e00ba19cbaf3ed39000226e2e4c8"
// VITE_APP_KAKAO_CLIENT_ID="86e1404c807c52cb2261fa208ef88d27"
// VITE_APP_KAKAO_JAVASCRIPT_KEY="a10dff590e44c0b8a20d68095fbb3dbf"
// VITE_APP_KAKAO_REDIRECT_URI="http://localhost:5173/kakao/callback"

// VITE_APP_GOOGLE_CLIENT_ID="410095691528-h2c6l3kv771u82sh50uv7gmi66cjaov8.apps.googleusercontent.com"
// VITE_APP_GOOGLE_REDIRECT_URI="http://localhost:5173/google/callback"

// VITE_APP_NAVER_CLIENT_ID="FDNapTSIjIsNa0YGULsx"
// VITE_APP_NAVER_REDIRECT_URI="http://localhost:5173/naver/callback"

// # VITE_SERVER_URL="http://localhost:5173/"
// VITE_SERVER_URL="https://api.openmpy.com"

import startwithnaver from '../../../public/assets/startwithnaver.svg';
import styled from 'styled-components';

const client_id = import.meta.env.VITE_APP_NAVER_CLIENT_ID;
const redirect_uri = import.meta.env.VITE_APP_NAVER_REDIRECT_URI;

function NaverLogin() {
  const naverURL = `https://nid.naver.com/oauth2.0/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&state=false`;

  const naver = async () => {
    window.location.href = naverURL;
  };

  return (
    <>
      {/* <Header></Header> */}
      <Button onClick={naver}>
        <IMG src={startwithnaver} alt="네이버 로그인 버튼" />
      </Button>
    </>
  );
}

export default NaverLogin;

const Button = styled.button`
  background-color: white;
  @media screen and (max-width: 430px) {
    width: 350px;
    height: 45px;
  }
`;

const IMG = styled.img`
  width: 350px;
  height: 44px;
  @media screen and (max-width: 430px) {
  }
`;
