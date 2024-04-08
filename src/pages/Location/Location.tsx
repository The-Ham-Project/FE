// import { useEffect, useState } from 'react';

// declare global {
//   interface Window {
//     kakao;
//   }
// }

// declare const window: typeof globalThis & {
//   kakao;
// };

// // const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
// // const options = {
// //   //지도를 생성할 때 필요한 기본 옵션
// //   center: new window.kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
// //   level: 3, //지도의 레벨(확대, 축소 정도)
// // };

// // const map = new window.kakao.maps.Map(container, options);
// // console.log(map);

// export default function Location(): JSX.Element {
//   const [map, setMap] = useState<any>();
//   // const [marker, setMarker] = useState<any>(); //지도 생성 및 객체 리턴

//   // const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
//   // const options = {
//   //   //지도를 생성할 때 필요한 기본 옵션
//   //   center: new window.kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
//   //   level: 3, //지도의 레벨(확대, 축소 정도)
//   // };
//   // const location = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
//   useEffect(() => {
//     const script = document.createElement('script');
//     script.src =
//       '//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=1df8e00ba19cbaf3ed39000226e2e4c8';
//     document.head.appendChild(script);
//     script.onload = () => {
//       window.kakao.maps.load(function () {
//         const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
//         const options = {
//           //지도를 생성할 때 필요한 기본 옵션
//           center: new window.kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
//           level: 3, //지도의 레벨(확대, 축소 정도)
//         };

//         setMap(new window.kakao.maps.Map(container, options));
//         // setMarker(new window.kakao.maps.Marker());

//         // const map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

//         //마커가 표시될 위치
//         // const markerPosition = new window.kakao.maps.LatLng(
//         //   33.450701,
//         //   126.570667,
//         // );

//         // //마커를 생성
//         // const marker = new window.kakao.maps.Marker({
//         //   position: markerPosition,
//         // });

//         // //마커가 지도 위에 표시되도록 설정
//         // marker.setMap(location);
//       });
//     };
//   }, []);

//   // 현재 위치
//   const getCurrentPosBtn = () => {
//     navigator.geolocation.getCurrentPosition(
//       getPosSuccess,
//       () => alert('위치 정보 가져오기 실패'),
//       {
//         enableHighAccuracy: true,
//         maximumAge: 30000,
//         timeout: 27000,
//       },
//     );
//   };

//   // 현재 위치 함수가 정상 작동하면 실행
//   const getPosSuccess = (pos: GeolocationPosition) => {
//     // 현재 위치의 위도, 경도
//     const currentPos = new window.kakao.maps.LatLng(
//       pos.coords.latitude, // 위도
//       pos.coords.longitude, // 경도
//     );

//     // 지도를 현재 위치로 이동
//     map.panTo(currentPos);

//     // 기존 마커를 제거하고 새로운 마커를 넣는다.
//     // marker.setMap(null);
//     // marker.setPosition(currentPos);
//     // marker.setMap(location);
//   };
//   return (
//     <>
//       {/* <script
//         type="text/javascript"
//         src="//dapi.kakao.com/v2/maps/sdk.js?appkey=1df8e00ba19cbaf3ed39000226e2e4c8"
//       ></script> */}
//       <div id="map" style={{ width: 500, height: 400 }}></div>
//       <button onClick={getCurrentPosBtn}>내 위치</button>
//     </>
//   );
// }

// /* eslint-disable @typescript-eslint/no-explicit-any */

// // import { useState, useEffect } from 'react';
// // import styled from 'styled-components';

// // declare global {
// //   interface Window {
// //     kakao: any;
// //   }
// // }

// // interface LocationProps {
// //   width: string;
// //   height: string;
// // }

// // const Location = ({ width, height }: LocationProps) => {
// //   const [map, setMap] = useState<any>();
// //   const [marker, setMarker] = useState<any>();

// //   // 1. 카카오맵 불러오기
// //   useEffect(() => {
// //     const script = document.createElement('script');
// //     script.src =
// //       '//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=1df8e00ba19cbaf3ed39000226e2e4c8';
// //     document.head.appendChild(script);
// //     window.kakao.maps.load(() => {
// //       const container = document.getElementById('map');
// //       const options = {
// //         center: new window.kakao.maps.LatLng(37.555949, 126.972309),
// //         level: 3,
// //       };

