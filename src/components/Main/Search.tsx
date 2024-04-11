import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

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
        return responseData.data; // 데이터를 반환합니다.
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

  return (
    <div>
      <input
        type="text"
        placeholder="검색..."
        value={keyword}
        onChange={handleChange}
      />
      <ul>
        {isLoading && <li>Loading...</li>}
        {isError && <li>Error occurred while fetching data</li>}
        {data &&
          data.map((rental) => (
            <li key={rental.rentalId}>
              <Link to={`/Details/${rental.rentalId}`}>{rental.title}</Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Search;
