import { useState, useCallback } from 'react';
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
import Loading from '../glitch/Loading.tsx';

function Mypage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['getMyPage'],
    queryFn: () => getMyPage(),
  });

  const navigate = useNavigate();
  const url = 'https://www.kakao.com/policy/location';
  // //닉네임수정
  // const handleChangeNicknameClick = () => {
  //   setShowNicknameInput(true);
  // };

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

  const GotoListHandler = () => {
    navigate('/mylist');
  };

  const LogoutHandler = () => {
    logoutMutation.mutate();
    alert('로그아웃되었습니다');
    navigate('/');
  };

  if (isLoading) {
    return <Loading />;
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
                width: '130px',
                height: '130px',
                borderRadius: '50%',
                objectFit: 'cover',
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
          <Box
            onClick={() => {
              navigate('/userinfo');
            }}
          >
            <GotoMyList>프로필 및 위치 수정</GotoMyList>
            <img
              src={gogo}
              style={{
                maxWidth: '18px',
                maxHeight: '18px',
              }}
            />
          </Box>
          <Box onClick={GotoListHandler}>
            <GotoMyList>함께 쓴 내역</GotoMyList>
            <img
              src={gogo}
              style={{
                maxWidth: '18px',
                maxHeight: '18px',
              }}
            />
          </Box>
          {/* <Box
            onClick={() => {
              navigate('/thxkakaomap');
            }}
          >
            <Policy>내 위치 새로 설정하기</Policy>
            <img
              src={gogo}
              style={{
                maxWidth: '18px',
                maxHeight: '18px',
              }}
            />
          </Box> */}
          {/* <Box
            onClick={() => {
              window.open(url);
            }}
          >
            <Policy>더함 서비스 약관</Policy>
            <img
              src={gogo}
              style={{
                maxWidth: '18px',
                maxHeight: '18px',
              }}
            />
          </Box> */}
          <Box
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
          </Box>
          <Box onClick={LogoutHandler}>
            <Logout>로그아웃</Logout>
            <img
              src={logoutimage}
              style={{
                maxWidth: '18px',
                maxHeight: '18px',
              }}
            />
          </Box>
        </Container2>
      </PaddingBox>
    </Wrapper>
  );
}

export default Mypage;

const LoadingWrapper = styled.div`
  overflow: auto;
  background-color: white;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 700px) {
    overflow: scroll;
  }
`;

const Wrapper = styled.div`
  overflow: scroll;
  background-color: white;
  height: 100%;
  @media screen and (max-width: 700px) {
    overflow: scroll;
  }
  /* 스크롤바 스타일 */
  &::-webkit-scrollbar {
    width: 8px;
    display: none;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background: rgba(0, 0, 0, 0);
  }

  &::-webkit-scrollbar-track {
    /* 스크롤바 트랙 스타일링 */
  }
  &:hover {
    &::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.2);
    }
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

const Box = styled.div`
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
  width: 110px;
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
// const Loading = styled.div`
//   width: 80px;
//   height: 80px;
//   border: 8px solid #8da9db;
//   border-top-color: #2f5496;
//   border-radius: 50%;
//   animation: spin 1s linear infinite;
//   @media screen and (max-width: 430px) {
//   }
//   @keyframes spin {
//     to {
//     }
//   }
// `;

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
