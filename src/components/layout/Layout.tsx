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
        {/*<PhoneBox>*/}
        {/*  <Phone>*/}
        {/*    <Outlet />*/}
        {/*  </Phone>*/}
        {/*</PhoneBox>*/}
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
  width: 1500px;
  height: 800px;
  display: flex;
  min-width: 660px;

  z-index: 300;
`;
const ContentsBox = styled.div`
  //width: 694px;
  width: 50%;
  //flex: 1;
  height: 100%;
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
    font-size: 30px;
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
  width: 50%;
  //width: 750px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  flex-direction: column;
  &:before {
    background-image: url('../../../public/assets/phontheham.svg');
    background-repeat: no-repeat;
    position: absolute;
    content: '';
    bottom: -50px;
    left: -80px;
    width: 370px;
    height: 496px;
    z-index: 200;
  }
  > img {
    z-index: 300;
    width: 400px;
    height: auto;
    position: relative;
  }
`;
//
// const PhoneBox = styled.div`
//   width: 55%;
//   height: 1000%;
//   position: relative;
// `;
//
// const Phone = styled.div`
//   width: 424px;
//   height: 866px;
//   background-image: url('../../../public/assets/phone.svg');
//   background-repeat: no-repeat;
//   position: relative;
//   top: 100px;
//   left: 250px;
//   z-index: 300;
//   &:before {
//     background-image: url('../../../public/assets/phontheham.svg');
//     background-repeat: no-repeat;
//     position: absolute;
//     content: '';
//     bottom: -500px;
//     left: -240px;
//     width: 1000px;
//     height: 1000px;
//     z-index: 20;
//   }
// `;
