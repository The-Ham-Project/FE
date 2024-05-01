import React, { useState, useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import searchIcon from '/public/assets/search.svg';
import lgoo from '/public/assets/lgoo.svg';
import person from '/public/assets/person.svg';
import styled from 'styled-components';
import useStore, { useErrorModalStore } from '../../store/store';
import NotFound from '../../pages/glitch/NotFound';

interface SearchButtonProps {
  isActive: boolean;
}

function Search() {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null); // Ref 생성
  const searchContainerRef = useRef<HTMLDivElement>(null); // Ref 생성
  const { login } = useStore();
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
        return responseData.data;
      } catch (error) {
        console.error('데이터를 가져오는 중 에러 발생:', error);
        throw error;
      }
    },
    enabled: keyword !== '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
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

    navigate(`/search?keyword=${encodeURIComponent(keyword)}&page=1&size=6`);
  };

  const activeEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setShowInput(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const isLoggedIn = useStore((state) => state.isLoggedIn);
  const { isOpen, errorMessage, openModal, closeModal } = useErrorModalStore();

  const handlePersonButtonClick = () => {
    if (localStorage.getItem('accessToken')) {
      navigate('/mypage');
    } else if (localStorage.getItem('accessToken') === null || undefined) {
      openModal('로그인 페이지로 이동합니다');
    }
  };
  if (isLoading) {
    return (
      <LoadingWrapper>
        <Loading />
      </LoadingWrapper>
    );
  }
  if (isError) {
    return <NotFound />;
  }

  return (
    <div style={{ display: 'flex', backgroundColor: 'white' }}>
      <SearchContainer ref={searchContainerRef}>
        <img
          style={{
            marginRight: '20px',
            cursor: 'pointer',
          }}
          src={lgoo}
          onClick={() => {
            navigate('/');
          }}
        />
        <div
          style={{
            borderRadius: '20px',
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          <AnimatedInputContainer showInput={showInput}>
            <input
              ref={inputRef}
              style={{ borderRadius: '20px', outline: 'none' }}
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
          {showInput && (
            <SearchResults>
              {isError && <li>Error occurred while fetching data</li>}
              {data &&
                data.searchResponseList?.map((rental) => (
                  <Searchli key={rental.rentalId}>
                    <Link to={`/Details/${rental.rentalId}`}>
                      {rental.title}
                    </Link>
                  </Searchli>
                ))}
            </SearchResults>
          )}
        </div>
        <PersonButton onClick={handlePersonButtonClick}>
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

const LoadingWrapper = styled.div`
  overflow: auto;
  background-color: white;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 700px) {
    overflow: scroll;
  }
`;

const Loading = styled.div`
  width: 80px;
  height: 80px;
  border: 8px solid #8da9db;
  border-top-color: #2f5496;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  @media screen and (max-width: 430px) {
  }
  @keyframes spin {
    to {
    }
  }
`;
// 스타일드 컴포넌트 정의
const SearchContainer = styled.div`
  display: flex;
  width: 100%;
  height: 60px;
  align-items: center;
  background-color: rgb(255, 255, 255);
  justify-content: flex-end;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 8px;
  position: absolute;
  z-index: 99;
  padding: 20px;
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
  margin-left: 12px;
  /* padding-left: 25px; */
`;

const SearchButton = styled.button<SearchButtonProps>`
  right: 74px;
  position: absolute;
  background-color: ${({ isActive }) => (isActive ? '#F5F5F5' : '#ffffff')};
  width: 20px;
  height: 0px;
  top: 17px;
  padding: 0;
  border: none;
  cursor: pointer;
  transition: background-color 0.7s ease-in-out;
`;

const SearchResults = styled.ul`
  width: 50%;
  border-radius: 10px;
  display: flex;
  place-content: center;
  position: absolute;
  left: 92px;
  top: 50px;
  flex-direction: column;
  border-radius: 20px;
`;

const Searchli = styled.li`
  background-color: #fafafa;
  border-bottom: 1px solid #dddddd;
  padding: 10px;
  border-radius: 20px;
`;
