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
    if (isLoggedIn === true) {
      navigate('/main/PostDetailsPage');
    } else {
      // 모달 열기
      openModal('로그인 후에 게시글을 생성할 수 있습니다');
    }
  };

  return (
    <>
      <Flex>
        <Div1>
          <Div>위치 조정하기 위한 박스</Div>
        </Div1>

     
          <Modal isOpen={isOpen} message={errorMessage} onClose={closeModal} />
          <div>
          <ContentContainer>
            <div>
              <ButtonContainer onClick={handleButtonClick}>+</ButtonContainer>
   
              <div>
                <Category />
              </div>
            </div>
            </ContentContainer>
          </div>
     
      </Flex>
    </>
  );
}

export default Main;

const ButtonContainer = styled.button`
  position: fixed;
  background-color: aqua;
  z-index: 999; /* 다른 요소 위에 표시되도록 설정 */
`;

const Div = styled.div`
  width: 100%;
  height: 800px;
  display: flex;
`;

const Flex = styled.div`
  display: flex;
  overflow-y: scroll; /* 세로 스크롤이 가능하도록 설정 */
`;

const Div1 = styled.div`
  width: 120vh;
  height: 100vh;
  display: flex;
  background-color: #3fa2ff;
  /* 모바일 화면 크기에 맞게 스타일 조정 */
  @media screen and (max-width: 768px) {
    display: none;
    background-color: aliceblue;
  }
`;


const ContentContainer = styled.div`
  flex: 1; /* Flex 컨테이너에서 남은 공간을 모두 차지하도록 설정 */
`;
