import Clickchat from '/public/assets/Clickchat.svg';
import Clickhome from '/public/assets/Clickhome.svg';
import bar from '/public/assets/bar.svg';
import styled from 'styled-components';
import { FiPlus } from 'react-icons/fi';
import message from '/public/assets/message.svg';
import home from '/public/assets/home.svg';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import useStore, { useErrorModalStore } from '../../store/store.ts';
import { useEffect, useState } from 'react';
import Modal from '../modal/Modal.tsx';

function Navbar() {
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  const [isLoggedIn1, setLoggedIn1] = useState(
    localStorage.getItem('isLoggedIn') === 'true',
  );
  const navigate = useNavigate();

  const { isOpen, errorMessage, openModal, closeModal } = useErrorModalStore();

  const location = useLocation();

  // 현재 위치가 message 페이지인지 확인
  const isMessagePage = location.pathname === '/commlist';

  const handlePostButtonClick = () => {
    if (localStorage.getItem('accessToken')) {
      navigate('/postdetailspage');
    } else if (localStorage.getItem('accessToken') === null || undefined) {
      openModal('로그인 후에 게시글을 생성할 수 있습니다.');
    }
  };

  const handleChatButtonClick = () => {
    if (localStorage.getItem('accessToken')) {
      navigate('/commlist');
    } else if (localStorage.getItem('accessToken') === null || undefined) {
      openModal('로그인 후 이용하실 수 있습니다.');
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        message={errorMessage}
        onClose={closeModal}
        rentalId={0}
      />
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
          src={isMessagePage ? Clickchat : message} // message 페이지면 Clickchat, 아니면 message.svg
          onClick={handleChatButtonClick}
        />
        <Div onClick={handlePostButtonClick}>
          <FiPlus fontSize={'40px'} />
        </Div>
        <img
          style={{
            filter: 'drop-shadow(2px 1px 6px rgba(0, 0, 0, 0.13))',
            objectFit: 'cover',
            height: '80%',
          }}
          className="bar"
          src={bar}
        />
      </Container>
      <Outlet />
    </>
  );
}

export default Navbar;

const Div = styled.div``;

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
    bottom: 31px;
    z-index: 10;
    width: 34px;
  }
  .home {
    position: absolute;
    bottom: 31px;
    z-index: 10;
    left: 63px;
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

    filter: drop-shadow(0px 3.69509px 8.39793px rgba(0, 0, 0, 0.2));
  }
`;
