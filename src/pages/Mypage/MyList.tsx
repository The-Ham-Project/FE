import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import arrow from '/public/assets/arrow.svg';
import { useQuery, useMutation } from '@tanstack/react-query';
import { authInstance } from '../../api/axios';
import magnifyingtheham from '../../../public/assets/magnifyingtheham.png';
import donotcrythehamzzang from '../../../public/assets/donotcrythehamzzang.svg';
import { Link } from 'react-router-dom';
import { useErrorModalStore } from '../../store/store';
import Modal from '../../components/modal/Modal.tsx';
import { removeItemPost } from '../../api/itemAPI';
import modification from '../../../public/assets/modification.svg';
import trashbin from '../../../public/assets/trashbin.svg';
import { FaCamera } from 'react-icons/fa';
import Header from '../../components/layout/Header.tsx';
import Loading from '../glitch/Loading.tsx';
import InfiniteScroll from 'react-infinite-scroll-component';

interface Rental {
  rentalId: number;
  profileUrl: string;
  title: string;
  rentalFee: number;
  deposit: number;
  firstThumbnailUrl: string;
}

function MyList() {
  const [selectedRentalId, setSelectedRentalId] = useState<number | null>(null);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [rentals, setRentals] = useState([]);
  const navigate = useNavigate();
  const handleBackClick = () => navigate('/');

  const { isOpen, errorMessage, openModal, closeModal } = useErrorModalStore();
  // const page = 1; // 페이지당 아이템 수
  // const selectedCategory = 'ALL'; // 선택된 카테고리
  const priceDot = (num: number) =>
    num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['rentals', { page }],
    queryFn: async () => {
      const response = await authInstance.get(
        `/api/v1/rentals/my/posts?page=${page}&size=100`,
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
  console.log(data);

  const handleConfirmDelete = (rentalId) => {
    closeModal();
    const deleteMutation = useMutation({
      mutationFn: async (rentalId: number) => {
        await removeItemPost(rentalId);
      },
      onSuccess: () => {
        // 삭제 성공 후 로직
        console.log('게시물이 성공적으로 삭제되었습니다.');
        refetch(); // 데이터 다시 불러오기
        closeModal(); // 모달 닫기
        navigate('/mylist'); // 페이지 이동
        window.location.reload();
      },
      onError: (error) => {
        // 삭제 실패 시 로직
        console.error('게시물 삭제 중 오류가 발생했습니다:', error);
      },
    });
    deleteMutation.mutate(rentalId);
  };

  const fetchMoreData = () => {
    setPage(page + 1);
  };

  // useEffect(() => {
  //   if (!isLoading && rentals.length === 0) {
  //     setHasMore(true);
  //   }
  // }, [data]);
  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return (
      <ErrorPage>
        <img src={magnifyingtheham} />
        <MSG>
          페이지를 찾을 수 없습니다. <br />
          <br />
          잠시후 다시 시도해주세요.
        </MSG>
      </ErrorPage>
    );
  }

  return (
    <Wrapper id="ScrollableCategoryContainer">
      <ScrollableCategoryContainer
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          // alignItems: 'center',
        }}
      >
        <InfiniteScroll
          dataLength={rentals.length}
          next={fetchMoreData}
          hasMore={hasMore}
          inverse={true}
          loader={
            <LoadingMessage>
              {isLoading && rentals.length > 0 && ''}
            </LoadingMessage>
          }
          scrollableTarget="ScrollableCategoryContainer"
          scrollThreshold={0.9}
        >
          {!data || data.length === 0 ? (
            <>
              <PaddingBox>
                <MenuBox>
                  <img
                    src={arrow}
                    className={'arrow'}
                    onClick={handleBackClick}
                    style={{
                      position: 'absolute',
                      left: '20px',
                      cursor: 'pointer',
                    }}
                  />
                  <span>함께 쓴 내역</span>
                </MenuBox>
              </PaddingBox>
              <NoData>
                <img src={donotcrythehamzzang} />
                <NoDataMSG>아직 쓰신 글이 없네용</NoDataMSG>
              </NoData>
            </>
          ) : (
            <>
              <PaddingBox>
                <MenuBox>
                  <img
                    src={arrow}
                    className={'arrow'}
                    onClick={handleBackClick}
                    style={{
                      position: 'absolute',
                      left: '20px',
                      cursor: 'pointer',
                    }}
                  />
                  <span>함께 쓴 내역</span>
                </MenuBox>
              </PaddingBox>
              <SB>
                {data.map((data) => (
                  <Ao
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/details/${data.rentalId}`);
                    }}
                  >
                    <Container key={data.rentalId}>
                      <IMG>
                        {data.firstThumbnailUrl ? (
                          <img
                            src={data.firstThumbnailUrl}
                            alt="Rental Thumbnail"
                          />
                        ) : (
                          <PlaceholderImage>
                            <FaCamera size={24} color="#f0f0f0" />
                          </PlaceholderImage>
                        )}
                      </IMG>
                      <Box>
                        <Box1>
                          <Custom>
                            <Link
                              to={`/details/${data.rentalId}/edit`}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <img src={modification} />
                            </Link>
                            <Modal
                              isOpen={isOpen}
                              message={errorMessage}
                              onClose={closeModal}
                              rentalId={selectedRentalId}
                              successCallback={() => {
                                refetch();
                              }}
                            />
                          </Custom>
                          <Button
                            style={{ zIndex: '4' }}
                            onClick={(e) => {
                              e.stopPropagation();
                              openModal('게시글을 삭제하시겠습니까?');
                              setSelectedRentalId(data.rentalId);
                            }}
                          >
                            <img src={trashbin} />
                          </Button>
                        </Box1>
                        <Title>{data.title}</Title>
                        <Box2>
                          <Fee>대여비 {priceDot(data.rentalFee)}원</Fee>
                          <Deposit>보증금 {priceDot(data.deposit)}원</Deposit>
                        </Box2>
                      </Box>
                    </Container>
                  </Ao>
                ))}
              </SB>
            </>
          )}
        </InfiniteScroll>
      </ScrollableCategoryContainer>
    </Wrapper>
  );
}

export default MyList;

const MenuBox = styled.div`
  display: flex;
  background-color: #ffffff;
  height: 60px;
  width: 100%;
  align-items: center;
  justify-content: center;
  > span {
    display: flex;
    justify-content: center;
    width: 100%;
    font-size: 14px;
  }
  > .arrow {
    width: 10px;
    height: 16px;
  }
`;
const PaddingBox = styled.div`
  width: 100%;
  position: absolute;
  padding: 0 20px;
  z-index: 10000;
  background-color: #fff;
  box-shadow: 0 0 20px 0px rgba(100, 100, 111, 0.2);
`;

const PlaceholderImage = styled.div`
  width: 100%;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const LoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Ao = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  margin-top: 13px;
  margin-bottom: 12px;
  @media screen and (max-width: 430px) {
  }
`;

const ErrorPage = styled.div`
  width: 100%;
  height: 100vh;
  @media screen and (max-width: 430px) {
  }
`;

const MSG = styled.div`
  width: 230px;
  height: 56px;
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

const Button = styled.div`
  background-color: white;
  color: black;
  border: none;
  width: 39.69px;
  height: 13.77px;
  @media screen and (max-width: 430px) {
  }
`;
const Custom = styled.div`
  @media screen and (max-width: 430px) {
  }
`;
const SB = styled.div`
  margin-top: 73px;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  background-color: white;
  padding-bottom: 120px;
  /* overflow: scroll; */
`;
const ScrollableCategoryContainer = styled.div``;

const NoData = styled.div`
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 33px;
`;

const NoDataMSG = styled.div`
  width: 300px;
  height: 19px;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: #282828;
`;

const Container = styled.div`
  display: flex;
  padding: 25px 12px;
  width: 350px;
  height: 180px;
  background: #ffffff;
  box-shadow: 0px 4px 10.4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: space-between;
  margin-left: 16px;
`;

const Box1 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 18.32px;
`;

const Box2 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 180px;
  align-items: center;
`;

const Title = styled.div`
  height: 19px;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  margin-bottom: 25px;
  color: #000000;
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
  font-size: 13px;
  line-height: 17px;
  text-align: center;
  /* identical to box height */
  text-align: right;

  /* Inside auto layout */
  flex: none;
  order: 0;
  flex-grow: 0;
  z-index: 1;
  background: rgba(31, 147, 255, 0.1);
  border-radius: 16.623px;
`;

const Deposit = styled.div`
  width: 80px;
  height: 14px;
  text-align: center;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 14px;
  text-align: right;
  color: #595959;
`;

const IMG = styled.div`
  width: 130px;
  height: 130px;
  border-radius: 6.71835px;
  display: flex;
  justify-content: center;
  > img {
    width: 130px;
    height: 130px;
    border-radius: 6.71835px;
    object-fit: cover;
  }
  @media screen and (max-width: 430px) {
  }
`;
