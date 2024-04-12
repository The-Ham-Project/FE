import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import InfiniteScroll from 'react-infinite-scroll-component';
import ALL from '../../../public/assets/ALL.svg';
import ELECTRONIC from '../../../public/assets/ELECTRONIC.svg';
import HOUSEHOLD from '../../../public/assets/HOUSEHOLD.svg';
import KITCHEN from '../../../public/assets/KITCHEN.svg';
import CLOSET from '../../../public/assets/CLOSET.svg';
import BOOK from '../../../public/assets/BOOK.svg';
import PLACE from '../../../public/assets/PLACE.svg';
import OTHER from '../../../public/assets/OTHER.svg';
import Contents from '../../components/Main/Contents';
import Search from './Search';
import { useQuery } from '@tanstack/react-query';
import { Flex } from '../../pages/main/Main';
import { FaCamera } from 'react-icons/fa';

export type Category =
  | 'ALL'
  | 'ELECTRONIC'
  | 'HOUSEHOLD'
  | 'KITCHEN'
  | 'CLOSET'
  | 'BOOK'
  | 'PLACE'
  | 'OTHER';

const categories = {
  ALL: { label: '전체', icon: ALL },
  ELECTRONIC: { label: '전자제품', icon: ELECTRONIC },
  HOUSEHOLD: { label: '생활용품', icon: HOUSEHOLD },
  KITCHEN: { label: '주방용품', icon: KITCHEN },
  CLOSET: { label: '의류/신발', icon: CLOSET },
  BOOK: { label: '책', icon: BOOK },
  PLACE: { label: '공간', icon: PLACE },
  OTHER: { label: '기타', icon: OTHER },
};

function Category() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('ALL');
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [rentals, setRentals] = useState<any[]>([]);
  const [isActive, setIsActive] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['rentals', selectedCategory, page],
    queryFn: async () => {
      const response = await fetch(
        `https://api.openmpy.com/api/v1/rentals?category=${selectedCategory}&page=${page}&size=6`,
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
  });

  useEffect(() => {
    if (data) {
      setRentals((prevRentals) => [...prevRentals, ...data.data]);
      if (data.data.length === 0) {
        setHasMore(false);
      }
    }
  }, [data]);

  const fetchMoreData = () => {
    setPage(page + 1);
  };

  const handleCategoryChange = (category: Category) => {
    setSelectedCategory(category);
    setIsActive(!isActive);
    setPage(1);
  };

  return (
    <Div id="ScrollableCategoryContainer">

      <ScrollableCategoryContainer>
        <InfiniteScroll
          style={{ overflow: 'hidden' }}
          dataLength={rentals.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={
            <LoadingMessage>
              {isLoading ? 'Loading more...' : ''}
            </LoadingMessage>
          }
          scrollableTarget="ScrollableCategoryContainer"
          scrollThreshold={0.95}
        >
          <Contents />
          <CategoryButtonsContainer>
            {Object.keys(categories).map((categoryKey) => (
              <CategoryButtonWrapper
                key={categoryKey}
                isActive={selectedCategory === categoryKey}
              >
                <CustomCategoryButton
                  onClick={() => handleCategoryChange(categoryKey as Category)}
                  icon={categories[categoryKey].icon}
                  isActive={selectedCategory === categoryKey}
                />
                <CategoryLabel>{categories[categoryKey].label}</CategoryLabel>
              </CategoryButtonWrapper>
            ))}
          </CategoryButtonsContainer>

          <CategoryContainer>
            {rentals.map((item: any) => (
              <CategoryItem key={item.rentalId}>
                
                <Link
                  to={`/Details/${item.rentalId}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <ALLLayout>
                  <ImageWrapper>
                    {item.firstThumbnailUrl ? (
                      <Image src={item.firstThumbnailUrl} alt="no img" />
                    ) : (
                      <PlaceholderImage><FaCamera size={24} color="#B1B1B1"/></PlaceholderImage>
                    )}
                  </ImageWrapper>
                  <Layout>

                  <ProfileUrl>
                    <ProfileImage src={item.profileUrl} alt="Profile" />
                    <Nickname>{item.nickname}</Nickname>
                  </ProfileUrl>
              
                    <H1>
                      {item.title.length > 20
                        ? item.title.slice(0, 22) + '···'
                        : item.title}
                    </H1>
                    <Layout2>
                    <Layout1>
                      <H2>보증금 {item.rentalFee}원</H2>
                      <H3>대여비 {item.deposit}원</H3>
                    </Layout1>
                    
              </Layout2>
                  </Layout>
                  </ALLLayout>
                </Link>
              </CategoryItem>
            ))}
          </CategoryContainer>
        </InfiniteScroll>
      </ScrollableCategoryContainer>
    </Div>
  );
}

export default Category;

const ScrollableCategoryContainer = styled.div``;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 150px;
  padding: 0px;
  gap: 6px;
  padding-bottom: 10px;
 
`;
const Layout2 = styled.div`

  width: 150px;
`;

const Layout1 = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: flex-end;
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
    padding-left: 10px;
`;

const H1 = styled.div`
    font-size: 12px;
    line-height: 14px;
    font-weight: 600;
    height: 40px;
    align-content: center;
    letter-spacing: -0.1em;
    
`;
const H2 = styled.div`
  font-size: 10px;
  line-height: 14px;
  letter-spacing: -0.1em;
  color: #8b8b8b;
  word-spacing: 2px
`;
const H3 = styled.div`
color: #1689F3;
font-weight: 600;
font-size: 12px;
background: rgba(31, 147, 255, 0.1);
border-radius: 16.623px;
letter-spacing: -0.1em;
`;


const ALLLayout = styled.div`
display: flex;
    flex-direction: column;
    align-items: center;
`;



const CategoryButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  flex-wrap: wrap;
  padding: 10px 50px 10px 50px;
  background-color: white;
`;

interface CustomCategoryButtonProps {
  icon: string;
  isActive: boolean;
}

const CustomCategoryButton = styled.div<CustomCategoryButtonProps>`
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: opacity 0.3s;
  background-image: ${({ icon }) => `url(${icon})`};
  background-repeat: no-repeat;
  background-position: center;
  padding: 20px;

  &:active {
    border-radius: 50px;
    background-color: #418dff;
  }
`;

const LoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CategoryButtonWrapper = styled.div<{ isActive: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80px;
  height: 80px;
  justify-content: center;
  border-radius: 50px;
  transition: transform 0.3s; /* transform에 대한 transition 효과 추가 */

  &:active {
    background-color: #418dff;
  }

  ${({ isActive }) =>
    isActive &&
    `
    transform: scale(1.2); /* 클릭 시 내부 영역만 확대 */
  `}
`;

const CategoryLabel = styled.span`
  font-size: 12px;
  margin-top: 2px;
`;

const CategoryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  padding: 20px;
  justify-content: center;
`;

const CategoryItem = styled.div`
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 100%;
  height: 111px;
  object-fit: cover;
`;

const ProfileImage = styled.img`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  object-fit: cover;
`;

const ProfileUrl = styled.span`
  display: flex;
  align-items: center;
  width: 169px;
  height: 16px;
  margin-top: 10px;
`;

export const Div = styled.div`
  height: 100vh;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(103, 126, 255, 0.3);
    border-radius: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }

  @media screen and (min-width: 668px) {
    width: 430px;
  }
`;

export const DetailsLink = styled.div`
  overflow: hidden;
  max-height: 100px;
`;
