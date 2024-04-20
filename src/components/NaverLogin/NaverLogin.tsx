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
  width: 350px;
  height: 45px;
  @media screen and (max-width: 430px) {
  }
`;

const IMG = styled.img`
  width: 350px;
  height: 44px;
  @media screen and (max-width: 430px) {
  }
`;
