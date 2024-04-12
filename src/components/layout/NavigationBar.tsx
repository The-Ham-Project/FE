import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import useStore, { useErrorModalStore } from '../../store/store';
import MainHeder from '../../components/layout/MainHeder';
import Category from '../../components/Main/Category';
import Modal from '../Main/Modal';

const Chat = styled.div`
    display: flex;
    position: fixed;
    width: 50px;
    border-radius: 50px;
    height: 50px;
    font-size: 30px;
    justify-content: center;
    align-items: center;
    color: white;
    z-index: 99;
    transform: translate(630%, 1530%);
`;

const Home = styled.div`
    display: flex;
    position: fixed;
    width: 50px;
    border-radius: 50px;
    height: 50px;
    font-size: 30px;
    justify-content: center;
    align-items: center;
    color: white;
    z-index: 99;
    transform: translate(130%, 1530%);
`;

const ButtonContainer = styled.div`
    display: flex;
    position: fixed;
    width: 50px;
    border-radius: 50px;
    height: 50px;
    background-color: #1879ff;
    font-size: 30px;
    justify-content: center;
    align-items: center;
    color: white;
    z-index: 99;
    transform: translate(370%, 1530%);
`;

export default function Main() {
    const isLoggedIn = useStore((state) => state.isLoggedIn);
    const navigate = useNavigate();
    const { isOpen, errorMessage, openModal, closeModal } = useErrorModalStore();

    const handleButtonClick = () => {
        if (isLoggedIn === true) {
            navigate('/main/PostDetailsPage');
        } else {
            openModal('로그인 후에 게시글을 생성할 수 있습니다');
            navigate('/sociallogin');
        }
    };

    return (
        <>
            <Modal isOpen={isOpen} message={errorMessage} onClose={closeModal} />
            <Home onClick={() => navigate('/')}> <img src="../../../public/assets/home.svg" alt="Home" /></Home>
            <ButtonContainer onClick={() => handleButtonClick()}>+</ButtonContainer>
            <Chat onClick={() => navigate('/commlist')}> <img src="../../../public/assets/Chat.svg" alt="Chat" /></Chat>

            <MainHeder />
            <Category />
        </>
    );
}
