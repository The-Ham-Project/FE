import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import ALL from '/public/assets/ALL.svg';
import ELECTRONIC from '/public/assets/ELECTRONIC.svg';
import HOUSEHOLD from '/public/assets/HOUSEHOLD.svg';
import KITCHEN from '/public/assets/KITCHEN.svg';
import CLOSET from '/public/assets/CLOSET.svg';
import BOOK from '/public/assets/BOOK.svg';
import PLACE from '/public/assets/PLACE.svg';
import OTHER from '/public/assets/OTHER.svg';
import position from '/public/assets/position.svg';
import banner from '/public/assets/banner.svg';
import magnifyingtheham from '../../../public/assets/magnifyingtheham.png';
import donotcrythehamzzang from '/public/assets/donotcrythehamzzang.svg';
import { BsArrowDownCircleFill } from 'react-icons/bs';

import Contents from '../../components/Main/Contents';
import { useQuery } from '@tanstack/react-query';
import Camera from '/public/assets/Camera.svg';
import { authInstance, instance } from '../../api/axios';
// import Header from '../layout/MainHeder';
import axios from 'axios';
import LikeButton from './LikeButton';

export type Category =
  | 'ALL'
  | 'ELECTRONIC'
  | 'HOUSEHOLD'
  | 'KITCHEN'
  | 'CLOSET'
  | 'BOOK'
  | 'PLACE'
  | 'OTHER';

const categories: Record<Category, { label: string; icon: string }> = {
  ALL: { label: '전체', icon: ALL },
  HOUSEHOLD: { label: '생활용품', icon: HOUSEHOLD },
  KITCHEN: { label: '주방용품', icon: KITCHEN },
  CLOSET: { label: '의류', icon: CLOSET },
  ELECTRONIC: { label: '전자제품', icon: ELECTRONIC },

  BOOK: { label: '도서', icon: BOOK },
  PLACE: { label: '장소', icon: PLACE },
  OTHER: { label: '기타', icon: OTHER },
};

function Category() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('ALL');
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [rentals, setRentals] = useState([]);
  const [clicked, setClicked] = useState(false);
  const priceDot = (num: number) =>
    num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['rentals', selectedCategory, page],
    queryFn: async () => {
      try {
        const response = await authInstance.get(
          `/api/v1/rentals?category=${selectedCategory}&page=${page}&size=6`,
        );

        return response.data;
      } catch (error) {
        console.error('Error fetching data:', error);
        throw new Error('Network response was not ok');
      }
    },
  });

  const fetchMoreData = () => {
    setPage(page + 1);
    refetch();

    console.log(page);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await authInstance.get(
          `/api/v1/rentals?category=${selectedCategory}&page=${page}&size=6`,
        );

        const newData = response.data.data;

        // 이전에 불러온 rentals와 새로운 newData를 합친 후 중복을 제거합니다.
        const uniqueRentals = [...newData, ...rentals].reduce(
          (acc, current) => { 
            // acc에 rentalId가 없으면 현재 데이터를 추가합니다.
            if (!acc.find((item) => item.rentalId === current.rentalId)) {
              acc.push(current);
            }
            return acc;
          },
          [],
        );
        setRentals(uniqueRentals);
        setPage(page + 1);
      } catch (error) {
        console.error('Error fetching data:', error);
        throw new Error('Network response was not ok');
      }
    };

    fetchData();
  }, []);

  const handleDifferentLocationClick = async () => {
    setClicked(true)
    try {
      const nextPage = page + 1;
      const response = await instance.get(
        `/api/v1/rentals?category=${selectedCategory}&page=${nextPage}&size=6`,
      );

      const newData = response.data.data;
      console.log(newData, 'newData');
      // 이전에 불러온 rentals와 새로운 newData를 합친 후 중복을 제거합니다.
      const uniqueRentals = [...rentals, ...newData].reduce((acc, current) => {
        // acc에 rentalId가 없으면 현재 데이터를 추가합니다.
        if (
          !acc.find(
            (item: { rentalId: any }) => item.rentalId === current.rentalId,
          )
        ) {
          acc.push(current);
        }
        return acc;
      }, []);
      setRentals(uniqueRentals);
      setPage(nextPage); // 다음 페이지를 가져오기 위해 페이지 상태를 업데이트합니다
    } catch (error) {
      console.error('데이터를 불러오는 중 오류가 발생했습니다:', error);
      throw new Error('네트워크 응답이 정상적이지 않습니다');
    }
  };

  useEffect(() => {
    if (data) {
      // 중복된 데이터 제거 후 새로운 데이터 추가
      setRentals((prevRentals) => {
        const newRentals = [...prevRentals, ...data.data];
        return newRentals.filter(
          (rental, index, self) =>
            index === self.findIndex((t) => t.rentalId === rental.rentalId),
        );
      });
      if (data.data.length === 0) {
        setHasMore(false);
      }
    }
  }, [data]);

  useEffect(() => {
    if (!isLoading && rentals.length === 0) {
      setHasMore(true);
    }
  }, [data]);

