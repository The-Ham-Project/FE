import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import sweattheham from '../../../public/assets/sweattheham.svg';
import useStore from '../../store/store';
import { useMutation, useQuery } from '@tanstack/react-query';
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
    console.log('로그인 페이지로 이동');
    onClose();
  };

  const { mutate } = useMutation({
    mutationFn: deleteRental,
    onSuccess: () => {
      successCallback && successCallback();
    },
  });

  const handelDeleteButton = (e) => {
    mutate(rentalId);
    e.stopPropagation();
    console.log('아이디디디ㅣ이디ㅣㄷ', rentalId);
    onClose();
  };

  if (!isOpen) return null;
  console.log(isLoggedIn);

  return (
    <ModalOverlay>
      <ModalHeader></ModalHeader>
      <ModalContent>
        <img src={sweattheham} />
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
            {/* 확인 버튼 */}
          </Button>
        </ModalBody>
      </ModalContent>
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
  background-color: rgba(0, 0, 0, 0.5); /* 반투명한 검은색 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;
const slideIn = keyframes`
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0);
  }
`;

const ModalContent = styled.div`
  width: 350px;
  height: 200px;
  background-color: white;
  padding: 20px 20px 21px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;
  justify-content: flex-end;
  gap: 17px;
  animation: ${slideIn} 0.5s ease forwards; /* 애니메이션 적용 */
`;

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

// import { useMutation } from '@tanstack/react-query';
// import styled from 'styled-components';
// import { useNavigate } from 'react-router-dom';
// import sweattheham from '../../../public/assets/sweattheham.svg';
// import { useDeleteItem } from '../../api/mutations';

// interface ModalProps {
//   isOpen: boolean;
//   message: string;
//   onClose: () => void;
//   rentalId: number;
// }

// const Modal: React.FC<ModalProps> = ({
//   isOpen,
//   message,
//   onClose,
//   // rentalId,
// }) => {
//   const navigate = useNavigate(); // useNavigate 훅은 함수 컴포넌트 내에서 사용
//   // const deleteMutation = useMutation<any, number>({
//   //   mutationFn: async (rentalId) => await removeItemPost(Number(rentalId)),
//   //   onSuccess: (res) => {
//   //     console.log('res', res);
//   //     navigate('/mylist');
//   //   },
//   //   onError: (error) => {
//   //     console.log('error', error);
//   //   },
//   // });
//   const deleteMutation = useDeleteItem();
//   const onConfirm = async (rentalId: number) => {
//     await deleteMutation.mutateAsync(rentalId);
//     navigate('/mylist');
//   };

//   if (!isOpen) return null;

//   return (
//     <>
//       <ModalOverlay>
//         <ModalHeader>
//           <img src={sweattheham} />
//         </ModalHeader>
//         {/* <ModalContent> */}
//         <ModalBody>
//           <MSG>{message}</MSG>
//           <Button>
//             <ModalCloseButton onClick={onClose}>취소</ModalCloseButton>
//             <ModalOKButton onClick={() => onConfirm(rentalId)}>
//               확인
//             </ModalOKButton>
//             {/* 확인 버튼 */}
//           </Button>
//         </ModalBody>
//         {/* </ModalContent> */}
//       </ModalOverlay>
//     </>
//   );
// };

// export default Modal;
// const ModalOverlay = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background-color: rgba(0, 0, 0, 0.5); /* 반투명한 검은색 배경 */
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   z-index: 100;
// `;

// // const ModalContent = styled.div`
// //   background-color: white;
// //   border-radius: 8px;
// //   padding: 20px;
// //   max-width: 300px;
// //   display: flex;
// //   flex-direction: column;
// //   align-items: center;
// // `;

// const ModalHeader = styled.div`
//   margin-bottom: 155.39px;
//   position: absolute;
//   /* top: 30%; */
// `;

// const ModalBody = styled.div`
//   width: 350px;
//   background-color: white;
//   border-radius: 8px;
//   padding: 20px;
//   max-width: 300px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   height: 170px;
//   justify-content: flex-end;
//   gap: 23px;
// `;
// const MSG = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
// `;

// const Button = styled.div`
//   display: flex;
//   flex-direction: row;
//   gap: 25px;
// `;

// const ModalCloseButton = styled.button`
//   font-size: 16px;
//   width: 120px;
//   height: 40px;
//   cursor: pointer;
//   background-color: #f5f5f5;
//   color: #727272;
// `;
// const ModalOKButton = styled.button`
//   font-size: 16px;
//   width: 120px;
//   height: 40px;
//   cursor: pointer;
// `;
