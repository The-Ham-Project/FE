import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import styled from 'styled-components';
import { getMyPage } from '../../api/mypage';
import gogo from '../../../public/assets/gogo.svg';
import logoutimage from '../../../public/assets/logoutimage.svg';
import { removeTokensFromLocalStorage } from '../../util/localStorage/localStorage';
import donotcrythehamzzang from '../../../public/assets/donotcrythehamzzang.svg';
import { IoIosArrowBack } from 'react-icons/io';
import Navbar from '../../components/layout/Navbar.tsx';
import NotFound from '../glitch/NotFound.tsx';
import Header from '../../components/layout/Header.tsx'; //. 메인헤더가 아니라 헤더
import { logout } from '../../api/axios.ts';
import useStore from '../../store/store.ts';

function Mypage() {
  const url = 'https://www.kakao.com/policy/location';
  const navigate = useNavigate();
  const useLogout = () => {
    return useMutation({
      mutationFn: logout,
      onSuccess: () => {
        localStorage.removeItem('accessToken');
        useStore.getState().logout();
      },
    });
  };
  const logoutMutation = useLogout();
  const handleBackClick = () => navigate(-1);
  const GotoListHandler = () => {
    navigate('/mylist');
  };

  const LogoutHandler = () => {
    logoutMutation.mutate();
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
        <Loading />
      </Container>
    );
  }
  if (isError) {
    return <NotFound />;
  }

  return (
    <Wrapper>
      <Header text="마이페이지" /> 
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

        <Container>
          <Title1>회원정보</Title1>
          <MyInfo>
            <Account>로그인 계정</Account>
            <Email>{data?.data.email}</Email>
          </MyInfo>
        </Container>

        <Container2>
          <Title2>나의 활동</Title2>
          <Box1 onClick={GotoListHandler}>
            <GotoMyList>함께 쓴 내역</GotoMyList>
            <img
              src={gogo}
              style={{
                maxWidth: '18px',
                maxHeight: '18px',
              }}
            />
          </Box1>
          <Box2
            onClick={() => {
              window.open(url);
            }}
          >
            <Policy>위치정보이용동의 약관</Policy>
            <img
              src={gogo}
              style={{
                maxWidth: '18px',
                maxHeight: '18px',
              }}
            />
          </Box2>
          <Box3 onClick={LogoutHandler}>
            <Logout>로그아웃</Logout>
            <img
              src={logoutimage}
              style={{
                maxWidth: '18px',
                maxHeight: '18px',
              }}
            />
          </Box3>
        </Container2>
      </PaddingBox>
    </Wrapper>
  );
}

export default Mypage;

const Wrapper = styled.div`
overflow: auto;
  background-color: white;
  height: 100%;
  @media screen and (max-width: 700px) {
    overflow: scroll;
  }
`;

export const MenuBox = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 6vh;
  padding: 0 90% 0 7%;
  box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.1);
  background-color: #f5f5f5;
  z-index: 4;
  @media screen and (max-width: 430px) {
    display: flex;
    flex-direction: row;
    background-color: #f5f5f5;
    height: 60px;
    width: 100%;
    margin: 0px;
    padding: 0 20px;
    align-items: center;
    box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.1);
    z-index: 1;
  }
`;

const PaddingBox = styled.div`
  @media screen and (max-width: 430px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    /* box-shadow: inset 0 5px 5px -5px #333; */

    width: 100%;
  }
`;

const Profile = styled.div`
  gap: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 0 15% 0;
  padding-top: 110px;
  @media screen and (max-width: 430px) {
  }
`;

const Picture = styled.div`
  display: flex;
  width: 130px;
  height: 130px;
  border-radius: 50%;
  flex-direction: row;
  align-content: center;
  justify-content: center;
  align-items: center;
  width: 130px;
  height: 130px;

  border-radius: 50%;
  @media screen and (max-width: 430px) {
    /* margin-left: 40px; */
  }
`;

const Nickname = styled.div`
  width: 140px;
  height: 31px;

  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 600;
  font-size: 26px;
  line-height: 31px;
  text-align: center;
  color: #000000;
  @media screen and (max-width: 430px) {
  }
`;

const Title1 = styled.div`
  width: 100px;
  height: 24px;
  margin-left: 8%;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  color: #000000;

  @media screen and (max-width: 430px) {
  }
`;

const MyInfo = styled.div`
  border-radius: 6.71835px;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 40px;
  margin: 0 10%;
  @media screen and (max-width: 430px) {
  }
`;

const Account = styled.div`
  /* 로그인 계정 */
  width: 100px;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  /* identical to box height */

  color: #000000;
  @media screen and (max-width: 430px) {
  }
`;
const Email = styled.div`
  display: flex;
  align-items: center;
  /* 아이디(이메일) */
  width: 100%;
  background: #f5f5f5;
  font-family: 'Pretendard';
  font-style: normal;
  height: 40px;
  font-size: 12px;
  line-height: 14px;
  /* identical to box height */
  margin-left: 20px;
  padding: 0 20px;
  border-radius: 7px;

  color: #000000;
  @media screen and (max-width: 430px) {
  }
`;
const Title2 = styled.div`
  font-size: 20px;
  margin-left: 8%;
  @media screen and (max-width: 430px) {
    margin-left: 8%;
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    color: #000000;
  }
`;

const Box1 = styled.div`
  display: flex;
  background: #f5f5f5;
  height: 40px;
  justify-content: space-between;
  align-items: center;
  margin-right: 10%;
  margin-left: 10%;
  padding-right: 29px;
  padding-left: 29px;
  border-radius: 7px;
  cursor: pointer;
`;

const GotoMyList = styled.div`
  width: 90px;
  height: 14.79px;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #000000;
  z-index: 1000000000000;
  @media screen and (max-width: 430px) {
  }
`;
const Policy = styled.div`
  width: 130px;
  height: 14.79px;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #000000;
  @media screen and (max-width: 430px) {
  }
`;

const Box2 = styled.div`
  display: flex;
  background: #f5f5f5;
  height: 40px;
  justify-content: space-between;
  align-items: center;
  margin-right: 10%;
  margin-left: 10%;
  padding-right: 29px;
  padding-left: 29px;
  border-radius: 7px;
  cursor: pointer;
  @media screen and (max-width: 430px) {
  }
`;
const Box3 = styled.div`
  display: flex;
  background: #f5f5f5;
  height: 40px;
  justify-content: space-between;
  align-items: center;
  margin-right: 10%;
  margin-left: 10%;
  padding-right: 29px;
  padding-left: 29px;
  border-radius: 7px;
  cursor: pointer;
  @media screen and (max-width: 430px) {
  }
`;

const Logout = styled.div`
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #000000;
  cursor: pointer;
  @media screen and (max-width: 430px) {
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  @media screen and (max-width: 430px) {
    display: flex;
    flex-direction: column;
  }
`;
const Container2 = styled.div`
  margin: 50px 0 120px 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 25px;

  @media screen and (max-width: 430px) {
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 25px;
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
//     }
//   }

// JSX 부분
{
  /* <div class="loading"></div> */
}
