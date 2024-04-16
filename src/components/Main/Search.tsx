import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import search from '../../../public/assets/search.svg';

const Search = () => {
  const [keyword, setKeyword] = useState('');

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
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search.trim() === '') return alert('검색어를 적어주세요');
  };

  return (
    <div style={{ display: 'nowrap' }}>
      <input
        type="text"
        placeholder="검색..."
        value={keyword}
        onChange={handleChange}
      />
      <button
        style={{
          backgroundColor: '#F5F5F5',
          maxWidth: '22px',
          maxHeight: '22px',
        }}
        onClick={handleSearch}
      >
        <img
          style={{
            maxWidth: '22px',
            maxHeight: '22px',
          }}
          src={search}
        />
      </button>
      <ul>
        {isLoading && <li>Loading...</li>}
        {isError && <li>Error occurred while fetching data</li>}
        {data &&
          data.searchResponseList.map((rental) => (
            <li key={rental.rentalId}>
              <Link to={`/Details/${rental.rentalId}`}>{rental.title}</Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Search;
