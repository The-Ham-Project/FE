import { useEffect, useState } from 'react';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { geolocation } from '../../api/geolocation';
import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';

declare global {
  interface Window {
    kakao;
  }
}

declare const window: typeof globalThis & {
  kakao;
};

export default function Location(): JSX.Element {
  const navigate = useNavigate();
  // const handleBackClick = () => navigate(-2);
  const [map, setMap] = useState<any>(null);
  const [address, setAddress] = useState('');
  // const [results, setResults] = useState([]);
  // const [currentPosState, setCurrentPosState] = useState();

  // // 현재 표시되는 반경
  // const [currentCircle, setCurrentCircle] = useState<any>(null);
  useEffect(() => {
    (async () => {
      const script = document.createElement('script');
      script.src =
        '//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=1df8e00ba19cbaf3ed39000226e2e4c8';
      document.head.appendChild(script);
      script.onload = () => {
        window.kakao.maps.load(async function () {
          const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
          const options = {
            //지도를 생성할 때 필요한 기본 옵션
            center: new window.kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
            level: 7, //지도의 레벨(확대, 축소 정도)
          };

          await setMap(new window.kakao.maps.Map(container, options));
        });
      };
    })();
  }, []);

  // 2. 현재 위치
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

  // 3. 현재 위치 함수가 정상 작동하면 실행
  const getPosSuccess = async (pos: GeolocationPosition) => {
    // 현재 위치의 위도, 경도
    const currentPos = new window.kakao.maps.LatLng(
      pos.coords.latitude, // 위도
      pos.coords.longitude, // 경도
    );

    console.log(currentPos);
    geolocationMutation.mutate({
      lon: currentPos.La,
      lat: currentPos.Ma,
    });

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

    circle.setMap(null);
    marker.setMap(null);
    circle.setMap(map);
    marker.setMap(map);
    // 지도에 클릭 이벤트를 등록합니다
    // 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
    window.kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
      // 클릭한 위도, 경도 정보를 가져옵니다
      const latlng = mouseEvent.latLng;

      // 마커 위치를 클릭한 위치로 옮깁니다
      marker.setPosition(latlng);
      circle.setPosition(latlng);

      let message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
      message += '경도는 ' + latlng.getLng() + ' 입니다';
      console.log(message);
      // const resultDiv = document.getElementById('clickLatlng');
      // resultDiv.innerHTML = message;
    });

    navigator.geolocation.getCurrentPosition((pos) => {
      alterAddress(pos);
    });
  };

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
  };

  // const handleResultClick = (selectedAddress) => {
  //   setAddress(selectedAddress);
  //   setResults([]);
  // };
  const getMainBtn = () => {
    navigate('/');
  };
  const geolocationMutation = useMutation({
    mutationFn: geolocation,
    onSuccess: (res) => {
      console.log('res', res);
    },
    onError: (error) => {
      console.log('error', error);
    },
  });

  return (
    <>
      <Wrapper>
        <MenuBox>
          <span>내 위치 인증</span>
        </MenuBox>
        <PaddingBox>
          <Ao>
            <Map id="map"></Map>
          </Ao>
          <MSG>현재 위치에 있는 동네는 아래와 같나요?</MSG>
          <Address>{address}</Address>
          {/* <button onClick={getCurrentPosBtn}>
            <IMG src={locationButton} alt="위치인증하기" />
          </button>
          {address && <button onClick={getMainBtn}><IMG2 src={locationButton} alt="설정완료" /></button>} */}
          {/* <button onClick={getCurrentPosBtn}>
            <IMG src={locationButton} alt="위치인증하기" />
          </button>
          {address && (
            <button onClick={getMainBtn}>
              <IMG2 src={locationButton} alt="설정완료" />
            </button>
          )} */}
          {/* <Box> */}
          {/* <button onClick={getCurrentPosBtn}> */}
          <div style={{ width: '320px', marginBottom: '34px' }}>
            <IMG onClick={getCurrentPosBtn} $active={address}>
              위치설정하기
            </IMG>
            {address && (
              <IMG onClick={getCurrentPosBtn} $active={address}>
                위치 다시 설정하기
              </IMG>
            )}
            {/* </button> */}
            {address && (
              // <button onClick={getMainBtn}>
              <IMG2 onClick={getMainBtn} $active={address}>
                설정 완료
              </IMG2>

              // </button>
            )}
          </div>
          {/* <button onClick={getCurrentPosBtn}>
            <IMG src={locationButton} alt="위치인증하기" address={address} />
          </button>
          {address && (
            <button onClick={getMainBtn}>
              <IMG2 src={locationButton} alt="설정완료" address={address} />
            </button>
          )} */}
          {/* </Box> */}
        </PaddingBox>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  height: 100%;
  background-color: #ffffff;
  @media screen and (max-width: 430px) {
  }
`;

const MenuBox = styled.div`
  position: absolute;
  width: 430px;
  display: flex;
  flex-direction: row;
  padding-left: 140px;
  background-color: #ffffff;
  height: 60px;
  align-items: center;
  box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.1);
  z-index: 5;
  > span {
    width: 100px;
    margin-top: 32px;
    height: 17px;
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 400;
    font-size: 14.1085px;
    line-height: 17px;
    text-align: center;
    color: #000000;
    @media screen and (max-width: 430px) {
      height: 60px;
      > span {
        width: 100px;
      }
    }
  }
