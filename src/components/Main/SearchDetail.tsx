import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaCamera } from 'react-icons/fa';
import { instance } from '../../api/axios';
import sweattheham from '../../../public/assets/sweattheham.svg';

function SearchDetail({ match }) {
  // 매치가 사용자 입력값(키워드)
  // URL 파라미터에서 대여 상품 ID를 가져옵니다.
  const rentalId = match.params.id;
  const [keyword, setKeyword] = useState('');
  const priceDot = (num: number) =>
    num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const { data, isLoading, isError } = useQuery({
    queryKey: ['rentals', keyword],
    queryFn: async () => {
      try {
        const response = await instance.get(
          `https://api.openmpy.com/api/v1/rentals/search?keyword=${encodeURIComponent(keyword)}&page=1&size=6`,
        );
        const responseData = await response.json();
        console.log(responseData);
        return responseData.data;
      } catch (error) {
        console.error('데이터를 가져오는 중 에러 발생:', error);
        throw error;
      }
    },
    enabled: keyword !== '', // keyword가 변경되면 쿼리를 다시 실행합니다.
  });

  // const handleChange = (e) => {
  //   setKeyword(e.target.value);
  //   console.log(e.target.value);
  // };
  // 대여 상품의 정보를 가져오는 API 호출 등의 로직을 추가할 수 있습니다.

  return (
    <>
      <Title>
        {data.count !== 0 ? (
          <>
            검색 결과 <span>{data.count}</span>개의 글을 찾났습니다.
          </>
        ) : (
          <>
            검색 결과 <span>0</span>개의 글을 찾났습니다.
          </>
        )}
      </Title>
      <h2>대여 상품 상세 정보</h2>
      <p>대여 상품 ID: {rentalId}</p>
      {/* 대여 상품의 다양한 정보를 여기에 표시합니다. */}
      {isLoading && <li>Loading...</li>}
      {isError && <li>Error occurred while fetching data</li>}
      {data.count !== 0 ? (
        <>
          {data.searchResponseList.map((rental) => {
            return (
              <CategoryItem key={rental.rentalId}>
                <Link
                  to={`/Details/${rental.rentalId}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <ALLLayout>
                    <ImageWrapper>
                      {rental.firstThumbnailUrl ? (
                        <Image src={rental.firstThumbnailUrl} alt="no img" />
                      ) : (
                        <PlaceholderImage>
                          <FaCamera size={24} color="#B1B1B1" />
                        </PlaceholderImage>
                      )}
                    </ImageWrapper>
                    <Layout>
                      <ProfileUrl>
                        <ProfileImage src={rental.profileUrl} alt="Profile" />
                        <Nickname>{rental.nickname}</Nickname>
                      </ProfileUrl>
                      <H1>
                        {rental.title.length > 20
                          ? rental.title.slice(0, 22) + '···'
                          : rental.title}
                      </H1>
                      <Layout2>
                        <Layout1>
                          <H2>보증금 {priceDot(rental.rentalFee)}원</H2>
                          <H3>대여비 {priceDot(rental.deposit)}원</H3>
                        </Layout1>
                      </Layout2>
                    </Layout>
                  </ALLLayout>
                </Link>
              </CategoryItem>
              // </Card>
            );
          })}
        </>
      ) : (
        <NoData>
          <IMG>{sweattheham}</IMG>
          <MSG>검색하신 키워드와 관련된 상품이 없어요.</MSG>
        </NoData>
      )}
    </>
  );
}

export default SearchDetail;

const Title = styled.div``;
const IMG = styled.div``;
const MSG = styled.div``;
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
  display: flex;
  flex-direction: column;
  align-items: center;
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
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const Image = styled.img`
  width: 100%;
  height: 111px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
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
export const NoData = styled.div``;
