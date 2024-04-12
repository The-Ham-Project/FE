import React from 'react';

function SearchDetail({ match }) {
  // URL 파라미터에서 대여 상품 ID를 가져옵니다.
  const rentalId = match.params.id;

  // 대여 상품의 정보를 가져오는 API 호출 등의 로직을 추가할 수 있습니다.

  return (
    <div>
      <h2>대여 상품 상세 정보</h2>
      <p>대여 상품 ID: {rentalId}</p>
      {/* 대여 상품의 다양한 정보를 여기에 표시합니다. */}
    </div>
  );
}

export default SearchDetail;
