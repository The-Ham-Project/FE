import { useNavigate } from 'react-router-dom';
import Category from '../../components/Main/Category';

import useStore, { useErrorModalStore } from '../../store/store';
import styled from 'styled-components';
import Modal from '../../components/Main/Modal';

function Main() {
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  const navigate = useNavigate();

  // useErrorModalStore 훅을 사용하여 모달 관련 상태와 메서드 가져오기
  const { isOpen, errorMessage, openModal, closeModal } = useErrorModalStore();

  const handleButtonClick = () => {
    console.log(isLoggedIn);
    if (isLoggedIn === true) {
      navigate('/main/PostDetailsPage');
    } else {
      // 모달 열기
      openModal('로그인 후에 게시글을 생성할 수 있습니다');
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} message={errorMessage} onClose={closeModal} />

      <ButtonContainer onClick={handleButtonClick}>+</ButtonContainer>

      <Category />
    </>
  );
}

export default Main;

const ButtonContainer = styled.div`
  position: fixed;
  background-color: aqua;
  z-index: 999; /* 다른 요소 위에 표시되도록 설정 */
`;

export const Div = styled.div`
  /* margin: 130px; */
  width: 10%;
  background-color: antiquewhite;
  height: 800px;
  display: flex;
`;

export const Flex = styled.div`
  display: flex;
`;
export const Flex2 = styled.div`
  display: flex;
  justify-content: center;
  background-color: wheat;
`;

export const Div1 = styled.div`
  width: auto;
  width: 800px;
  height: 100vh;
  display: flex;
  background-color: wheat;

  /* 모바일 화면 크기에 맞게 스타일 조정 */
  @media screen and (max-width: 1300px) {
    display: none;
    background-color: #233748;
  }
  @media screen and (max-width: 500px) {
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
  height: 100vh;
  background-color: #ffffff;
  overflow-y: auto;
  @media screen and (max-width: 1300px) {
  }
`;

export const ContentContainer = styled.div`
  flex: 1; /* Flex 컨테이너에서 남은 공간을 모두 차지하도록 설정 */
`;
