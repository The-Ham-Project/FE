import { useEffect, useState } from 'react';
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
  FlexColumn,
  FlexWrap,
  MainContainer,
  MainFlex,
} from '../../styles/Details-Styles';

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
        <FlexWrap>
          {categoryData.map((item) => (
            <MainContainer
              key={item.rentalId}
              onClick={() => handleCardClick(item.rentalId)}
            >
              <Link to={`/details/${item.rentalId}`}>
                {/* 썸네일 */}
                {item.firstThumbnailUrl ? (
                  <img
                    src={item.firstThumbnailUrl}
                    alt="Thumbnail"
                    style={{

                      objectFit: 'fill',
                      backgroundSize: 'cover',
                      maxWidth: '200px',
                      height: '200px',
                      borderRadius: '10%',
                    }}
                  />
                ) : (
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzwsDBA9dpNwSzYVQaI3H56yvEAWRLcqM4toib5euBUT_KDVDqqj1yZhNN80tXVnDRvbo&usqp=CAU" // 기본 이미지 경로 설정
                    alt="Default"
                    style={{
                      maxWidth: '200px',
                      maxHeight: '200px',
                      width: '100%',
                      height: 'auto',
                    }}
                  />
                )}

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
