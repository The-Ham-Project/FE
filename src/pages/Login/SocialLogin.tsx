import NaverLogin from '../../components/NaverLogin/NaverLogin';
import GoogleLogin from '../../components/GoogleLogin/GoogleLogin';
import KakaoLogin from '../../components/KakaoLogin/KakaoLogin';
import styled from 'styled-components';
import theham from '../../../public/assets/theham.svg';
import movingtheham from '../../../public/assets/movingtheham.gif';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import arrow from '/public/assets/arrow.svg';

function SocialLogin() {
  const navigate = useNavigate();
  const handleBackClick = () => navigate(-1);
  return (
    <Wrapper>
      <MenuBox>
        <img
          src={arrow}
          className={'arrow'}
          onClick={handleBackClick}
          style={{ position: 'absolute', left: '20px', cursor: 'pointer' }}
        />
      </MenuBox>
      {/* <Header /> */}
      <Motto>함께 쓰고 나누자</Motto>
      <Logo>
        <img src={theham} />
      </Logo>
      <Charactor>
        <img src={movingtheham} />
      </Charactor>
      <MSG>
        간편하게 로그인하고 <br />
        동네 쉐어서비스 더함을 이용해보세요.
      </MSG>
      <Container>
        <KakaoLogin />
        <NaverLogin />
        <GoogleLogin />
      </Container>
    </Wrapper>
  );
}

export default SocialLogin;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  /* padding: 6vh; */
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  margin: 0;
  gap: 16.97px;
  padding-bottom: 46px;
  @media screen and (max-width: 430px) {
    overflow: scroll;
    gap: 0;
    padding-bottom: 0px;
  }
`;

const MenuBox = styled.div`
  display: flex;
  height: 60px;
  width: 100%;
  align-items: center;
  justify-content: center;
  > span {
    display: flex;
    justify-content: center;
    width: 100%;
    font-size: 14px;
  }
  > .arrow {
    width: 10px;
    height: 16px;
  }
`;

const Motto = styled.div`
  width: 100px;
  height: 17px;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  margin: 0;
  text-align: center;
  padding: 0;
  color: #505050;
  @media screen and (max-width: 430px) {
  }
`;

const Logo = styled.div`
  width: 166px;
  height: 92px;
  margin: 0;
  padding: 0;
  @media screen and (max-width: 430px) {
  }
`;
const Charactor = styled.div`
  margin: 0;
  padding: 0;
  > img {
    width: 271px;
    height: 271px;
    margin: 0;
    padding: 0;
  }
  @media screen and (max-width: 430px) {
  }
`;
const MSG = styled.div`
  width: 287px;
  height: 55px;

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

  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  text-align: center;
  gap: 25px;
  color: #000000;
  margin-right: 10px;
  padding: 0;
  @media screen and (max-width: 430px) {
  }
`;
