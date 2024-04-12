import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import sweattheham from '../../../public/assets/sweattheham.svg';

interface ModalProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, message, onClose }) => {
  const navigate = useNavigate(); // useNavigate 훅은 함수 컴포넌트 내에서 사용

  const onConfirm = () => {
    // onConfirm 함수를 모달 컴포넌트 내에서 정의
    navigate('/sociallogin');
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalHeader>
        <img src={sweattheham} />
      </ModalHeader>
      {/* <ModalContent> */}
      <ModalBody>
        <MSG>{message}</MSG>
        <Button>
          <ModalCloseButton onClick={onClose}>취소</ModalCloseButton>
          <ModalOKButton onClick={onConfirm}>확인</ModalOKButton>
          {/* 확인 버튼 */}
        </Button>
      </ModalBody>
      {/* </ModalContent> */}
    </ModalOverlay>
  );
};

export default Modal;
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 반투명한 검은색 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

// const ModalContent = styled.div`
//   background-color: white;
//   border-radius: 8px;
//   padding: 20px;
//   max-width: 300px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

const ModalHeader = styled.div`
  margin-bottom: 155.39px;
  position: absolute;
  /* top: 30%; */
`;

const ModalBody = styled.div`
  width: 350px;
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 200px;
  justify-content: flex-end;
  gap: 43px;
`;
const MSG = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Button = styled.div`
  display: flex;
  flex-direction: row;
  gap: 25px;
`;

const ModalCloseButton = styled.button`
  font-size: 16px;
  width: 120px;
  height: 40px;
  cursor: pointer;
  background-color: #f5f5f5;
  color: #727272;
`;
const ModalOKButton = styled.button`
  font-size: 16px;
  width: 120px;
  height: 40px;
  cursor: pointer;
`;
