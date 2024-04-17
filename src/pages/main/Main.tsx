import { useNavigate } from 'react-router-dom';
import Category from '../../components/Main/Category';
import { IoPersonOutline } from 'react-icons/io5';

import useStore, { useErrorModalStore } from '../../store/store';
import styled from 'styled-components';
import Modal from '../../components/Main/Modal';
// import Details from './Details';
import MainHeder from '../../components/layout/MainHeder';
import Navbar from '../../components/layout/Navbar.tsx';
import lgoo from '../../../public/assets/lgoo.svg';
import { Container } from '../../components/layout/DefaultLayout.tsx';
import Header from '../../components/layout/MainHeder';
import Search from '../../components/Main/Search.tsx';

function Main() {
  // const isLoggedIn = useStore((state) => state.isLoggedIn);
  const navigate = useNavigate();

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
      {/* <Navbar /> */}
      <Modal isOpen={isOpen} message={errorMessage} onClose={closeModal} />
      <img src={lgoo} />
      <IoPersonOutline
        size={'30px'}
        onClick={() => {
          navigate('/mypage');
        }}
      />
      {/*<ButtonContainer onClick={handleButtonClick}>+</ButtonContainer>*/}
<Search/>
      
      <Container>
   
      <Category />
      </Container>
 
    </>
  );
}

export default Main;







export const Flex = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
`;
export const Flex2 = styled.div`
  display: flex;
  justify-content: center;
  padding-left: 870px;


`;

export const Div1 = styled.div`

  height: 100vh;
  display: flex;
  background-color: #6b8ec0;

  background-position: center;

`;
export const Div3 = styled.div`
  width: 10vh;
  height: 100vh;
  background-color: wheat;

`;
export const Div4 = styled.div`
  overflow-y: hidden;
  background-color: #ffffff;

  border-radius: 20px;
  max-height: 100vh;

`;

export const ContentContainer = styled.div`
  flex: 1; /* Flex 컨테이너에서 남은 공간을 모두 차지하도록 설정 */
`;
