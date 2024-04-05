import NaverLogin from '../../components/NaverLogin/NaverLogin';
import GoogleLogin from '../../components/GoogleLogin/GoogleLogin';
import KakaoLogin from '../../components/KakaoLogin/KakaoLogin';
import styled from 'styled-components';

function SocialLogin() {
  return (
    <>
      <KakaoContainer>
        <KakaoLogin />
      </KakaoContainer>
      <NaverContainer>
        <NaverLogin /> {/* 네이버는 나중에 */}
      </NaverContainer>
      <GoogleContainer>
        <GoogleLogin />
      </GoogleContainer>
    </>
  );
}

export default SocialLogin;

const KakaoContainer = styled.div`
  margin: 10px 50px;
`;
const NaverContainer = styled.div`
  margin: 10px 50px;
`;
const GoogleContainer = styled.div`
  margin: 10px 50px;
`;