`;
// const Box = styled.div`
//   @media screen and (max-width: 430px) {
//   }
// `;

// const IMG = styled.img`;
//   @media screen and (max-width: 430px) {
//     position: absolute;
//     width: 350px;
//     height: 52px;
//     left: calc(50% - 350px / 2 + 0.49px);
//     top: 758px;
//   }
// `;
// const IMG2 = styled.img`
//   @media screen and (max-width: 430px) {
//     position: absolute;
//     width: 350px;
//     height: 52px;
//     left: calc(50% - 350px / 2 + 0.49px);
//     top: 700px;
//   }
// `;
// const IMG = styled.img`
//   @media screen and (max-width: 430px) {
//     position: absolute;
//     width: 350px;
//     height: 52px;
//     left: calc(50% - 350px / 2 + 0.49px);
//     top: 758px;
//   }
// `;
// const IMG2 = styled.img`
//   @media screen and (max-width: 430px) {
//     position: absolute;
//     width: 350px;
//     height: 52px;
//     left: calc(50% - 350px / 2 + 0.49px);
//     top: 700px;
//   }
// `;

const IMG = styled.button<{ $active: string }>(
  ({ $active }) => css`
    position: absolute;
    width: 320px;
    height: 52px;
    z-index: 100;
    bottom: ${$active ? '88px' : '40px'}; /* 조건부 위치 설정 */
    background-color: ${$active ? '#D1D1D1' : '#1689F3'}; /* 조건부 위치 설정 */
    @media screen and (max-width: 430px) {
    }
  `,
);

const IMG2 = styled.button<{ $active: string }>(
  ({ $active }) => css`
    position: absolute;
    width: 320px;
    height: 52px;
    z-index: 100;
    bottom: ${$active ? '20px' : '88px'}; /* 조건부 위치 설정 */
    @media screen and (max-width: 430px) {
    }
  `,
);

// const IMG = styled.img.attrs(props => ({
//   style: {
//     top: props.address ? '758px' : '700px',
//   },
// }))`
//   @media screen and (max-width: 430px) {
//     position: absolute;
//     width: 350px;
//     height: 52px;
//     left: calc(50% - 350px / 2 + 0.49px);
//     /* top 속성은 여기서 직접 설정하지 않습니다 */
//   }
// `;
/* Frame 1524 */

/* Auto layout */

// const IMG2 = styled.img.attrs(props => ({
//   style: {
//     top: props.address ? '700px' : '758px',
//   },
// }))`
//   @media screen and (max-width: 430px) {
//     position: absolute;
//     width: 350px;
//     height: 52px;
//     left: calc(50% - 350px / 2 + 0.49px);
//     /* top 속성은 여기서 직접 설정하지 않습니다 */
//   }
// `;
const PaddingBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  @media screen and (max-width: 430px) {
    /* box-shadow: inset 0 -5px 5px -5px #333; */
  }
`;

const Ao = styled.div`
  box-shadow: inset 0 5px 5px -5px #333;
  /* z-index: 1; */
  width: 100%;
  height: 463px;
  @media screen and (max-width: 430px) {
  }
`;

const Map = styled.div`
  position: absolute;
  top: 60px;
  width: 430px;
  height: 463px;
  @media screen and (max-width: 430px) {
  }
`;

const MSG = styled.div`
  position: absolute;
  width: 280px;
  height: 17px;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  /* identical to box height */
  text-align: center;
  color: #000000;
  z-index: 100;
  bottom: 250.26px;
  @media screen and (max-width: 430px) {
  }
