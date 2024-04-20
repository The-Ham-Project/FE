import styled from 'styled-components';
import thehamlogo from '../../../public/assets/thehamlogo.svg';
import phone from '../../../public/assets/phone.svg';
import { Outlet } from 'react-router-dom';
import phontheham from '../../../public/assets/phontheham.svg';
import bubble from '/public/assets/bubble.svg';

function Layout() {
  return (
    <Container>
      <Explanation>
        <ContentsBox>
          <Title>
            <span>함께 쓰고 나누자</span>
            <img src={thehamlogo} />
          </Title>
          <Contents>
            <span>함께 쓰고 나누어 경제적 부담을 줄이고</span>
            <span>
              사람들 간의 소통과 마음의 따뜻함을 증진시키는 동네 쉐어 플랫폼
            </span>
          </Contents>
          <Bubble>
            <div>더함에서 필요한 물건을 함께 쓰고 나눠봐요!</div>
          </Bubble>
        </ContentsBox>
        <PhoneBox>
          <Phone>
            <img
              src={phone}
              style={{
                position: 'absolute',
                pointerEvents: 'none',
                zIndex: '999990',
              }}
            />
            <div className={'outlet'}>
              <Outlet />
            </div>
          </Phone>
        </PhoneBox>
      </Explanation>
    </Container>
  );
}

export default Layout;

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #1689f3;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &:before {
    content: '';
    position: absolute;
    bottom: 0;
    background-color: #39a0ff;
    height: 31%;
    width: 100%;
    z-index: 10;
  }
`;
const Explanation = styled.div`
  width: 1340px;
  height: 820px;
  display: flex;

  z-index: 300;
  @media screen and (max-width: 700px) {
    height: 100%;
  }
`;
const ContentsBox = styled.div`
  //width: 750px;
  //width: 50%;
  flex: 1;
  height: 100%;
  @media (max-width: 700px) {
    display: none;
  }
`;

const Title = styled.div`
  margin-bottom: 38px;
  display: flex;
  flex-direction: column;
  > span {
    color: #fff;
    font-size: 37px;
    margin-bottom: 19px;
  }
  > img {
    width: 320px;
    height: auto;
  }
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 86px;
  > span {
    margin-top: 20px;
    font-size: 25px;
    color: #fff;
  }
`;

const Bubble = styled.div`
  display: flex;
  align-items: center;

  > div {
    width: 680px;
    height: 178px;
    padding: 78px 82px;
    background-color: #fff;
    border-radius: 166px;
    color: #1689f3;
    font-size: 28px;
    font-weight: 500;
    position: relative;

    &:before {
      content: '';
      background-image: url(${bubble});
      position: absolute;
      bottom: 0;
      right: -30px;
      height: 78px;
      width: 60px;
      z-index: 200;
      background-repeat: no-repeat;
    }
  }
`;
const PhoneBox = styled.div`
  position: relative;
  width: 390px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  &:before {
    background-image: url(${phontheham});
    background-repeat: no-repeat;
    position: absolute;
    content: '';
    bottom: -38px;
    right: calc(100% - 120px);
    width: 380px;
    height: 496px;
    z-index: 10000;
    @media (max-width: 700px) {
      display: none;
    }
  }

  @media (max-width: 700px) {
    width: 100%;
  }
`;

const Phone = styled.div`
  width: 390px;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  overflow: hidden;
  z-index: 10000;
  border-radius: 60px 55px 52px 54px;

  > img {
    z-index: 300;
    width: calc(100% + 13px);
    height: auto;
    position: relative;
  }
  .outlet {
    height: 100%;
    width: calc(97% - 8px);
  }

  @media (max-width: 700px) {
    width: 100%;
    > img {
      display: none;
    }
    .outlet {
      width: 100%;
      height: 100%;
      padding: 0;
    }
    border-radius: unset;
  }
`;
