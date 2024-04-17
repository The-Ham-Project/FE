import styled from 'styled-components';
import thehamlogo from '../../../public/assets/thehamlogo.svg';
import phone from '../../../public/assets/phone.svg';
import { Outlet } from 'react-router-dom';

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
          <img src={phone} />
          <Outlet />
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
  width: 1760px;
  height: 1022px;
  display: flex;

  z-index: 300;
`;
const ContentsBox = styled.div`
  width: 45%;
  height: 100%;
`;

const Title = styled.div`
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
  > span {
    color: #fff;
    font-size: 42px;
    margin-bottom: 19px;
  }
  > img {
    width: 350px;
    height: auto;
  }
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 86px;
  > span {
    margin-top: 20px;
    font-size: 29px;
    color: #fff;
  }
`;

const Bubble = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40%;

  > div {
    width: 790px;
    height: 200px;
    padding: 85px 82px;
    background-color: #fff;
    border-radius: 166px;
    color: #1689f3;
    font-size: 35px;
    font-weight: 500;
    position: relative;

    &:before {
      content: '';
      background-image: url('../../../public/assets/bubble.svg');
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
  width: 55%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  &:before {
    background-image: url('../../../public/assets/phontheham.svg');
    background-repeat: no-repeat;
    position: absolute;
    content: '';
    bottom: -500px;
    left: -30px;
    width: 1000px;
    height: 1000px;
    z-index: 200;
  }
  > img {
    z-index: 300;
    width: 500px;
    height: auto;
    position: relative;
  }
`;