`;

const Address = styled.div`
  position: absolute;
  width: 300px;
  height: 26px;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 600;
  font-size: 22px;
  line-height: 26px;
  text-align: center;
  color: #000000;
  z-index: 100;
  bottom: 205.4px;
  @media screen and (max-width: 430px) {
  }
`;

// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useMutation } from '@tanstack/react-query';
// import { geolocation } from '../../api/geolocation';
// import styled, { css } from 'styled-components';
// import { useNavigate } from 'react-router-dom';

// declare global {
//   interface Window {
//     kakao;
//   }
// }

// declare const window: typeof globalThis & {
//   kakao;
// };

// export default function Location(): JSX.Element {
//   const navigate = useNavigate();
//   // const handleBackClick = () => navigate(-2);
//   const [map, setMap] = useState<any>();
//   const [address, setAddress] = useState('');
//   const [marker, setMarker] = useState<any>();
//   const [data, setData] = useState([]);
//   // const [results, setResults] = useState([]);
//   // const [currentPosState, setCurrentPosState] = useState();

//   // // 현재 표시되는 반경
//   // const [currentCircle, setCurrentCircle] = useState<any>(null);
//   useEffect(() => {
//     (async () => {
//       navigator.geolocation.getCurrentPosition(
//         // getPosSuccess,
//         (pos) => {
//           const script = document.createElement('script');
//           script.src =
//             '//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=1df8e00ba19cbaf3ed39000226e2e4c8';
//           document.head.appendChild(script);
//           script.onload = () => {
//             window.kakao.maps.load(async function () {
//               // const createdMap = new window.kakao.maps.Map(container, options);
//               const coords = new window.kakao.maps.LatLng(
//                 pos.coords.latitude, // 위도
//                 pos.coords.longitude, // 경도
//               );
//               const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
//               const options = {
//                 //지도를 생성할 때 필요한 기본 옵션
//                 center: new window.kakao.maps.LatLng(
//                   pos.coords.latitude,
//                   pos.coords.longitude,
//                 ), //지도의 중심좌표.
//                 level: 7, //지도의 레벨(확대, 축소 정도)
//               };
//               const createdMap = new window.kakao.maps.Map(container, options);
//               // setMap(createdMap);

//               const newMarker = new window.kakao.maps.Marker({
//                 position: coords,
//                 zIndex: 300,
//               });
//               newMarker.setMap(createdMap);
//               setMarker(newMarker);

//               // setMap(createdMap);
//               await setMap(new window.kakao.maps.Map(container, options));

//               // 마커를 생성합니다
//               const marker = new window.kakao.maps.Marker({
//                 position: coords,
//               });
//               // 지도를 현재 위치로 이동
//               // map.panTo(coords, {
//               //   animate: {
//               //     duration: 550, // 1000 당 1초
//               //   },
//               // });

//               // data.forEach((el) => {
//               //   // 마커를 생성합니다
//               //   newMarker.setMap(createdMap);
//               //   });
//               // });
//               // 현재 위치 반경 4km 표시
//               const circle = new window.kakao.maps.Circle({
//                 center: coords,
//                 radius: 8000,
//                 strokeWeight: 1,
//                 strokeColor: 'rgb(22,137,243)',
//                 strokeOpacity: 0.5,
//                 fillColor: 'rgb(0,26,255)',
//                 fillOpacity: 0.05,
//               });
//               circle.setMap(null);
//               marker.setMap(null);
//               marker.setPosition(coords);
//               circle.setPosition(coords);
//               marker.setMap(map);
//               circle.setMap(map);

//               navigator.geolocation.getCurrentPosition((pos) => {
//                 alterAddress(pos);
//               });
//               // const createdMap = new window.kakao.maps.Map(container, options);
//               // const coords = new window.kakao.maps.LatLng(
//               //   pos.coords.latitude, // 위도
//               //   pos.coords.longitude, // 경도
//               // );
//               // const newMarker = new window.kakao.maps.Marker({
//               //   position: coords,
//               //   // zIndex: 300,
//               // });
//               // newMarker.setMap(createdMap);
//               // setMarker(newMarker);
//               geolocationMutation.mutate({
//                 lon: coords.La,
//                 lat: coords.Ma,
//               });
//               const alterAddress = async (pos: GeolocationPosition) => {
//                 const x = pos.coords.longitude;
//                 const y = pos.coords.latitude;
//                 console.log(x, 'x');
//                 console.log(y, 'y');
//                 if (x && y) {
//                   await axios
//                     .get(
//                       `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${x}&y=${y}`,
//                       // `https://dapi.kakao.com/v2/local/geo/coord2address.json?input_coord=WGS84&x=${x}&y=${y}`,
//                       {
//                         headers: {
//                           // Authorization: `KakaoAK 1df8e00ba19cbaf3ed39000226e2e4c8`,
//                           Authorization: `KakaoAK ${import.meta.env.VITE_APP_KAKAO_JAVASCRIPT_KEY}`,
//                         },
//                       },
//                     )
//                     .then((result) => {
//                       if (
//                         result &&
//                         result.data &&
//                         result.data.documents &&
//                         result.data.documents.length > 0
//                       ) {
//                         //법정동 기준으로 동단위의 값을 가져온다
//                         const location = result.data.documents[0].address_name;
//                         setAddress(location);
//                         console.log(result);
//                         console.log('location: ', location);
//                         console.log('address: ', address);
//                       } else {
//                         console.error('유효한 응답 데이터가 없습니다.');
//                       }
//                     })
//                     .catch((error) => {
//                       console.error('카카오지도 API 호출 중 오류 발생:', error);
//                     });
//                 }
//               };
//               // 위치 정보 가져오기 성공 시 주소 변환 함수 호출
//               alterAddress(pos);

