import React from 'react';
import styled, { keyframes } from 'styled-components';
import sweattheham from '../../../public/assets/sweattheham.svg';

const slideIn = keyframes`
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0);
  }
`;

const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 반투명한 검은색 배경 */
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 100;
`;

const ModalContent = styled.div`
  width: 100%;
  background-color: white;
  padding: 20px 20px 108px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 30%;
  border-radius: 70px;
  justify-content: flex-end;
  gap: 17px;
  animation: ${slideIn} 0.9s ease forwards; /* 애니메이션 적용 */
`;

const ModalOKButton = styled.button`
font-size: 14px;
    width: 140px;
    padding: 10px;
    height: 40px;
    cursor: pointer;
`;


const PostDetailsPageModal = ({ onClose }) => {
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent>
      <img src={sweattheham} />
        <h2>카테고리를 선택해주세요</h2>
        <ModalOKButton onClick={onClose}>확인</ModalOKButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default PostDetailsPageModal;
