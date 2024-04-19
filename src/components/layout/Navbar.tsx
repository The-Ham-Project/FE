import bar from '../../../public/assets/bar.svg';
import styled from 'styled-components';
import { FiPlus } from 'react-icons/fi';
import message from '../../../public/assets/message.svg';
import home from '../../../public/assets/home.svg';
import { Outlet, useNavigate } from 'react-router-dom';
import useStore, { useErrorModalStore } from '../../store/store.ts';

function Navbar() {
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  const navigate = useNavigate();

  const { openModal } = useErrorModalStore();

  const handlePostButtonClick = () => {
    console.log(isLoggedIn);
    if (isLoggedIn === true) {
      console.log('postdetail 호출');
      navigate('/PostDetailsPage');
    } else {
      openModal('로그인 후에 게시글을 생성할 수 있습니다.',);
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
    <>
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
        <img style={{filter: 'drop-shadow(2px 1px 6px rgba(0, 0, 0, 0.13))'}} className="bar" src={bar} />

      </Container>
      <Outlet />
    </>
  );
}

export default Navbar;

const Container = styled.div`
  width: 100%;
  height: 100px;
  position: absolute;
  z-index: 10;
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
    z-index: 10;
    width: 34px;
  }
  .home {
    position: absolute;
    bottom: 21px;
    zindex: 10;
    left: 63px;
    z-index: 103;
    width: 27px;
  }
  > div {
    z-index: 10;
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