//               // 마커를 생성합니다
//               // const marker = new window.kakao.maps.Marker({
//               //   position: coords,
//               // });

//               // 지도를 현재 위치로 이동
//               // map.panTo(coords);

//               // 현재 위치 반경 4km 표시
//               // const circle = new window.kakao.maps.Circle({
//               //   center: coords,
//               //   radius: 8000,
//               //   strokeWeight: 1,
//               //   strokeColor: 'rgb(22,137,243)',
//               //   strokeOpacity: 0.5,
//               //   fillColor: 'rgb(0,26,255)',
//               //   fillOpacity: 0.05,
//               // });
//               // circle.setMap(null);
//               // marker.setMap(null);
//               // circle.setMap(map);
//               // marker.setMap(map);
//             });
//           };
//           // enableHighAccuracy: true,
//           // maximumAge: 30000,
//           // timeout: 27000,

//           navigator.geolocation.getCurrentPosition((pos) => {
//             alterAddress(pos);
//           });
//         },
//       );

//       // () => {
//       //   alert('위치 정보 가져오기 실패');
//       // },
//       //   { enableHighAccuracy: true, maximumAge: 30000, timeout: 27000 },

//       // const newMarker = new window.kakao.maps.Marker({
//       //   position: coords,
//       //   zIndex: 300,
//       // });
//       // newMarker.setMap(createdMap);
//       // setMarker(newMarker);
//       // },
//       if (!map) {
//         return;
//       }
//     })();
//   }, [map]);

//   // 2. 현재 위치
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

//   // 3. 현재 위치 함수가 정상 작동하면 실행
//   const getPosSuccess = async (pos: GeolocationPosition) => {
//     // 현재 위치의 위도, 경도
//     const currentPos = new window.kakao.maps.LatLng(
//       pos.coords.latitude, // 위도
//       pos.coords.longitude, // 경도
//     );

//     console.log(currentPos);
//     geolocationMutation.mutate({
//       lon: currentPos.La,
//       lat: currentPos.Ma,
//     });

//     // 위치 정보 가져오기 성공 시 주소 변환 함수 호출
//     alterAddress(pos);

//     // 마커를 생성합니다
//     const marker = new window.kakao.maps.Marker({
//       position: currentPos,
//     });
//     // 지도를 현재 위치로 이동
//     map.panTo(currentPos, {
//       animate: {
//         duration: 550, // 1000 당 1초
//       },
//     });

//     // 현재 위치 반경 4km 표시
//     const circle = new window.kakao.maps.Circle({
//       center: currentPos,
//       radius: 8000,
//       strokeWeight: 1,
//       strokeColor: 'rgb(22,137,243)',
//       strokeOpacity: 0.5,
//       fillColor: 'rgb(0,26,255)',
//       fillOpacity: 0.05,
//     });
//     circle.setMap(null);
//     marker.setMap(null);
//     circle.setMap(map);
//     marker.setMap(map);

//     navigator.geolocation.getCurrentPosition((pos) => {
//       alterAddress(pos);
//     });
//   };