// //       setMap(new window.kakao.maps.Map(container, options));
// //       setMarker(new window.kakao.maps.Marker());
// //     });
// //   }, []);

// //   // 2. 현재 위치 함수
// //   const getCurrentPosBtn = () => {
// //     navigator.geolocation.getCurrentPosition(
// //       getPosSuccess,
// //       () => alert('위치 정보 가져오기 실패'),
// //       {
// //         enableHighAccuracy: true,
// //         maximumAge: 30000,
// //         timeout: 27000,
// //       },
// //     );
// //   };

// //   // 3. 현재 위치 함수가 정상 작동하면 실행
// //   const getPosSuccess = (pos: GeolocationPosition) => {
// //     // 현재 위치의 위도, 경도
// //     const currentPos = new window.kakao.maps.LatLng(
// //       pos.coords.latitude, // 위도
// //       pos.coords.longitude, // 경도
// //     );

// //     // 지도를 현재 위치로 이동시킨다.
// //     map.panTo(currentPos);

// //     // 기존 마커를 제거하고 새로운 마커를 넣는다.
// //     marker.setMap(null);
// //     marker.setPosition(currentPos);
// //     marker.setMap(map);
// //   };

// //   return (
// //     <Layout>
// //       <MapContainer style={{ width, height }}>
// //         <MapBox id="map" style={{ width: '100%', height: '100%' }}></MapBox>
// //         <MyLocationBtn onClick={getCurrentPosBtn}></MyLocationBtn>
// //       </MapContainer>
// //     </Layout>
// //   );
// // };

// // const Layout = styled.div`
// //   padding: 10px;
// // `;

// // const MapContainer = styled.div`
// //   position: relative;
// //   border-radius: 20px;
// //   overflow: hidden;
// // `;

// // const MapBox = styled.div`
// //   width: 100%;
// //   height: 100%;
// // `;

// // const MyLocationBtn = styled.div`
// //   position: absolute;
// //   left: 15px;
// //   top: 15px;
// //   padding: 5px 6px 3px 7px;
// //   border: 1px solid #c2c2c2;
// //   border-radius: 100px;
// //   background: white;
// //   z-index: 1;
// //   cursor: pointer;

// //   &:hover {
// //     background-color: #f1f1f1;
// //   }
// // `;

// // export default Location;

import { useEffect, useState } from 'react';
import axios from 'axios';

declare global {
  interface Window {
    kakao;
  }
}

declare const window: typeof globalThis & {
  kakao;
};

