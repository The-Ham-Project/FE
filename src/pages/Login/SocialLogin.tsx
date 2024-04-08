import NaverLogin from '../../components/NaverLogin/NaverLogin';
import GoogleLogin from '../../components/GoogleLogin/GoogleLogin';
import KakaoLogin from '../../components/KakaoLogin/KakaoLogin';
import styled from 'styled-components';
import theham from '../../../public/assets/theham.svg';
import charactor from '../../../public/assets/charactor.svg';
import Header from '../../components/layout/Header';

function SocialLogin() {
  return (
    <>
      <Header />
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
      <KakaoLogin />
      <NaverLogin /> {/* 네이버는 나중에 */}
      <GoogleLogin />
    </>
  );
}

export default SocialLogin;

const Logo = styled.div`
  @media screen and (max-width: 430px) {
    position: absolute;
    width: 166px;
    height: 92px;
    left: calc(50% - 166px / 2);
    top: 123px;
  }
`;
const Charactor = styled.div`
  @media screen and (max-width: 430px) {
    position: absolute;
    width: 144.62px;
    height: 195.27px;
    left: calc(50% - 144.62px / 2 + 2.31px);
    top: calc(50% - 195.27px / 2 - 70.36px);
  }
`;
const MSG = styled.div`
  @media screen and (max-width: 430px) {
    position: absolute;
    width: 287px;
    height: 55px;
    left: calc(50% - 267px / 2 + 0px);
    top: calc(50% - 55px / 2 + 109.05px);

    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 22px;
    text-align: center;

    color: #000000;
  }
`;
