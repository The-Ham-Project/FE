import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import searchIcon from '/public/assets/search.svg';
import lgoo from '/public/assets/lgoo.svg';
import person from '/public/assets/person.svg';
import styled from 'styled-components';

interface SearchButtonProps {
  isActive: boolean;
}
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

  const handleChange = (e) => {
    setKeyword(e.target.value);
    console.log(e.target.value);
  };

  const handleSearch = () => {
    setShowInput(true);
    if (!showInput) {
      setShowInput(true);
      return;
    }
    if (keyword.trim() === '') {
      setShowInput(false);
      return;
    }
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
      <SearchContainer>
        <img
          style={{
            width: '59px',
            height: '59px',
            position: 'absolute',
            left: '25px',
            cursor: 'pointer',
          }}
          src={lgoo}
          onClick={() => {
            navigate('/');
          }}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            width: '72%%',
          }}
        >
          <AnimatedInputContainer showInput={showInput}>
            <input
              style={{ borderRadius: '20px 0 0 20px' }}
              onKeyDown={activeEnter}
              type="text"
              placeholder="검색..."
              value={keyword}
              onChange={handleChange}
            />
          </AnimatedInputContainer>
          <SearchButton
            isActive={showInput}
            onClick={() => {
              handleSearch();
            }}
          >
            <img
              style={{
                maxWidth: '40px',
                maxHeight: '22px',
              }}
              src={searchIcon}
            />
          </SearchButton>
          <SearchResults>
            {isError && <li>Error occurred while fetching data</li>}
            {data &&
              data.searchResponseList?.map((rental) => (
                <Searchli key={rental.rentalId}>
                  <Link to={`/Details/${rental.rentalId}`}>{rental.title}</Link>
                </Searchli>
              ))}
          </SearchResults>
        </div>
        <PersonButton
          onClick={() => {
            navigate('/mypage');
          }}
        >
          <img
            style={{
              maxWidth: '22px',
              maxHeight: '22px',
            }}
            src={person}
          />
        </PersonButton>
      </SearchContainer>
    </div>
  );
}

export default Search;

// 스타일드 컴포넌트 정의
const SearchContainer = styled.div`
  display: flex;
  width: 100%;
  height: 114px;
  align-items: flex-end;
  background-color: rgb(255, 255, 255);
  justify-content: flex-end;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 8px;
  position: absolute;
  z-index: 99;
  padding: 10px 15px 10px 30px;
`;

const AnimatedInputContainer = styled.div<{ showInput: boolean }>`
  width: ${({ showInput }) => (showInput ? '100%' : '0')};
  opacity: ${({ showInput }) => (showInput ? 1 : 1)};

  overflow: hidden;
  transition: ${({ showInput }) =>
    showInput
      ? 'width 0.5s ease-in-out, opacity 0.5s ease-in-out' // 인풋창이 들어갈 때의 transition
      : 'width 0.5s ease-in-out, opacity 0.3s ease-in-out'}; // 인풋창이 나올 때의 transition
`;

const PersonButton = styled.button`
  background-color: #ffffff;
  max-width: 29px;
  max-height: 59px;
  padding: 0;
  border: none;
  cursor: pointer;
  margin-left: 20px;
  /* padding-left: 25px; */
`;

const SearchButton = styled.button<SearchButtonProps>`
  background-color: ${({ isActive }) => (isActive ? '#F5F5F5' : '#ffffff')};
  width: 30px;
  height: 50px;
  padding: 0;
  border: none;
  cursor: pointer;
  border-radius: 0 10px 10px 0;
  transition: background-color 0.7s ease-in-out;
`;

const SearchResults = styled.ul`
  width: 200px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-content: center;
  position: absolute;
  left: 100px;
  top: 100px;

  flex-direction: column;
`;

const Searchli = styled.li`
  background-color: #fafafa;
  border-bottom: 1px solid #dddddd;
  padding: 10px;
`;