export default function Location(): JSX.Element {
  const [map, setMap] = useState<any>();
  const [address, setAddress] = useState('');
  const [results, setResults] = useState<any>([]);
  // // 현재 표시되는 반경
  // const [currentCircle, setCurrentCircle] = useState<any>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      '//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=1df8e00ba19cbaf3ed39000226e2e4c8';
    document.head.appendChild(script);
    script.onload = () => {
      window.kakao.maps.load(function () {
        const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
        const options = {
          //지도를 생성할 때 필요한 기본 옵션
          center: new window.kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
          level: 3, //지도의 레벨(확대, 축소 정도)
        };

        setMap(new window.kakao.maps.Map(container, options));
      });
    };
  }, []);

  // 현재 위치
  const getCurrentPosBtn = () => {
    navigator.geolocation.getCurrentPosition(
      getPosSuccess,
      () => alert('위치 정보 가져오기 실패'),
      {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000,
      },
    );
  };

  // navigator.geolocation.getCurrentPosition((currentPos) => {
  //   alterAddress(currentPos);
  // });

  // 현재 위치 함수가 정상 작동하면 실행
  const getPosSuccess = (pos: GeolocationPosition) => {
    // 현재 위치의 위도, 경도
    const currentPos = new window.kakao.maps.LatLng(
      pos.coords.latitude, // 위도
      pos.coords.longitude, // 경도
    );
    console.log(currentPos);

    // 위치 정보 가져오기 성공 시 주소 변환 함수 호출
    alterAddress(pos);

    // 마커를 생성합니다
    const marker = new window.kakao.maps.Marker({
      position: currentPos,
    });
    // 지도를 현재 위치로 이동
    map.panTo(currentPos);

    // 현재 위치 반경 4km 표시
    const circle = new window.kakao.maps.Circle({
      center: currentPos,
      radius: 8000,
      strokeWeight: 1,
      strokeColor: 'rgb(22,137,243)',
      strokeOpacity: 0.5,
      fillColor: 'rgb(0,26,255)',
      fillOpacity: 0.05,
    });
    circle.setMap(map);
    marker.setMap(map);

    navigator.geolocation.getCurrentPosition((pos) => {
      alterAddress(pos);
    });
  };

  // const getCurrentLocation = () => {
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     alterAddress(position);
  //   });
  // };

  /* 카카오지도 API로 현재 유저 좌표를 동단위로 변환 */
  const alterAddress = async (pos: GeolocationPosition) => {
    const x = pos.coords.longitude;
    const y = pos.coords.latitude;
    console.log(x, 'x');
    console.log(y, 'y');
    if (x && y) {
      await axios
        .get(
          `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${x}&y=${y}`,
          // `https://dapi.kakao.com/v2/local/geo/coord2address.json?input_coord=WGS84&x=${x}&y=${y}`,
          {
            headers: {
              // Authorization: `KakaoAK 1df8e00ba19cbaf3ed39000226e2e4c8`,
              Authorization: `KakaoAK ${import.meta.env.VITE_APP_KAKAO_JAVASCRIPT_KEY}`,
            },
          },
        )
        .then((result) => {
          if (
            result &&
            result.data &&
            result.data.documents &&
            result.data.documents.length > 0
          ) {
            //법정동 기준으로 동단위의 값을 가져온다
            const location = result.data.documents[0].address_name;
            setAddress(location);
            console.log(result);
            console.log('location: ', location);
            console.log('address: ', address);
          } else {
            console.error('유효한 응답 데이터가 없습니다.');
          }
        })
        .catch((error) => {
          console.error('카카오지도 API 호출 중 오류 발생:', error);
        });
    }

    //   try {
    //     const x = currentPos.coords.longitude;
    //     const y = currentPos.coords.latitude;
    //     console.log(x, 'x');
    //     console.log(y, 'y');
    //     const response = await axios
    //       .get(
    //         `https://dapi.kakao.com/v2/local/geo/coord2address.json?input_coord=WGS84&x=${y}&y=${x}`,
    //         {
    //           headers: {
    //             Authorization: 'KakaoAK {REST API 키}',
    //           },
    //         },
    //       )
    //       .then((response) => {
    //         const location = response.data.documents[0];
    //         console.log({
    //           si: location.address.region_1depth_name,
    //           gu: location.address.region_2depth_name,
    //           dong: location.address.region_3depth_name,
    //           // locationX: location.address.x,
    //           // locationY: location.address.y,
    //         });
    //       });
    //     console.log(response);
    //   } catch (error) {
    //     return;
    //   }
  };

  const handleResultClick = (selectedAddress) => {
    setAddress(selectedAddress);
    setResults([]);
  };

  return (
    <>
      <div id="map" style={{ width: 500, height: 400 }}></div>
      <div>현재 위치에 있는 동네는 아래와 같나요?</div>
      <div>{address}</div>
      <button onClick={getCurrentPosBtn}>내 위치</button>
    </>
  );
}
//qa {La: 127.1565555, Ma: 37.4493366}

// // 펀딩 수정 API
// const handlefundingModifyClick = async () => {
//   try {
//     if (
//       fundingData.publicFlag === "" ||
//       fundingData.showName === "" ||
//       fundingData.title === "" ||
//       fundingData.content === ""
//     ) {
//       infoToast("내용을 입력해주세요");
//       return;
//     }

//     const data = await patchFundingModify(id, fundingData);

//     setFundingData({
//       ...fundingData,
//       data, // 수정된 데이터로 업데이트
//     });

//     navigate(`/fundingdetail/${id}`);
//   } catch (error) {
//     console.error("펀딩 수정 오류");
//   }
// };

// import { useCallback, useEffect, useState } from 'react';

// import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
// import {
//   currentLocationState,
//   dbDefaultState,
//   dbState,
// } from '../../../store/selectors';

