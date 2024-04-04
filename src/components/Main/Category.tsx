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
import {
  CategoryTsxtSize,
  Categorybutton,
  Categoryinbutton,
  FlexCenter,
  FlexColumn,
  FlexWrap,
  MainContainer,
  MainFlex,
} from '../../styles/Details-Styles';
import ALL from '../../../public/assets/ALL.png'
import  ELECTRONIC from '../../../public/assets/ELECTRONIC.png'
import  HOUSEHOLD from '../../../public/assets/HOUSEHOLD.png'
import  KITCHEN from '../../../public/assets/KITCHEN.png'
import  CLOSET from '../../../public/assets/CLOSET.png'
import  BOOK from '../../../public/assets/BOOK.png'
import  PLACE from '../../../public/assets/PLACE.png'
import  OTHER from '../../../public/assets/OTHER.png'

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
    ALL: { name: '전체', icon: ALL },
    ELECTRONIC: { name: '전자제품', icon: ELECTRONIC },
    HOUSEHOLD: { name: '생활용품', icon: HOUSEHOLD },
    KITCHEN: { name: '주방용품', icon: KITCHEN },
    CLOSET: { name: '의류/신발', icon: CLOSET },
    BOOK: { name: '도서', icon: BOOK },
    PLACE: { name: '장소', icon: PLACE },
    OTHER: { name: '기타', icon: OTHER },
  };

  // 카테고리 클릭 시 상태 업데이트 함수
  const handleCategoryClick = (category: any) => {
    useStore.setState({ selectedCategory: category }); // 선택된 카테고리 상태 업데이트
  };

  useEffect(() => {
    if (selectedCategory) {
      setIsLoading(true);
      getCategoryData(selectedCategory)
        .then((response) => {
          // 응답 데이터에서 필요한 카테고리 데이터를 추출합니다.
          const categoryData = response.data.content;
          setCategoryData(categoryData);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('에러:', error);
          setIsLoading(false);
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
        <Categorybutton>
          {Object.entries(categoryInfo).map(([key, { name, icon }]) => (
            <Categoryinbutton
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
              
              <img src={icon}  style={{
                      maxWidth: '50px',
                      maxHeight: '50px',
                    }}/> <CategoryTsxtSize>{name}</CategoryTsxtSize>
            </Categoryinbutton>
          ))}
        </Categorybutton>
      </div>

      {/* 로딩 중일 때 표시할 메시지 */}
      {isLoading && <div>Loading...</div>}

      {/* 선택된 카테고리에 따라 렌더링된 카드들 표시 */}
      {categoryData.length > 0 && !isLoading && (
        <FlexWrap>


          
          {categoryData.map((item) => (
            <MainContainer
              key={item.rentalId}
              onClick={() => handleCardClick(item.rentalId)}
            >
              
              <Link to={`/details/${item.rentalId}`}>
                {/* 썸네일 */}
                <FlexCenter>
                {item.firstThumbnailUrl ? (
                  <img
                    src={item.firstThumbnailUrl}
                    alt="Thumbnail"
                    style={{
                      
                      objectFit: 'fill',
                      backgroundSize: 'cover',
                      maxWidth: '250px',
                      height: '200px',
                      borderRadius: '10%',
                    }}
                  />
                ) : (
                  <img
                    src="data:image/png;base64,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" // 기본 이미지 경로 설정
                    alt="Default"
                    style={{
                      maxWidth: '200px',
                      maxHeight: '200px',
                      width: '100%',
                      height: 'auto',
                    }}
                  />
                )}
                </FlexCenter>

                <MainFlex>
                  <img
                    src={item.profileUrl}
                    alt="Profile"
                    style={{
                      maxWidth: '20px',
                      maxHeight: '50px',
                      borderRadius: '50%',
                    }}
                  />
                  <p>{item.nickname}</p>
                </MainFlex>
                <FlexColumn>
                  <h3>{item.title}</h3>
                </FlexColumn>
                <MainFlex>
                  <p
                    style={{
                      fontSize: '12px',
                    }}
                  >
                    대여비 {item.rentalFee}원
                  </p>
                  <p
                    style={{
                      fontSize: '18px',
                    }}
                  >
                    사례금 {item.deposit}원
                  </p>
                </MainFlex>
              </Link>
            </MainContainer>
          ))}
        </FlexWrap>
      )}
    </div>
  );
}

export default Category;
