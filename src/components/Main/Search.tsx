import React, { useState } from 'react';
import useStore from '../../store/store'; // Zustand 스토어 import

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태
  const setCategoryData = useStore((state) => state.setCategoryData); // 카테고리 데이터 상태 업데이트 함수

  const handleSearch = async () => {
    // 검색 실행 함수
    try {
      const data = await useStore.getState().getCategoryData(searchTerm);
      useStore.setState({ categoryData: data }); // 검색 결과로 상태 업데이트
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // 입력 시 검색어 상태 업데이트
        placeholder="검색어를 입력하세요"
      />
      <button onClick={handleSearch}>검색</button>
    </div>
  );
};

export default SearchComponent;
