import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import searchIcon from '/public/assets/search.svg';
import lgoo from '/public/assets/lgoo.svg';
import { IoPersonOutline } from 'react-icons/io5';
import styled from 'styled-components';

function Search() {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();
  const [showInput, setShowInput] = useState(false); // 인풋 창 보이기 여부를 관리하는 상태

  const { data, isLoading, isError } = useQuery({
    queryKey: ['rentals', keyword],
    queryFn: async () => {
      try {
        const response = await fetch(
          `https://api.openmpy.com/api/v1/rentals/search?keyword=${encodeURIComponent(keyword)}&page=1&size=6`,
        );
        if (!response.ok) {
          throw new Error('네트워크 응답이 올바르지 않습니다');
        }
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

  // const toggleInput = () => {
  //   setShowInput(!showInput); // showInput 상태를 토글하여 인풋 창 보이기 여부 변경
  // };


  const handleChange = (e) => {
    setKeyword(e.target.value);
    console.log(e.target.value);
    //서치디테일페이지에전해줌
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
            value={keyword}
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

        {/* 검색 결과 표시 */}
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

        <IoPersonOutline
          size={'22px'}
          onClick={() => {
            navigate('/mypage');
          }}
        />
      </SearchContainer>
    </div>
  );
}

export default Search;

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