//   /* 카카오지도 API로 현재 유저 좌표를 동단위로 변환 */
//   const alterAddress = async (pos: GeolocationPosition) => {
//     const x = pos.coords.longitude;
//     const y = pos.coords.latitude;
//     console.log(x, 'x');
//     console.log(y, 'y');
//     if (x && y) {
//       await axios
//         .get(
//           `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${x}&y=${y}`,
//           // `https://dapi.kakao.com/v2/local/geo/coord2address.json?input_coord=WGS84&x=${x}&y=${y}`,
//           {
//             headers: {
//               // Authorization: `KakaoAK 1df8e00ba19cbaf3ed39000226e2e4c8`,
//               Authorization: `KakaoAK ${import.meta.env.VITE_APP_KAKAO_JAVASCRIPT_KEY}`,
//             },
//           },
//         )
//         .then((result) => {
//           if (
//             result &&
//             result.data &&
//             result.data.documents &&
//             result.data.documents.length > 0
//           ) {
//             //법정동 기준으로 동단위의 값을 가져온다
//             const location = result.data.documents[0].address_name;
//             setAddress(location);
//             console.log(result);
//             console.log('location: ', location);
//             console.log('address: ', address);
//           } else {
//             console.error('유효한 응답 데이터가 없습니다.');
//           }
//         })
//         .catch((error) => {
//           console.error('카카오지도 API 호출 중 오류 발생:', error);
//         });
//     }
//   };

//   // const handleResultClick = (selectedAddress) => {
//   //   setAddress(selectedAddress);
//   //   setResults([]);
//   // };
//   const getMainBtn = () => {
//     navigate('/');
//   };
//   const geolocationMutation = useMutation({
//     mutationFn: geolocation,
//     onSuccess: (res) => {
//       console.log('res', res);
//     },
//     onError: (error) => {
//       console.log('error', error);
//     },
//   });

//   return (
//     <>
//       <Wrapper>
//         <MenuBox>
//           <span>내 위치 인증</span>
//         </MenuBox>
//         <PaddingBox>
//           <Ao>
//             <Map id="map"></Map>
//           </Ao>
//           <MSG>현재 위치에 있는 동네는 아래와 같나요?</MSG>
//           <Address>{address}</Address>
//           {/* <button onClick={getCurrentPosBtn}>
//             <IMG src={locationButton} alt="위치인증하기" />
//           </button>
//           {address && <button onClick={getMainBtn}><IMG2 src={locationButton} alt="설정완료" /></button>} */}
//           {/* <button onClick={getCurrentPosBtn}>
//             <IMG src={locationButton} alt="위치인증하기" />
//           </button>
//           {address && (
//             <button onClick={getMainBtn}>
//               <IMG2 src={locationButton} alt="설정완료" />
//             </button>
//           )} */}
//           {/* <Box> */}
//           {/* <button onClick={getCurrentPosBtn}> */}
//           <div style={{ width: '320px', position: 'relative', top: '330px' }}>
//             <IMG onClick={getCurrentPosBtn} $active={address}>
//               위치설정하기
//             </IMG>
//             {address && (
//               <IMG onClick={getCurrentPosBtn} $active={address}>
//                 위치 다시 설정하기
//               </IMG>
//             )}
//             {/* </button> */}
//             {address && (
//               // <button onClick={getMainBtn}>
//               <IMG2 onClick={getMainBtn} $active={address}>
//                 설정 완료
//               </IMG2>

//               // </button>
//             )}
//           </div>
//           {/* <button onClick={getCurrentPosBtn}>
//             <IMG src={locationButton} alt="위치인증하기" address={address} />
//           </button>
//           {address && (
//             <button onClick={getMainBtn}>
//               <IMG2 src={locationButton} alt="설정완료" address={address} />
//             </button>
//           )} */}
//           {/* </Box> */}
//         </PaddingBox>
//       </Wrapper>
//     </>
//   );
// }

// const Wrapper = styled.div`
//   height: 100%;
//   background-color: #ffffff;
//   @media screen and (max-width: 430px) {
//   }
// `;

// const MenuBox = styled.div`
//   position: absolute;
//   width: 430px;
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   background-color: #ffffff;
//   height: 60px;
//   align-items: center;
//   box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.1);
//   z-index: 5;
//   > span {
//     width: 100px;
//     margin-top: 32px;
//     height: 17px;
//     font-family: 'Pretendard';
//     font-style: normal;
//     font-weight: 400;
//     font-size: 14.1085px;
//     line-height: 17px;
//     text-align: center;
//     color: #000000;
//     @media screen and (max-width: 430px) {
//       height: 60px;
//       > span {
//         width: 100px;
//       }
//     }
//   }
// `;
// // const Box = styled.div`
// //   @media screen and (max-width: 430px) {
// //   }
// // `;

