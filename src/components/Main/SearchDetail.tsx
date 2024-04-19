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
import lgoo from '../../../public/assets/lgoo.svg';
import searchIcon from '/public/assets/search.svg';

function SearchDetail() {
  // 매치가 사용자 입력값(키워드)
  // URL 파라미터에서 대여 상품 ID를 가져옵니다.
  // const rentalId = match.params.id;
  const [userInput, setUserInput] = useState('');
  const navigate = useNavigate();
  const [showInput, setShowInput] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');
  console.log('searchDetail', keyword);
  const priceDot = (num: number) =>
    num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  // const json = JSON.stringify(obj);
  const { data, isLoading, isError } = useQuery({
    queryKey: ['rentals', keyword],
    queryFn: async () => {
      try {
        console.log(keyword);
        const { data } = await instance.get(
          `/api/v1/rentals/search?keyword=${encodeURIComponent(keyword)}&page=1&size=6`,
        );
        // const responseData = await response.json();
        console.log(data);
        return data;
      } catch (error) {
        console.error('데이터를 가져오는 중 에러 발생:', error);
        throw error;
      }
    },
    enabled: keyword !== '', // keyword가 변경되면 쿼리를 다시 실행합니다.
  });
  // console.log(data.count);
  const handleChange = (e) => {
    setUserInput(e.target.value);
    console.log(e.target.value);
  };

  const handleSearch = () => {
    setShowInput(true);
    if (!showInput) return;
    if (keyword.trim() === '') return alert('검색어를 적어주세요');
    navigate(`/search?keyword=${encodeURIComponent(keyword)}&page=1&size=6`);
  };

  const activeEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Wrapper>
      <div style={{ display: 'flex', backgroundColor: 'white' }}>
        <img
          style={{
            width: '59px',
            height: '59px',
          }}
          src={lgoo}
        />
        <SearchContainer>
          <AnimatedInputContainer showInput={showInput}>
            <input
              onKeyDown={activeEnter}
              type="text"
              placeholder="검색..."
              value={userInput}
              onChange={handleChange}
            />
          </AnimatedInputContainer>
          <SearchButton
            onClick={() => {
              handleSearch();
            }}
            style={{
              backgroundColor: '#F5F5F5',
              maxWidth: '59px',
              maxHeight: '59px',
            }}
          >
            <img
              style={{
                maxWidth: '22px',
                maxHeight: '22px',
              }}
              src={searchIcon}
            />
          </SearchButton>
          <SearchResults>
            {isLoading && <li>Loading...</li>}
            {isError && <li>Error occurred while fetching data</li>}
            {data &&
              data.searchResponseList?.map((rental) => (
                <li key={rental.rentalId}>
                  <Link to={`/Details/${rental.rentalId}`}>{rental.title}</Link>
                </li>
              ))}
          </SearchResults>
        </SearchContainer>
      </div>
      <Result>
        {data?.count !== 0 ? (
          <>
            검색 결과 총 <span>{data?.count}</span>개의 글을 찾았습니다!
          </>
        ) : (
          <>
            검색 결과 총 <span>0</span>개의 글을 찾았습니다.
          </>
        )}
      </Result>
      {isLoading && <li>Loading...</li>}
      {isError && <li>Error occurred while fetching data</li>}
      {data?.count !== 0 ? (
        <>
          {data.searchResponseList?.map((rental) => (
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
          ))}
        </>
      ) : (
        <NoData>
          <Image>{sweattheham}</Image>
          <MSG>검색하신 키워드와 관련된 상품이 없어요.</MSG>
        </NoData>
      )}
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

const Input = styled.input``;

const SearchButton = styled.button``;

const SearchResults = styled.ul`
  /* 검색 결과 스타일 */
`;

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
  @media screen and (max-width: 430px) {
  }
`;
const Image = styled.div``;
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

const Wrapper = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  height: 100%;
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
  justify-content: space-between;
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
const Box1 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 18.32px;
  @media screen and (max-width: 430px) {
  }
`;

const Box2 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 30px;
  text-align: center;
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
  margin-bottom: 25px;
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
