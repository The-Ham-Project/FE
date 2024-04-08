import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useStore from '../../store/store'; // Zustand store를 import 해야 합니다.
import {
  CategoryTsxtSize, // 오타 수정: CategoryTsxtSize -> CategoryTextSize
  Categorybutton,
  Categoryinbutton,
  FlexCenter,
  FlexColumn,
  FlexWrap,
  MainContainer,
  MainFlex,
} from '../../styles/Details-Styles';
import ALL from '../../../public/assets/ALL.png';
import ELECTRONIC from '../../../public/assets/ELECTRONIC.png';
import HOUSEHOLD from '../../../public/assets/HOUSEHOLD.png';
import KITCHEN from '../../../public/assets/KITCHEN.png';
import CLOSET from '../../../public/assets/CLOSET.png';
import BOOK from '../../../public/assets/BOOK.png';
import PLACE from '../../../public/assets/PLACE.png';
import OTHER from '../../../public/assets/OTHER.png';
import Contents from '../../components/Main/Contents';

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

function Main() {
  const selectedCategory = useStore((state) => state.selectedCategory); // 선택된 카테고리 상태 가져오기
  const getCategoryData = useStore((state) => state.getCategoryData); // 각 카테고리 데이터를 가져오는 함수 가져오기
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false); // 로딩 상태 추가
  const navigate = useNavigate();
  const page = useRef<number>(1); // 페이지 번호 유지
  const [isFetching, setIsFetching] = useState<boolean>(false); // 데이터 추가 요청 중인지 여부

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

  // 페이지 로드 시 초기 데이터를 불러오기 위해 호출되는 훅
  useEffect(() => {
    if (selectedCategory) {
      setIsLoading(true);
      getCategoryData(selectedCategory, page.current, 4)
        .then((response) => {
          // 응답 데이터에서 필요한 카테고리 데이터를 추출합니다.
          const categoryData = response.data.content;
          setCategoryData((prevData) => [...prevData, ...categoryData]); // 기존 데이터와 새로운 데이터를 합침
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

  useEffect(() => {
    // 스크롤 이벤트 리스너 등록
    window.addEventListener('scroll', handleScroll);
    return () => {
      // 컴포넌트 언마운트 시 이벤트 리스너 제거
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight && !isFetching) {
      // 페이지 하단에 도달했을 때 요청 보내도록 수정
      fetchMoreListItems(); // 수정된 함수로 변경
    }
  };

  const fetchMoreListItems = () => {
    if (!isFetching) {
      setIsFetching(true);
      // 페이지 번호 업데이트
      page.current++; // 다음 페이지 번호로 업데이트
      getCategoryData(selectedCategory, page.current, 10) // 예시로 size를 10으로 설정
        .then((response) => {
          const categoryData = response.data.content;
          setCategoryData((prevData) => [...prevData, ...categoryData]); // 기존 데이터와 새로운 데이터를 합침
          setIsFetching(false);
        })
        .catch((error) => {
          console.error('에러:', error);
          setIsFetching(false);
        });
    }
  };

  useEffect(() => {
    setCategoryData([]); // 데이터 초기화
    page.current = 1; // 페이지 번호 초기화
  }, [selectedCategory]);

  const handleCategoryClick = (category: any) => {
    useStore.setState({ selectedCategory: category }); // 선택된 카테고리 상태 업데이트
  };

  const handleCardClick = (rentalId: string) => {
    const path = `/details/${rentalId}`;
    navigate(path);
  };

  return (
    <FlexCenter>
      <Contents/>
      <div>
        <Categorybutton>
          {Object.entries(categoryInfo).map(([key, { name, icon }]) => (
            <Categoryinbutton
              key={key}
              onClick={() => handleCategoryClick(key)}
              style={{
                backgroundColor:
                  selectedCategory === key ? 'lightblue' : 'white',
                width: '70px',
                borderRadius: '50px',
                cursor: 'pointer',
              }}
            >
              <img
                src={icon}
                style={{
                  maxWidth: '50px',
                  maxHeight: '50px',
                }}
                alt={name}
              />
              <CategoryTsxtSize>{name}</CategoryTsxtSize>
            </Categoryinbutton>
          ))}
        </Categorybutton>
      </div>

      {isLoading && <div>Loading...</div>}

      {categoryData.length > 0 && (
        <FlexWrap>
          {categoryData.map((item, index) => (
            <MainContainer
              key={index}
              onClick={() => handleCardClick(item.rentalId)}
            >
              <Link to={`/details/${item.rentalId}`}>
                <FlexCenter>
                  <img
                    src={item.firstThumbnailUrl || 'Default URL here'}
                    alt="Thumbnail"
                    style={{
                      objectFit: 'fill',
                      width: '150px',
                      height: '130px',
                      borderRadius: '10%',
                    }}
                  />
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
                  <p style={{ fontSize: '11px' }}>대여비 {item.rentalFee}원</p>
                  <p style={{ fontSize: '15px' }}>사례금 {item.deposit}원</p>
                </MainFlex>
              </Link>
            </MainContainer>
          ))}
        </FlexWrap>
      )}
    </FlexCenter>
  );
}

export default Main;