// import { data } from '../../../bookstore';
// import colors from '../../../common/colors';

// import { FaParking } from 'react-icons/fa';
// import { IoCafeOutline } from 'react-icons/io5';
// import { MdCircle } from 'react-icons/md';
// import { BiCurrentLocation } from 'react-icons/bi';
// import { BiX } from 'react-icons/bi';

// import * as S from './InfoWrapper.style';
// import ResultItem from './ResultItem/ResultItem';
// import Category from './Category/Category';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useGeolocation, useSearch } from '../../../hooks';

// export default function InfoWrapper({ map }: any) {
//   const navigate = useNavigate();
//   const { bookstoreId } = useParams();

//   // 현재 위치 가져오기
//   const location = useGeolocation();

//   // 현재 위치 전역 상태
//   const setCurrentLocation = useSetRecoilState(currentLocationState);
// // 현재 표시되는 반경
// const [currentCircle, setCurrentCircle] = useState<any>(null);

//   // db 전역 상태
//   const [DB, setDB] = useRecoilState<IdbState[]>(dbState);
//   const DBDefault = useRecoilValue<IdbState[]>(dbDefaultState);

//   // 검색어
//   const [search, setSearch] = useState<string>('');

//   // 현재 카테고리

//   // 카테고리 드롭다운 상태
//   const [openCategory, setOpenCategory] = useState<boolean>(false);

//   // 주차, 카페, 영업 상태 필터

//   // 검색결과 데이터 끝 여부
//   const [isEndOfData, setIsEndOfData] = useState<boolean>(false);

//   const loadCount = 20;
//   // 더보기 버튼 클릭 시 로드할 데이터 개수
//   const [countOfData, setCountOfData] = useState<number>(loadCount);

//   const {
//     handleSubmit,
//     handleSearch,
//     handleResetResult,
//     setCurrentCategory,
//     setFilterOptions,
//     currentCategory,
//     filterOptions,
//     parking,
//     cafe,
//     openFilter,
//   } = useSearch(DBDefault, search, setDB, setSearch);

//   // 더보기 버튼 클릭 핸들링 함수
//   const handleLoadMoreButtonClick = useCallback(() => {
//     if (countOfData + loadCount >= DB.length) {
//       setCountOfData(DB.length);
//       setIsEndOfData(true);
//       return;
//     }
//     setCountOfData(countOfData + loadCount);
//   }, [countOfData, DB.length]);

//   //! 검색 결과 초기화 핸들링 함수

//   // 내 위치로 검색하기 버튼 클릭 핸들링 함수
//   const handleSearchCurrentLocationClick = useCallback(() => {
//     // 현재 위치가 없으면 return
//     if (!location || !map) return;

//     navigate('/map');

//     // 현재 중심 위치
//     const currentCenter = new window.kakao.maps.LatLng(
//       location.coordinates?.lat,
//       location.coordinates?.lng,
//     );

//     // 현재 위치 전역 상태 저장
//     setCurrentLocation(location);

// // 이전 반경 표시 삭제
// currentCircle && currentCircle.setMap(null);

//     // 필터 초기화 (전체 검색 결과에서 위치 표시)
//     handleResetResult();

//     // 중심에서 10km 반경 내의 데이터 필터링 후 DB에 저장
//     const newDB: any[] = [];
//     data.forEach((store) => {
//       // 서점의 위치
//       const storeLocation = new window.kakao.maps.LatLng(
//         store.FCLTY_LA,
//         store.FCLTY_LO,
//       );

//       const poly = new window.kakao.maps.Polyline({
//         path: [currentCenter, storeLocation],
//       });

//       // 서점과 현재 위치의 거리
//       const distance = poly.getLength();
//       if (distance <= 10000) {
//         newDB.push(store);
//       }
//     });
//     setDB(newDB);

//     // 현재 위치로 지도 이동
//     map.setLevel(8);
//     map.panTo(currentCenter);

//     // 현재 위치 반경 5km 표시
//     const circle = new window.kakao.maps.Circle({
//       center: currentCenter,
//       radius: 10000,
//       strokeWeight: 1,
//       strokeColor: colors.BLUE,
//       strokeOpacity: 0.8,
//       fillColor: colors.BLUE,
//       fillOpacity: 0.2,
//     });
//     circle.setMap(map);

