import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import sweattheham from '../../../public/assets/sweattheham.svg';
import useStore, { useErrorModalStore } from '../../store/store';
import { useMutation } from '@tanstack/react-query';
import { deleteRental } from '../../api/mylist.ts';
import { createChat } from '../../api/chat.ts';

interface ModalProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
  rentalId: number;
  successCallback?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  message,
  onClose,
  rentalId,
  successCallback,
}) => {
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  const navigate = useNavigate(); // useNavigate 훅은 함수 컴포넌트 내에서 사용
  console.log(rentalId);

  const onConfirm = () => {
    navigate('/sociallogin');
  };
  const { mutate, reset } = useMutation({
    mutationFn: deleteRental,
    onSuccess: () => {
      successCallback && successCallback();
    },
  });

 

  const handelDeleteButton = (e) => {
    mutate(rentalId);
    e.stopPropagation();
  };

  useEffect(() => {
    // rentalId나 isLoggedIn이 변경될 때마다 실행될 코드
    console.log('rentalId:', rentalId);
    console.log('isLoggedIn:', isLoggedIn);

    // 필요에 따라 다른 동작을 수행할 수 있습니다.
    // 예: 특정 조건에 따라 API 호출 등
  }, [rentalId, isLoggedIn]); // rentalId나 isLoggedIn이 변경될 때 useEffect 다시 실행

  if (!isOpen) return null;
  
  return (
    <ModalOverlay>
      <ModalHeader>
        <img src={sweattheham} />
      </ModalHeader>
      <ModalBody>
        <MSG>{message}</MSG>
        <Button>
          <ModalCloseButton
            onClick={(e) => {
              onClose();
              e.stopPropagation();
            }}
          >
            취소
          </ModalCloseButton>
          {isLoggedIn ? (
            <ModalOKButton onClick={handelDeleteButton}>확인</ModalOKButton>
          ) : (
            <ModalOKButton onClick={onConfirm}>확인</ModalOKButton>
          )}
        </Button>
      </ModalBody>
    </ModalOverlay>
  );
};

export default Modal;

const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const ModalHeader = styled.div`
  margin-bottom: 155.39px;
  position: absolute;
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
  height: 170px;
  justify-content: flex-end;
  gap: 23px;
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
