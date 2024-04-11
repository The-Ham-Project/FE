import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { getMyPage } from '../../api/mypage';
import gogo from '../../../public/assets/gogo.svg';
import logout from '../../../public/assets/logout.svg';
import { removeTokensFromLocalStorage } from '../../util/localStorage/localStorage';
import donotcrythehamzzang from '../../../public/assets/donotcrythehamzzang.svg';
import { IoIosArrowBack } from 'react-icons/io';

function Mypage() {
  const navigate = useNavigate();
  const handleBackClick = () => navigate(-1);
  const GotoListHandler = () => {
    navigate('/mylist');
  };

  const LogoutHandler = () => {
    removeTokensFromLocalStorage();
    alert('로그아웃되었습니다');
    navigate('/');
  };
  const { data, isLoading, isError } = useQuery({
    queryKey: ['getMyPage'],
    queryFn: () => getMyPage(),
  });

  if (isLoading) {
    return (
      <Container>
        <Loading></Loading>
      </Container>
    );
  }
  if (isError) {
    return (
      <ErrorPage>
        <img src={donotcrythehamzzang} />
      </ErrorPage>
    );
  }

  return (
    <Wrapper>
      <MenuBox>
        <IoIosArrowBack onClick={handleBackClick} size={'24px'} />
      </MenuBox>
      <PaddingBox>
        <Profile>
          <Picture>
            <img
              src={data?.data.profileUrl}
              style={{
                maxWidth: '130px',
                maxHeight: '130px',
                borderRadius: '50%',
              }}
            />
          </Picture>
          <Nickname>{data?.data.nickname}</Nickname>
        </Profile>
        <Title1>회원정보</Title1>
        <MyInfo>
          <Account>로그인 계정</Account>
          <Email>{data?.data.email}</Email>
        </MyInfo>
        <Title2>나의 활동</Title2>
        <Box1 onClick={GotoListHandler}>
          <GotoMyList>함께 쓴 내역</GotoMyList>
          <img
            src={gogo}
            style={{
              maxWidth: '10px',
              maxHeight: '16px',
            }}
          />
        </Box1>
        <Box2 onClick={LogoutHandler}>
          <Logout>로그아웃</Logout>
          <img
            src={logout}
            style={{
              maxWidth: '10px',
              maxHeight: '16px',
            }}
          />
        </Box2>
      </PaddingBox>
    </Wrapper>
  );
}

export default Mypage;
const Wrapper = styled.div`
  @media screen and (max-width: 430px) {
  }
`;

const MenuBox = styled.div`
  @media screen and (max-width: 430px) {
    display: flex;
    flex-direction: row;
    background-color: #f5f5f5;
    height: 60px;
    width: 100%;
    margin: 0px;
    padding: 0 20px;
    align-items: center;
  }
`;

const PaddingBox = styled.div`
  @media screen and (max-width: 430px) {
    box-shadow: inset 0 5px 5px -5px #333;
    position: absolute;
    width: 100%;
    height: 463px;
    left: 0px;
    top: 60px;
  }
`;

const ErrorPage = styled.div`
  @media screen and (max-width: 430px) {
    /* Group 1394 */

    position: absolute;
    width: 141.1px;
    height: 193.64px;
    left: 125.29px;
    top: 280.25px;
  }
`;

const Profile = styled.div`
  @media screen and (max-width: 430px) {
    width: 100%;
    height: 100%;
  }
`;

const Picture = styled.div`
  @media screen and (max-width: 430px) {
    position: absolute;
    width: 130px;
    height: 130px;
    left: calc(50% - 130px / 2 + 0.34px);
    top: 110px;
    border-radius: 50%;
    /* margin-left: 40px; */
  }
`;

const Nickname = styled.div`
  @media screen and (max-width: 430px) {
    position: absolute;
    width: 140px;
    height: 31px;
    left: calc(50% - 140px / 2 - 2.12px);
    top: 265px;
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 600;
    font-size: 26px;
    line-height: 31px;
    text-align: center;
    color: #000000;
  }
`;

