import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

interface ModalProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, message, onClose }) => {
  const navigate = useNavigate(); // useNavigate 훅은 함수 컴포넌트 내에서 사용

  const onConfirm = () => {

  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader></ModalHeader>
 
          <p>{message}</p>
          <ModalBody>
          <ModalCloseButton onClick={onClose}>취소</ModalCloseButton>
          <ModalCloseButton onClick={onConfirm}>확인</ModalCloseButton> {/* 확인 버튼 */}
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

const Modal2: React.FC<ModalProps> = ({ isOpen, message, onClose }) => {
  const navigate = useNavigate(); // useNavigate 훅은 함수 컴포넌트 내에서 사용

  const onConfirm = () => {

  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader></ModalHeader>
 
          <p>{message}</p>
          <ModalBody>
          <ModalCloseButton onClick={onClose}>취소</ModalCloseButton>
          <ModalCloseButton onClick={onConfirm}>확인</ModalCloseButton> {/* 확인 버튼 */}
        </ModalBody>
      </ModalContent>
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

const ModalContent = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  max-width: 300px;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const ModalBody = styled.div`
  display: flex;
`;

const ModalCloseButton = styled.button`
  font-size: 16px;
  width: 171px;
  height: 52px;
  cursor: pointer;
`;
