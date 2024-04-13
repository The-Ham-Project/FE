import { useNavigate } from 'react-router-dom';
import Category from '../../components/Main/Category';

import useStore, { useErrorModalStore } from '../../store/store';
import styled from 'styled-components';
import Modal from '../../components/Main/Modal';
// import Details from './Details';
import MainHeder from '../../components/layout/MainHeder';
import Navbar from '../../components/layout/Navbar.tsx';

function Main() {
  // const isLoggedIn = useStore((state) => state.isLoggedIn);
  // const navigate = useNavigate();

  // useErrorModalStore 훅을 사용하여 모달 관련 상태와 메서드 가져오기
  const { isOpen, errorMessage, openModal, closeModal } = useErrorModalStore();

  // const handleButtonClick = () => {
  //   console.log(isLoggedIn);
  //   if (isLoggedIn === true) {
  //     navigate('/main/PostDetailsPage');
  //   } else {
  //     // 모달 열기
  //     openModal('로그인 후에 게시글을 생성할 수 있습니다');
  //     navigate('/sociallogin');
  //   }
  // };

  return (
    <>
      <Modal isOpen={isOpen} message={errorMessage} onClose={closeModal} />

      {/*<ButtonContainer onClick={handleButtonClick}>+</ButtonContainer>*/}

      <MainHeder />
      <Navbar />
      <Category />
    </>
  );
}

export default Main;

// const ButtonContainer = styled.div`
//   position: fixed;
//   width: 50px;
//   height: 40px;
//   background-color: aqua;
// `;

export const Div = styled.div`
  /* margin: 130px; */
  width: 10%;
  background-color: antiquewhite;
  height: 800px;
  display: flex;
`;

export const Flex = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
`;
export const Flex2 = styled.div`
  display: flex;
  justify-content: center;
  padding-left: 870px;

  @media screen and (max-width: 1000px) {
    padding-left: 220px;
    justify-content: flex-end;
  }

  @media screen and (max-width: 500px) {
    padding-left: 0px;
    justify-content: center;
    background-color: #1689f3;
  }
`;

export const Div1 = styled.div`
  width: auto;
  width: 50vw;
  height: 100vh;
  display: flex;
  background-color: #6b8ec0;

  background-position: center;
  /* 모바일 화면 크기에 맞게 스타일 조정 */
  @media screen and (max-width: 1000px) {
    width: 200px;
    background-color: #6b8ec0;
  }
  @media screen and (max-width: 500px) {
    display: none;
    background-color: #631818;
  }
`;
export const Div3 = styled.div`
  width: 10vh;
  height: 100vh;
  background-color: wheat;
  @media screen and (max-width: 600px) {
    max-width: 0px;
    display: none;
    background-color: aliceblue;
  }
`;
export const Div4 = styled.div`
  width: 430px;
  overflow-y: hidden;
  background-color: #ffffff;

  border-radius: 20px;
  max-height: 100vh;
  @media screen and (max-width: 600px) {
    margin-right: -190%;
  }
  @media screen and (max-width: 500px) {
    margin-right: 0px;
  }
`;

export const ContentContainer = styled.div`
  flex: 1; /* Flex 컨테이너에서 남은 공간을 모두 차지하도록 설정 */
`;
