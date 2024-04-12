import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useQuery, useMutation } from '@tanstack/react-query';
import styled from 'styled-components';
import { authInstance } from '../../api/axios';
import donotcrythehamzzang from '../../../public/assets/donotcrythehamzzang.svg';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useErrorModalStore } from '../../store/store';
import Modal from '../../components/Main/Modal';

interface Rental {
  rentalId: number;
  profileUrl: string;
  title: string;
  rentalFee: number;
  deposit: number;
  firstThumbnailUrl: string;
}

function MyList() {
  const navigate = useNavigate();
  const handleBackClick = () => navigate(-1);
  const deleteMutation = useMutation<any, any, number>({
    mutationFn: (itemId) => removeItemPost(itemId),
    onSuccess: (res) => {
      console.log('res', res);
      navigate('/');
    },
    onError: (error) => {
      console.log('error', error);
    },
  });

  const { isOpen, errorMessage, openModal, closeModal } = useErrorModalStore();
  const handleDeleteClick = () => {
    openModal('님아 리얼루다가 삭제?');
  };
  const page = 1; // 페이지당 아이템 수
  const selectedCategory = 'ALL'; // 선택된 카테고리

  function removeItemPost(rentalId: number): Promise<any> {
    throw new Error('Function not implemented.');
  }
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['rentals', { page }],
    queryFn: async () => {
      const response = await authInstance.get(
        'https://api.openmpy.com/api/v1/rentals/my/posts',
        {
          params: {
            page,
          },
        },
      );
      console.log(response.data.data);
      return response.data.data;
    },
  });
  if (isLoading) {
    return <div>로딩 중...</div>;
  }
  if (isError) {
    return (
      <ErrorPage>
        <img src={donotcrythehamzzang} />
        <MSG>
          페이지를 찾을 수 없습니다. <br />
          <br />
          잠시후 다시 시도해주세요.
        </MSG>
      </ErrorPage>
    );
  }
  return (
    <div>
      {!data || data.length === 0 ? (
        <p>No rentals found.</p>
      ) : (
        <>
          <MenuBox>
            <IoIosArrowBack onClick={handleBackClick} size={'24px'} />
            <span>내가 쓴 글</span>
          </MenuBox>
          {data.map((data) => (
            <Wrapper>
              <Link
                to={`/Details/${data.rentalId}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <Container key={data.rentalId}>
                  <IMG>
                    <img src={data.firstThumbnailUrl} alt="Rental Thumbnail" />
                  </IMG>
                  <Box>
                    <Box1>
                      <Custom>
                        <Link to={`/Details/${data.rentalId}/edit`}>수정</Link>
                        <Modal
                          isOpen={isOpen}
                          message={errorMessage}
                          onClose={closeModal}
                        />
                        <button
                          style={{ zIndex: '4' }}
                          onClick={handleDeleteClick}
                        >
                          싹제
                        </button>
                      </Custom>
                    </Box1>
                    <Title>{data.title}</Title>
                    <Box2>
                      <Fee>대여비 {data.rentalFee}원</Fee>
                      <Deposit>보증금: {data.deposit}원</Deposit>
                    </Box2>
                  </Box>
                </Container>
              </Link>
            </Wrapper>
          ))}
        </>
      )}
    </div>
  );
}

export default MyList;

const MenuBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 6vh;
  padding: 0 7%;
  box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.1);
  background-color: #f5f5f5;
  z-index: 1;
  > span {
    width: 69px;
    height: 17px;
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 400;
    font-size: 14.1085px;
    line-height: 17px;
    text-align: center;
    color: #000000;
  }
  @media screen and (max-width: 430px) {
    height: 60px;
    width: 100%;
    margin: 0px;
    padding: 0 20px;
  }
`;

const ErrorPage = styled.div`
  /* Group 1394 */

  position: absolute;
  width: 141.1px;
  height: 193.64px;
  left: 125.29px;
  top: 280.25px;
  @media screen and (max-width: 430px) {
  }
`;

const MSG = styled.div`
  /* 페이지를 찾을 수 없습니다. 잠시 후 다시 시도해주세요. */
  position: absolute;
  width: 230px;
  height: 56px;
  left: calc(50% - 230px / 2);
  top: calc(50% + 56px / 2 + 113.25px);
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  text-align: center;
  color: #505050;
  @media screen and (max-width: 430px) {
  }
`;

const Custom = styled.div`
  @media screen and (max-width: 430px) {
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 13px;
  @media screen and (max-width: 430px) {
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: space-evenly;
  padding: 25px 12px;
  gap: 10px;
  width: 350px;
  height: 180px;
  background: #ffffff;
  box-shadow: 0px 4px 10.4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  @media screen and (max-width: 430px) {
  }
`;

const Box = styled.div`
  @media screen and (max-width: 430px) {
  }
`;
const Box1 = styled.div`
  @media screen and (max-width: 430px) {
  }
`;

const Box2 = styled.div`
  display: flex;
  flex-direction: row;
  @media screen and (max-width: 430px) {
  }
`;

const Title = styled.div`
  height: 19px;

  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;

  color: #000000;

  @media screen and (max-width: 430px) {
  }
`;

const Fee = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 0px;
  gap: 6px;
  isolation: isolate;
  height: 17px;
  color: #1689f3;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  /* identical to box height */
  text-align: right;

  /* Inside auto layout */
  flex: none;
  order: 0;
  flex-grow: 0;
  z-index: 1;

  @media screen and (max-width: 430px) {
  }
`;

const Deposit = styled.div`
  width: 80px;
  height: 14px;

  height: 14px;

  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  text-align: right;

  color: #595959;

  @media screen and (max-width: 430px) {
  }
`;
const IMG = styled.div`
  width: 130px;
  height: 130px;
  border-radius: 6.71835px;
  > img {
    width: 130px;
    height: 130px;
    border-radius: 6.71835px;
    object-fit: contain;
  }
  @media screen and (max-width: 430px) {
  }
`;