// // const IMG = styled.img`;
// //   @media screen and (max-width: 430px) {
// //     position: absolute;
// //     width: 350px;
// //     height: 52px;
// //     left: calc(50% - 350px / 2 + 0.49px);
// //     top: 758px;
// //   }
// // `;
// // const IMG2 = styled.img`
// //   @media screen and (max-width: 430px) {
// //     position: absolute;
// //     width: 350px;
// //     height: 52px;
// //     left: calc(50% - 350px / 2 + 0.49px);
// //     top: 700px;
// //   }
// // `;
// // const IMG = styled.img`
// //   @media screen and (max-width: 430px) {
// //     position: absolute;
// //     width: 350px;
// //     height: 52px;
// //     left: calc(50% - 350px / 2 + 0.49px);
// //     top: 758px;
// //   }
// // `;
// // const IMG2 = styled.img`
// //   @media screen and (max-width: 430px) {
// //     position: absolute;
// //     width: 350px;
// //     height: 52px;
// //     left: calc(50% - 350px / 2 + 0.49px);
// //     top: 700px;
// //   }
// // `;

// const IMG = styled.button<{ $active: string }>(
//   ({ $active }) => css`
//     position: absolute;
//     width: 320px;
//     height: 52px;
//     z-index: 100;
//     bottom: ${$active ? '88px' : '40px'}; /* 조건부 위치 설정 */
//     background-color: ${$active ? '#D1D1D1' : '#1689F3'}; /* 조건부 위치 설정 */
//     @media screen and (max-width: 430px) {
//     }
//   `,
// );

// const IMG2 = styled.button<{ $active: string }>(
//   ({ $active }) => css`
//     position: absolute;
//     width: 320px;
//     height: 52px;
//     z-index: 100;
//     bottom: ${$active ? '20px' : '88px'}; /* 조건부 위치 설정 */
//     @media screen and (max-width: 430px) {
//     }
//   `,
// );

// // const IMG = styled.img.attrs(props => ({
// //   style: {
// //     top: props.address ? '758px' : '700px',
// //   },
// // }))`
// //   @media screen and (max-width: 430px) {
// //     position: absolute;
// //     width: 350px;
// //     height: 52px;
// //     left: calc(50% - 350px / 2 + 0.49px);
// //     /* top 속성은 여기서 직접 설정하지 않습니다 */
// //   }
// // `;
// /* Frame 1524 */

// /* Auto layout */

// // const IMG2 = styled.img.attrs(props => ({
// //   style: {
// //     top: props.address ? '700px' : '758px',
// //   },
// // }))`
// //   @media screen and (max-width: 430px) {
// //     position: absolute;
// //     width: 350px;
// //     height: 52px;
// //     left: calc(50% - 350px / 2 + 0.49px);
// //     /* top 속성은 여기서 직접 설정하지 않습니다 */
// //   }
// // `;
// const PaddingBox = styled.div`
//   width: 100%;
//   display: flex;
//   flex-direction: column;
//   justify-content: flex-end;
//   align-items: center;
//   @media screen and (max-width: 430px) {
//     /* box-shadow: inset 0 -5px 5px -5px #333; */
//   }
// `;

// const Ao = styled.div`
//   box-shadow: inset 0 5px 5px -5px #333;
//   /* z-index: 1; */
//   width: 100%;
//   height: 463px;
//   @media screen and (max-width: 430px) {
//   }
// `;

// const Map = styled.div`
//   position: absolute;
//   top: 60px;
//   width: 430px;
//   height: 463px;
//   @media screen and (max-width: 430px) {
//   }
// `;

// const MSG = styled.div`
// position: absolute;
// width: 280px;
// height: 17px;
// font-family: 'Pretendard';
// font-style: normal;
// font-weight: 400;
// font-size: 14px;
// line-height: 17px;
// /* identical to box height */
// text-align: center;
// color: #000000;
// z-index: 100;
// bottom: 250.26px;
//   @media screen and (max-width: 430px) {
//   }
// `;

// const Address = styled.div`
// position: absolute;
// width: 300px;
// height: 26px;
// font-family: 'Pretendard';
// font-style: normal;
// font-weight: 600;
// font-size: 22px;
// line-height: 26px;
// text-align: center;
// color: #000000;
// z-index: 100;
// bottom: 205.4px;
//   @media screen and (max-width: 430px) {
//   }
// `;
