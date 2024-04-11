import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import ALL from '../../../public/assets/ALL.png';
import ELECTRONIC from '../../../public/assets/ELECTRONIC.png';
import HOUSEHOLD from '../../../public/assets/HOUSEHOLD.png';
import KITCHEN from '../../../public/assets/KITCHEN.png';
import CLOSET from '../../../public/assets/CLOSET.png';
import BOOK from '../../../public/assets/BOOK.png';
import PLACE from '../../../public/assets/PLACE.png';
import OTHER from '../../../public/assets/OTHER.png';
import Contents from '../../components/Main/Contents';

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
  ELECTRONIC: { label: '가전제품', icon: ELECTRONIC },
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
  const [items, setItems] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false); // 데이터 로딩 상태 추가

  useEffect(() => {
    fetchData();
  }, [page, selectedCategory]);

  const fetchData = async () => {
    setIsLoading(true); // 데이터 로딩 시작 시 상태 변경
    try {
      const response = await axios.get(
        'https://api.openmpy.com/api/v1/rentals',
        {
          params: {
            category: selectedCategory,
            page,
            size: 6,
          },
        },
      );
      if (response.data.data.length > 0) {
        setItems((prevItems) => {
          const newItems = response.data.data.filter(
            (newItem: { rentalId: any }) => {
              return !prevItems.some(
                (prevItem) => prevItem.rentalId === newItem.rentalId,
              );
            },
          );
          return [...prevItems, ...newItems];
        });
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false); // 데이터 로딩 완료 시 상태 변경
    }
  };

  const fetchMoreData = () => {
    setPage(page + 1);
  };

  const handleCategoryChange = (category: Category) => {
    setSelectedCategory(category);
    setPage(1);
    setItems([]);
    setHasMore(true);
  };

  return (
    <Div id="ScrollableCategoryContainer">
      <ScrollableCategoryContainer>
        <InfiniteScroll
          style={{ overflow: 'hidden' }}
          dataLength={items.length}
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
              <CategoryButtonWrapper key={categoryKey}>
                <CustomCategoryButton
                  onClick={() => handleCategoryChange(categoryKey as Category)}
                  selected={selectedCategory === categoryKey}
                  icon={categories[categoryKey].icon}
                />
                <CategoryLabel>{categories[categoryKey].label}</CategoryLabel>
              </CategoryButtonWrapper>
            ))}
          </CategoryButtonsContainer>

          <CategoryContainer>
            {items.map((item: any) => (
              <CategoryItem key={item.rentalId}>
                <Link
                  to={`/Details/${item.rentalId}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <ImageWrapper>
                    {item.firstThumbnailUrl ? (
                      <Image src={item.firstThumbnailUrl} alt="no img" />
                    ) : (
                      <PlaceholderImage>No Image</PlaceholderImage>
                    )}
                  </ImageWrapper>
                  <ProfileUrl>
                    <ProfileImage src={item.profileUrl} alt="Profile" />
                    <p>{item.nickname}</p>
                  </ProfileUrl>
                  <h2>{item.title}</h2>
                  <DetailsLink>
                    <p>{item.content}</p>
                  </DetailsLink>
                  <div>
                    <p>보증금 {item.rentalFee}</p>
                    <p>사례금 {item.rentalId}</p>
                  </div>
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

const CategoryButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 12px;
  padding: 10px 50px 10px 50px;
  background-color: white;
`;

interface CustomCategoryButtonProps {
  selected: boolean;
  icon: string;
}

const CustomCategoryButton = styled.div<CustomCategoryButtonProps>`
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: opacity 0.3s;
  background-image: ${({ icon }) => `url(${icon})`};
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  text-indent: -9999px;
  width: 60px;
  height: 60px;
  padding: 30px;
  &:hover {
    opacity: 0.8;
  }
  &:active {
    opacity: 0.6;
  }
`;

const LoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CategoryButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CategoryLabel = styled.span`
  font-size: 14px;
`;

const CategoryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  justify-content: center;
`;

const CategoryItem = styled.div`
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 10px;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 120px;
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
  height: 100%;
  object-fit: cover;
`;

const ProfileImage = styled.img`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  object-fit: cover;
`;

const ProfileUrl = styled.span`
  display: flex;
  align-items: center;
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
