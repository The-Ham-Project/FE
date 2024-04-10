import { useNavigate } from 'react-router-dom';
import Category from '../../components/Main/Category';
import Contents from '../../components/Main/Contents';
import useStore, { useErrorModalStore } from '../../store/store';
import styled from 'styled-components';
import Modal from '../../components/Main/Modal';

function Main() {
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  const navigate = useNavigate();

  // useErrorModalStore 훅을 사용하여 모달 관련 상태와 메서드 가져오기
  const { isOpen, errorMessage, openModal,closeModal } = useErrorModalStore();

  const handleButtonClick = () => {
    if (isLoggedIn) {
      navigate('/main/PostDetailsPage');
    } else {
      // 모달 열기
      openModal('로그인 후에 게시글을 생성할 수 있습니다');

    }
  };

  return (
    <>
      <Modal isOpen={isOpen} message={errorMessage} onClose={closeModal} />
      <div>
        <div>
          <div>
            {/* <Search /> */}
            <ButtonContainer onClick={handleButtonClick}>+</ButtonContainer>
            <Contents />
            <div>
              <Category />
            </div>
        
            

          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
const ButtonContainer = styled.button`
  position: fixed;
  background-color: aqua;
  z-index: 999; /* 다른 요소 위에 표시되도록 설정 */
`;
