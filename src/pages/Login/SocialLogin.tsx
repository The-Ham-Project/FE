import NaverLogin from '../../components/NaverLogin/NaverLogin';
import GoogleLogin from '../../components/GoogleLogin/GoogleLogin';
import KakaoLogin from '../../components/KakaoLogin/KakaoLogin';
import styled from 'styled-components';
import theham from '../../../public/assets/theham.svg';
import charactor from '../../../public/assets/charactor.svg';
// import Header from '../../components/layout/Header';

function SocialLogin() {
  const client_id = import.meta.env.VITE_APP_KAKAO_CLIENT_ID;
  const redirect_uri = import.meta.env.VITE_APP_KAKAO_REDIRECT_URI;
  console.log(client_id);
  console.log(redirect_uri);
  return (
    <Wrapper>
      {/* <Header /> */}
      <Logo>
        <img src={theham} />
      </Logo>
      <Charactor>
        <img src={charactor} />
      </Charactor>
      <MSG>
        간편하게 로그인하고 <br />
        동네 쉐어서비스 더함을 이용해보세요.
      </MSG>
      <Container>
        <KakaoLogin />
        <NaverLogin /> {/* 네이버는 나중에 */}
        <GoogleLogin />
      </Container>
    </Wrapper>
  );
}

export default SocialLogin;

const Wrapper = styled.div`
  padding: 6vh;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 430px) {
  }
`;
const Logo = styled.div`
  width: 166px;
  height: 92px;

  @media screen and (max-width: 430px) {
  }
`;
const Charactor = styled.div`
  width: 144.62px;
  height: 195.27px;
  @media screen and (max-width: 430px) {
  }
`;
const MSG = styled.div`
  width: 287px;
  height: 55px;

  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  text-align: center;

  color: #000000;
  @media screen and (max-width: 430px) {
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  text-align: center;
  gap: 25px;
  color: #000000;
  @media screen and (max-width: 430px) {
  }
`;
