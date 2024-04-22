import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaCamera } from 'react-icons/fa';
import { instance } from '../../api/axios';
import magnifyingtheham from '../../../public/assets/magnifyingtheham.png';
import { getKeywordList } from '../../api/search';
import Search from './Search';
import { useSearchParams } from 'react-router-dom';

function SearchDetail() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [data, setData] = useState(null);
  const keyword = searchParams.get('keyword');
  console.log('keyword', keyword);
  const priceDot = (num) => {
    return num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const { isLoading, isError, refetch } = useQuery({
    queryKey: ['rentals', keyword],
    queryFn: async () => {
      try {
        const { data } = await instance.get(
          `/api/v1/rentals/search?keyword=${encodeURIComponent(keyword)}&page=1&size=6`,
        );
        setData(data);
        console.log('검색 결과:', data);
        console.log('data.data.count:', data.data.count);
        return data;
      } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
      }
    },
    enabled: keyword !== '',
  });

  useEffect(() => {
    refetch();
  }, [keyword]);

  return (
    // <Wrapper>
    //   <Search />
    //   <Result>
    //     {data?.count !== 0 ? (
    //       <>
    //         검색 결과 총 <span>{data?.count}</span>개의 글을 찾았습니다!
    //       </>
    //     ) : (
    //       <>
    //         검색 결과 총 <span>0</span>개의 글을 찾았습니다.
    //       </>
    //     )}
    //   </Result>
    //   {isLoading && <li>Loading...</li>}
    //   {isError && <li>Error occurred while fetching data</li>}
    //   {data?.count !== 0 ? (
    //     <>
    //       {data.searchResponseList?.map((rental) => (
    //         <Ao
    //           key={rental.rentalId}
    //           onClick={(e) => {
    //             e.stopPropagation();
    //             navigate(`/details/${rental.rentalId}`);
    //           }}
    //         >
    //           <Container>
    //             <IMG>
    //               <img src={rental.rentalImageList} alt="Rental Thumbnail" />
    //             </IMG>
    //             <Box>
    //               <Title>{rental.title}</Title>
    //               <Box2>
    //                 <Fee>대여비 {priceDot(rental.rentalFee)}원</Fee>
    //                 <Deposit>보증금 {priceDot(rental.deposit)}원</Deposit>
    //               </Box2>
    //             </Box>
    //           </Container>
    //         </Ao>
    //       ))}
    //     </>
    //   ) : (
    //     <NoData>
    //       <Image>{magnifyingtheham}</Image>
    //       <MSG>검색하신 키워드와 관련된 상품이 없어요.</MSG>
    //     </NoData>
    //   )}
    // </Wrapper>
    <Wrapper>
      <Search />
      <Detail>
        {data && data.data.count !== 0 && (
          <Result>검색 결과 : 총 {data.data.count}개의 글을 찾았습니다!</Result>
        )}
        {isLoading && <li>Loading...</li>}
        {isError && <li>Error occurred while fetching data</li>}
        {data && data.data.count !== 0
          ? data.data.searchResponseList.map((rental: any) => (
              <Ao
                key={rental.rentalId}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/details/${rental.rentalId}`);
                }}
              >
                <Container>
                  <IMG>
                    <img
                      src={rental.firstThumbnailUrl}
                      alt="Rental Thumbnail"
                    />
                  </IMG>
                  <Box>
                    <Title>{rental.title}</Title>
                    <Box2>
                      <Fee>대여비 {priceDot(rental.rentalFee)}원</Fee>
                      <Deposit>보증금 {priceDot(rental.deposit)}원</Deposit>
                    </Box2>
                  </Box>
                </Container>
              </Ao>
            ))
          : !isLoading && (
              <NoData>
                <Image>
                  <img src={magnifyingtheham} />
                </Image>
                <MSG>검색하신 키워드와 관련된 상품이 없어요.</MSG>
              </NoData>
            )}
      </Detail>
    </Wrapper>
  );
}
export default SearchDetail;

// 스타일드 컴포넌트 정의
const SearchContainer = styled.div`
  display: flex;
  width: 320px;
  align-items: center;
  background-color: white;
  justify-content: flex-end;
`;

const AnimatedInputContainer = styled.div<{ showInput: boolean }>`
  width: ${({ showInput }) =>
    showInput ? '100%' : '0'}; /* 입력 창의 너비를 조정합니다. */
  opacity: ${({ showInput }) => (showInput ? 1 : 0)};
  overflow: hidden; /* 애니메이션 중 내용물이 넘치는 것을 방지합니다. */
  transition: width 0.3s ease-in-out; /* 너비 변경에 대한 애니메이션 효과를 적용합니다. */
`;

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: white;
  @media screen and (max-width: 430px) {
  }
`;
const Detail = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  /* margin-left: 16px; */
  @media screen and (max-width: 430px) {
  }
`;
const NoData = styled.div`
  position: relative;
  height: 100vh;
  width: 375px;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 27vh;
`;

const Result = styled.div`
  width: 290px;
  height: 17px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  margin-top: 25px;
  text-align: center;
  color: #737373;
  @media screen and (max-width: 430px) {
  }
`;

const Image = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 138px;
  height: 160px;
  > img {
    width: 138px;
    height: 160px;
  }
  @media screen and (max-width: 430px) {
  }
`;
const MSG = styled.div``;
const Ao = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: center;
  margin-top: 13px;
  margin-bottom: 12px;
  @media screen and (max-width: 430px) {
  }
`;

const Container = styled.div`
  display: flex;
  padding: 25px 12px;
  width: 350px;
  height: 180px;
  background: #ffffff;
  box-shadow: 0px 4px 10.4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  @media screen and (max-width: 430px) {
  }
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: space-between;
  @media screen and (max-width: 430px) {
  }
`;

const Box2 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 30px;
  text-align: center;
  margin-bottom: 26.74px;
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
  margin-top: 41.26px;
  color: #000000;
  @media screen and (max-width: 430px) {
  }
`;

const Fee = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 6px;
  height: 17px;
  color: #1689f3;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  text-align: right;
  flex: none;
  order: 0;
  flex-grow: 0;
  z-index: 1;
  background: rgba(31, 147, 255, 0.1);
  border-radius: 16.623px;
  @media screen and (max-width: 430px) {
  }
`;

const Deposit = styled.div`
  width: 80px;
  height: 14px;
  text-align: center;
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