const handleCategoryChange = (category: Category) => {
  if (selectedCategory === category) {
    return;
  }

  setSelectedCategory(category);
  setPage(1);
  setRentals([]);

};

console.log(rentals[0])

  return (
    <Div id="ScrollableCategoryContainer">
      <ScrollableCategoryContainer
        style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
      >
        <InfiniteScroll
          dataLength={rentals.length}
          next = {fetchMoreData}
          hasMore={hasMore}
          loader={
            <LoadingMessage>
              {isLoading && rentals.length > 0 && ''}
            </LoadingMessage>
          }
          scrollableTarget="ScrollableCategoryContainer"
          scrollThreshold={0.9}
        >
          <Contents />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <img src={banner} alt="Top Banner" />
            <CategoryButtonsContainer>
              {Object.keys(categories).map((category) => (
                <CategoryButtonWrapper
                  style={{
                    backgroundColor:
                      selectedCategory === category ? '#E8F4FE' : 'transparent',
                  }}
                  key={category}
                  onClick={() => handleCategoryChange(category as Category)}
                >
                  <CustomCategoryButton>
                    <img src={categories[category].icon} />
                  </CustomCategoryButton>
                  <CategoryLabel>{categories[category].label}</CategoryLabel>
                </CategoryButtonWrapper>
              ))}
            </CategoryButtonsContainer>
            <div
              style={{
                width: '308px',
                height: '24px',
                fontFamily: 'Pretendard',
                fontStyle: 'normal',
                fontWeight: 700,
                fontSize: '20px',
                lineHeight: '24px',
                color: '#000000',
                flex: 'none',
                margin: '42px 25px 24px 0px',
              }}
            >
              함께 사용할 물품을 선택해보세요.
            </div>
            <div>
              <CategoryContainer>
                {rentals.map((item) => (<>
             
                  <CategoryItem  key={item.rentalId}>
                  <div style={{position: 'absolute',zIndex: '9', right: '0' , fontSize: '19px'}} >
                  <LikeButton  rentalId={item.rentalId} initialLiked={item.isLike} />
                  </div>
                    <Link
                      to={`/details/${item.rentalId}`}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >  
                      <ALLLayout >
                        <ImageWrapper >
                          {item.firstThumbnailUrl ? (
                            <Image src={item.firstThumbnailUrl} alt="no img" />
                          ) : (
                            <PlaceholderImage>
                              <img src={Camera}/>
                              {/* <FaCamera size={24} color="#f0f0f0" /> */}
                            </PlaceholderImage>
                          )}
                        </ImageWrapper>
                        <Layout>
                          <ProfileUrl>
                            <div
                              style={{ display: 'flex', alignItems: 'center' }}
                            >
                              <ProfileImage
                                src={item.profileUrl}
                                alt="Profile"
                              />
                              <Nickname>{item.nickname} </Nickname>
                            </div>
                            <div>
                              {' '}
                              <div
                                style={{
                                  fontFamily: 'Pretendard',
                                  fontStyle: 'normal',
                                  fontWeight: '400',
                                  fontSize: '9px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '2px',
                                }}
                              >
                                <img src={position} /> {item.district}
                              </div>
                            </div>
                          </ProfileUrl>

                          <H1>
                            {item.title.length > 20
                              ? item.title.slice(0, 25) + '···'
                              : item.title}
                          </H1>
                          <Layout2>
                            <Layout1>
                              <H2
                                style={{
                                  fontSize:
                                    item.deposit >= 10000 ? '9px' : '10px',
                                }}
                              >
                                보증금 {priceDot(item.deposit)}원
                              </H2>
                              <H3
                                style={{
                                  fontSize:
                                    item.deposit >= 10000 ? '10px' : '12px',
                                }}
                              >
                                대여비 {priceDot(item.rentalFee)}원
                              </H3>
                            </Layout1>
                          </Layout2>
                        </Layout>
                      </ALLLayout>
                    </Link>
                  </CategoryItem>
                  </>))}
              </CategoryContainer>
            </div>
            {rentals.length === 0 && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignContent: 'center',
                  alignItems: 'center',
                  width: '350px',
                  gap: '20px',
                }}
              >
                <img
                  style={{ marginRight: '10px', width: '80px' }}
                  src={magnifyingtheham}
                  alt=" magnifyingtheham"
                />
                <p>주변에 함께 사용할 물품이 없나요?</p>
                <Button
                  style={{ backgroundColor: 'F5F5F5' }}
                  onClick={handleDifferentLocationClick}
                >
                  다른 지역 게시물 보기
                </Button>
              </div>
            )}
            {rentals.length > 0 && (
              <div
                style={{ overflow: 'hidden' }}
                onClick={handleDifferentLocationClick}
              >
                <Arrow />
              </div>
            )}
          </div>
        </InfiniteScroll>
      </ScrollableCategoryContainer>
      <Contents2 />
    </Div>
  );
}

