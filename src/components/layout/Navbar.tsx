import bar from '../../../public/assets/bar.svg';
import styled from 'styled-components';
import { FiPlus } from 'react-icons/fi';
import message from '../../../public/assets/message.svg';
import home from '../../../public/assets/home.svg';
import { useNavigate } from 'react-router-dom';
import useStore, { useErrorModalStore } from '../../store/store.ts';

function Navbar() {
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  const navigate = useNavigate();

  // useErrorModalStore 훅을 사용하여 모달 관련 상태와 메서드 가져오기
  const { openModal } = useErrorModalStore();

  const handlePostButtonClick = () => {
    console.log(isLoggedIn);
    if (isLoggedIn === true) {
      navigate('/main/PostDetailsPage');
    } else {
      // 모달 열기
      openModal('로그인 후에 게시글을 생성할 수 있습니다.');
    }
  };

  const handleChatButtonClick = () => {
    console.log(isLoggedIn);
    if (isLoggedIn === true) {
      navigate('/commlist');
    } else {
      openModal('로그인 후 이용하실 수 있습니다.');
    }
  };

  return (
    <Container>
      <img
        className={'home'}
        src={home}
        onClick={() => {
          navigate('/');
        }}
      />
      <img
        className={'message'}
        src={message}
        onClick={handleChatButtonClick}
      />
      <div onClick={handlePostButtonClick}>
        <FiPlus fontSize={'40px'} />
      </div>
      <img className={'bar'} src={bar} />
    </Container>
  );
}

export default Navbar;

const Container = styled.div`
  width: 100%;
  height: 100px;
  position: absolute;
  z-index: 1000;
  bottom: 0;
  > .bar {
    width: 100%;
    margin: 0;
    position: absolute;
    bottom: 0;
    //box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  > .message {
    position: absolute;
    right: 63px;
    bottom: 21px;
    z-index: 102;
    width: 34px;
  }
  .home {
    position: absolute;
    bottom: 21px;
    zindex: 100;
    left: 63px;
    z-index: 103;
    width: 27px;
  }
  > div {
    z-index: 100;
    background-color: #1689f3;
    color: #fff;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    bottom: 43px;
    left: calc(50% - 27px);
    height: 54px;
    width: 54px;
    border-radius: 100%;
  }
`;
