import React from 'react';
import styled from 'styled-components';
import { useMutation } from '@tanstack/react-query';
import { removeItemPost } from '../../api/itemAPI';
import sweattheham from '../../../public/assets/sweattheham.svg';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  rentalId: number;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, rentalId }) => {
  const deleteMutation = useMutation({
    mutationFn: async (rentalId: number) => {
      await removeItemPost(rentalId);
    },
    onSuccess: () => {
      console.log('게시물이 성공적으로 삭제되었습니다.');
      onClose(); // 모달 닫기
      window.location.href = '/mylist'; // 메인 페이지로 이동
    },
    onError: (error) => {
      console.error('게시물 삭제 중 오류가 발생했습니다:', error);
    },
  });

  const handleConfirmDelete = () => {
    deleteMutation.mutate(rentalId);
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalBody>
        <ModalHeader>
          <img src={sweattheham} alt="Sweat The Ham" />
        </ModalHeader>
        <MSG>게시글을 삭제하시겠습니까?</MSG>
        <Button>
          <ModalCloseButton onClick={onClose}>취소</ModalCloseButton>
          <ModalOKButton onClick={handleConfirmDelete}>확인</ModalOKButton>
        </Button>
      </ModalBody>
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
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
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

const ModalHeader = styled.div`
  margin-bottom: 155.39px;
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
