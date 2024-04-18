import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaCamera } from 'react-icons/fa';
import { instance } from '../../api/axios';
import sweattheham from '../../../public/assets/sweattheham.svg';
import { getKeywordList } from '../../api/search';
import Search from './Search';
import { useSearchParams } from 'react-router-dom';

function SearchDetail() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [data, setData] = useState(null);
  const keyword = searchParams.get('keyword');
console.log('keyword',keyword)
  const priceDot = (num) => {
    return num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const { isLoading, isError ,refetch } = useQuery({
    queryKey: ['rentals', keyword,], 
    queryFn: async () => {
      try {
        const { data } = await instance.get(
          `/api/v1/rentals/search?keyword=${encodeURIComponent(keyword)}&page=1&size=6`,
        );
        setData(data);
        console.log('검색 결과:', data);
        console.log('data.count:', data.data.count);
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
  }, [keyword, ]);







  return (
    <>
      <Search />
      {data && data.count !== 0 && (
        <Result>
          검색 결과 총 <span>{data.data.count}</span>개의 글을 찾았습니다!
        </Result>
      )}
      {isLoading && <li>Loading...</li>}
      {isError && <li>Error occurred while fetching data</li>}
      {data && data.data.count !== 0 ? (data.data.searchResponseList.map((rental:any) => (
          <Ao
            key={rental.rentalId}
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/Details/${rental.rentalId}`);
            }}
          >
            <Container>
              <IMG>
                <img src={rental.rentalImageList} alt="Rental Thumbnail" />
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
      ) : (
        !isLoading && (
          <NoData>
            <Image>{sweattheham}</Image>
            <MSG>검색하신 키워드와 관련된 상품이 없어요.</MSG>
          </NoData>
        )
      )}
    </>
  );
}
export default SearchDetail;

const NoData = styled.div``;
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
  > span {
    height: 17px;
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    margin-top: 25px;
    text-align: center;
    color: #737373;
  }
`;

const Image = styled.div``;
const MSG = styled.div``;
const Ao = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  margin-top: 13px;
  margin-bottom: 12px;
`;

const Container = styled.div`
  display: flex;
  padding: 25px 12px;
  width: 350px;
  height: 180px;
  background: #ffffff;
  box-shadow: 0px 4px 10.4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  justify-content: space-between;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Box2 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 30px;
  text-align: center;
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
`;
