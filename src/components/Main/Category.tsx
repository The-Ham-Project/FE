import React, { useEffect, useState } from 'react';
import {
  FaDesktop,
  FaHome,
  FaUtensils,
  FaTshirt,
  FaBook,
  FaPalette,
  FaMapMarkerAlt,
  FaCubes,
} from 'react-icons/fa';
import useStore from '../../store/store'; // Zustand의 상태 저장소 import
import { Link, useNavigate } from 'react-router-dom';

interface CategoryData {
  rentalId: any;
  firstThumbnailUrl: string | null;
  profileUrl: string;
  nickname: string;
  title: string;
  content: string;
  rentalFee: number;
  deposit: number;
}

function Category() {
  const selectedCategory = useStore((state) => state.selectedCategory); // 선택된 카테고리 상태 가져오기
  const getCategoryData = useStore((state) => state.getCategoryData); // 각 카테고리 데이터를 가져오는 함수 가져오기
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false); // 로딩 상태 추가
  const navigate = useNavigate();

  // 카테고리에 대한 이름 및 아이콘 정의
  const categoryInfo = {
    ALL: { name: '전체', icon: <FaPalette /> },
    ELECTRONIC: { name: '전자제품', icon: <FaDesktop /> },
    HOUSEHOLD: { name: '생활용품', icon: <FaHome /> },
    KITCHEN: { name: '주방용품', icon: <FaUtensils /> },
    CLOSET: { name: '의류/신발', icon: <FaTshirt /> },
    BOOK: { name: '도서', icon: <FaBook /> },
    PLACE: { name: '장소', icon: <FaMapMarkerAlt /> },
    OTHER: { name: '기타', icon: <FaCubes /> },
  };

  // 카테고리 클릭 시 상태 업데이트 함수
  const handleCategoryClick = (category: any) => {
    useStore.setState({ selectedCategory: category }); // 선택된 카테고리 상태 업데이트
  };

  useEffect(() => {
    if (selectedCategory) {
      setIsLoading(true); // 데이터를 요청하기 전에 로딩 상태를 true로 설정
      getCategoryData(selectedCategory)
        .then((response) => {
          setCategoryData(response.data); // 데이터 배열을 categoryData로 설정
          console.log('데이터 확인:', response.data); // 데이터 확인 및 로그
          setIsLoading(false); // 데이터 요청 후에는 항상 로딩 상태를 false로 설정
        })
        .catch((error) => {
          console.error('에러:', error);
          setIsLoading(false); // 에러 발생 시 로딩 상태를 false로 설정
        });
    }
  }, [selectedCategory, getCategoryData]);

  useEffect(() => {
    console.log('로딩상태:', isLoading); // 로딩 상태 변경 로그
  }, [isLoading]);
  const handleCardClick = (rentalId: string) => {
    // 카드 클릭 시 실행되는 함수
    // 상세 페이지로 이동하는 경로 생성
    const path = `/details/${rentalId}`;
    // 상세 페이지로 이동
    navigate(path);
  };

  return (
    <div>
      <div>
        <div>
          {Object.entries(categoryInfo).map(([key, { name, icon }]) => (
            <button
              key={key}
              onClick={() => handleCategoryClick(key)}
              style={{
                backgroundColor:
                  selectedCategory === key ? 'lightblue' : 'white',
                border: '1px solid black',
                margin: '5px',
                padding: '5px 10px',
                cursor: 'pointer',
              }}
            >
              {icon} {name}
            </button>
          ))}
        </div>
      </div>

      {/* 로딩 중일 때 표시할 메시지 */}
      {isLoading && <div>Loading...</div>}

      {/* 선택된 카테고리에 따라 렌더링된 카드들 표시 */}
      {categoryData.length > 0 && !isLoading && (
        <div>
          {categoryData.map((item, rentalId) => (
            <div key={rentalId} onClick={() => handleCardClick(item.rentalId)}>
              <Link to={`/details/${item.rentalId}`}>
                <h3>{item.title}</h3>
                <p>{item.content}</p>
                <p>Rental Fee: {item.rentalFee}</p>
                <p>Deposit: {item.deposit}</p>
                <p>Posted by: {item.nickname}</p>
                <img
                  src={item.profileUrl}
                  alt="Profile"
                  style={{
                    maxWidth: '50px',
                    maxHeight: '50px',
                    borderRadius: '50%',
                  }}
                />
                {item.firstThumbnailUrl ? (
                  <img
                    src={item.firstThumbnailUrl}
                    alt="Thumbnail"
                    style={{
                      objectFit: 'cover',
                      maxWidth: '200px',
                      maxHeight: '200px',
                      borderRadius: '10%',
                    }}
                  />
                ) : (
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzwsDBA9dpNwSzYVQaI3H56yvEAWRLcqM4toib5euBUT_KDVDqqj1yZhNN80tXVnDRvbo&usqp=CAU" // 기본 이미지 경로 설정
                    alt="Default"
                  ></img>
                )}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Category;