//     // 현재 위치 반경 표시 저장
//     setCurrentCircle(circle);
//   }, [
//     currentCircle,
//     location,
//     map,
//     setCurrentLocation,
//     handleResetResult,
//     setDB,
//   ]);

//   // !필터 변경 시 검색
//   useEffect(() => {
//     handleSearch();
//   }, [
//     currentCategory,
//     filterOptions.cafe,
//     filterOptions.parking,
//     filterOptions.openFilter,
//   ]);

//   return (
//     <S.Container>
//       {/* 필터 */}
//       <S.Filters>
//         {/* 카테고리 */}
//         <S.CategoryContainer>
//           {/* 카테고리 선택 */}
//           <S.Category onClick={() => setOpenCategory(!openCategory)}>
//             {currentCategory}
//           </S.Category>
//           {openCategory && (
//             // 드롭다운 메뉴
//             <Category
//               setOpenCategory={setOpenCategory}
//               currentCategory={currentCategory}
//               setCurrentCategory={setCurrentCategory}
//             />
//           )}
//         </S.CategoryContainer>
//         {/* 주차 */}
//         <S.Filter
//           width="20%"
//           onClick={() =>
//             setFilterOptions({ ...filterOptions, parking: !parking })
//           }
//           backgroundColor={
//             filterOptions.parking ? colors.LIGHT_GRAY : 'transparent'
//           }
//         >
//           <FaParking />
//         </S.Filter>
//         {/* 카페 */}
//         <S.Filter
//           width="20%"
//           onClick={() => setFilterOptions({ ...filterOptions, cafe: !cafe })}
//           backgroundColor={
//             filterOptions.cafe ? colors.LIGHT_GRAY : 'transparent'
//           }
//         >
//           <IoCafeOutline />
//           {/* 영업상태 */}
//         </S.Filter>
//         <S.Filter
//           width="33%"
//           onClick={() =>
//             setFilterOptions({ ...filterOptions, openFilter: !openFilter })
//           }
//           backgroundColor={
//             filterOptions.openFilter ? colors.LIGHT_GRAY : 'transparent'
//           }
//         >
//           <MdCircle
//             style={{
//               color: colors.GREEN,
//               marginRight: '0.2rem',
//             }}
//           />
//           <span>영업중</span>
//         </S.Filter>
//       </S.Filters>
//       {/* 영업 상태 */}

//       {/* 내 위치로 검색하기 */}
//       <S.SearchCurrentLocation onClick={handleSearchCurrentLocationClick}>
//         <BiCurrentLocation style={{ marginRight: '0.5rem' }} />
//         <span>내 위치로 검색하기</span>
//       </S.SearchCurrentLocation>
//       {/* 검색 */}
//       <S.SearchForm onSubmit={handleSubmit}>
//         <S.SearchInput
//           type="text"
//           placeholder="서점을 찾아보세요."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           autoFocus={bookstoreId ? false : true}
//         />
//         <S.ResetButton onClick={handleResetResult}>
//           <BiX />
//         </S.ResetButton>
//         <S.SearchButton type="submit" value="검색" />
//       </S.SearchForm>

//       {/* 전체 결과 */}
//       <S.SearchResultContainer>
//         <S.Summary>총 {DB.length}건의 검색결과</S.Summary>
//         <S.ResultItemContainer>
//           {DB.length === 0 ? (
//             <S.NoResultBox>
//               🥹 해당 검색어로 검색된 결과가 없습니다
//             </S.NoResultBox>
//           ) : null}
//           {/* TODO: 검색결과 없을 때 예외처리 */}
//           {DB.slice(0, countOfData).map((item, idx) => {
//             return <ResultItem info={item} key={idx} />;
//           })}
//         </S.ResultItemContainer>
//         {/* 더보기 버튼 */}
//         {isEndOfData || (
//           <S.LoadMoreButton onClick={handleLoadMoreButtonClick}>
//             더보기
//           </S.LoadMoreButton>
//         )}
//       </S.SearchResultContainer>
//     </S.Container>
//   );
// }