export default Category;

const Arrow = styled(BsArrowDownCircleFill)`
color: #e5e5e5;
font-size: 20px;
`;


const ScrollableCategoryContainer = styled.div``;
const Button = styled.button`
  background-color: #f5f5f5;
  color: gray;
`;
const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 137px;
  margin: 0 16px;
`;
const Layout2 = styled.div`
  width: 140px;
`;

const Layout1 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px;
  gap: 6px;
`;

const Nickname = styled.div`
  width: 57px;
  height: 11px;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  font-size: 9.0041px;
  line-height: 11px;
  color: #000000;
  flex: none;
  order: 1;
  flex-grow: 0;
  padding-left: 4px;
`;

const H1 = styled.div`
  font-size: 13px;
  line-height: 14px;
  font-weight: 600;
  height: 30px;
  margin-bottom: 2px;
`;
const H2 = styled.div`
  font-size: 10px;
  line-height: 14px;
  letter-spacing: -0.1em;
  color: #8b8b8b;
  word-spacing: 2px;
`;

const H3 = styled.div`
  color: #1689f3;
  font-weight: 600;
  font-size: 12px;
  background: rgba(31, 147, 255, 0.1);
  border-radius: 16.623px;
  letter-spacing: -0.1em;
`;

const ALLLayout = styled.div`
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CategoryButtonsContainer = styled.div`
  display: grid;
  margin-top: 20px;
  width: 100%;
  grid-template-columns: repeat(4, 0fr);
  justify-content: center;
`;

interface CustomCategoryButtonProps {
  icon: string;
}

const CustomCategoryButton = styled.div`
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: opacity 0.3s;
  background-repeat: no-repeat;
  background-position: center;
`;

const LoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CategoryLabel = styled.span`
  font-size: 12px;
  margin-top: 2px;
`;

const CategoryButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80px;
  height: 80px;
  justify-content: center;
  border-radius: 50px;
`;

const CategoryContainer = styled.div`
  display: grid;
  overflow: hidden;
  grid-template-columns: repeat(2, 0fr);
  padding-bottom: 20px;
  gap: 12px;
  row-gap: 20px;
  @media screen and (max-width: 700px) {
    grid-template-columns: repeat(3, 0fr);
    padding-bottom: 20px;
    row-gap: 20px;
  }
  @media screen and (max-width: 530px) {
    grid-template-columns: repeat(2, 0fr);
    padding-bottom: 20px;
    row-gap: 20px;
  }
`;

const CategoryItem = styled.div`
position: relative;
  height: 208.32px;
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 112px;
`;

const PlaceholderImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const Image = styled.img`
  width: 100%;
  height: 111px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  /* object-fit: contain; */
  object-fit: cover;
`;

const ProfileImage = styled.img`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  object-fit: cover;
`;

const Contents2 = styled.div`
  width: 16px;
  height: 100px;
`;

const ProfileUrl = styled.span`
  display: flex;
  align-items: flex-start;
  width: 137px;
  margin: 12px 0px 12px 0px;
  justify-content: space-between;
  align-items: center;
`;

export const Div = styled.div`
  height: 100vh;
  width: 100%;

  overflow: scroll;

  /* 스크롤바 스타일 */
  &::-webkit-scrollbar {
    width: 8px;
    display: none;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background: rgba(0, 0, 0, 0);
  }

  &::-webkit-scrollbar-track {
    /* 스크롤바 트랙 스타일링 */
  }
  &:hover {
    &::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.2);
    }
  }
`;