const Title1 = styled.div`
  @media screen and (max-width: 430px) {
    position: absolute;
    width: 70px;
    height: 24px;
    left: 20.83px;
    top: 346px;
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    color: #000000;
  }
`;

const MyInfo = styled.div`
  @media screen and (max-width: 430px) {
    /* Rectangle 106 */
    /* 텍스트바 */

    position: absolute;
    width: 390px;
    height: 40px;
    left: calc(50% - 390px / 2 + 0px);
    top: 395px;
    right: 0.01%;

    /* 텍스트바 */
    background: #f5f5f5;
    border-radius: 6.71835px;
    transform: matrix(1, 0, 0, 1, 0, 0);
  }
`;

const Account = styled.div`
  @media screen and (max-width: 430px) {
    /* 로그인 계정 */

    position: absolute;
    width: 56.1px;
    height: 14.79px;
    left: 28px;
    top: 12.95px;

    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    /* identical to box height */

    color: #000000;
  }
`;
const Email = styled.div`
  @media screen and (max-width: 430px) {
    /* 아이디(이메일) */

    position: absolute;
    width: 74.13px;
    height: 14.79px;
    left: 128.08px;
    top: 12.95px;

    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    /* identical to box height */

    color: #000000;
  }
`;
const Title2 = styled.div`
  @media screen and (max-width: 430px) {
    position: absolute;
    width: 75px;
    height: 24px;
    left: 20.83px;
    top: 484.95px;
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    color: #000000;
  }
`;

const Box1 = styled.button`
  @media screen and (max-width: 430px) {
    position: absolute;
    width: 390px;
    height: 40px;
    left: calc(50% - 390px / 2 + 0px);
    padding-right: calc(50% - 390px / 2 + 0px);
    top: 533.95px;
    right: 0.01%;
    background: #f5f5f5;
    border-radius: 6.71835px;
    transform: matrix(1, 0, 0, 1, 0, 0);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
  }
`;

const GotoMyList = styled.button`
  @media screen and (max-width: 430px) {
    position: absolute;
    width: 90px;
    height: 14.79px;
    left: 18px;
    top: 13.95px;
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: #000000;
    z-index: 1000000000000;
  }
`;

const Box2 = styled.button`
  @media screen and (max-width: 430px) {
    position: absolute;
    width: 390px;
    height: 40px;
    left: calc(50% - 390px / 2 + 0px);
    top: 599px;
    right: 0.01%;
    background: #f5f5f5;
    border-radius: 6.71835px;
    transform: matrix(1, 0, 0, 1, 0, 0);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    padding-right: calc(50% - 390px / 2 + 0px);
  }
`;

const Logout = styled.button`
  @media screen and (max-width: 430px) {
    position: absolute;
    width: 56.1px;
    height: 14.79px;
    left: 28px;
    top: 13.95px;

    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    /* identical to box height */

    color: #000000;
  }
`;
const Container = styled.div`
  @media screen and (max-width: 430px) {
    body {
      background: #f6f8fa;
      display: flex;
      width: 100%;
      height: 100vh;
      justify-content: center;
      align-items: center;
    }
  }
`;
const Loading = styled.div`
  @media screen and (max-width: 430px) {
    width: 80px;
    height: 80px;
    border: 8px solid #8da9db;
    border-top-color: #2f5496;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

//로딩
// body {
//     background: #F6F8FA;
//     display: flex;
//     width: 100%;
//     height: 100vh;
//     justify-content: center;
//     align-items: center;
//   }

//   .loading {
//     width: 80px;
//     height: 80px;
//     border: 8px solid #8da9db;
//     border-top-color: #2f5496;
//     border-radius: 50%;
//     animation: spin 1s linear infinite;
//   }

//   @keyframes spin {
//     to {
//       transform: rotate(360deg);
//     }
//   }

// JSX 부분
{
  /* <div class="loading"></div> */
}
