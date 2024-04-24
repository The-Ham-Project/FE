import { useEffect, useState } from 'react';
import axios from 'axios';
import { useMutation, useQuery, QueryClient } from '@tanstack/react-query';
// import { injectMutation } from '@tanstack/angular-query-experimental'
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

const queryClient = new QueryClient();

export default function Location(): JSX.Element {
  const navigate = useNavigate();
  // const handleBackClick = () => navigate(-2);
  const [map, setMap] = useState<any>(null);
  const [pin, setPin] = useState();
  const [address, setAddress] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태를 관리하는 상태 변수
  const [isShowingNewAddress, setIsShowingNewAddress] = useState(false);
  const [marker, setMarker] = useState<any>(null);
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
    setIsLoading(true); // API 요청 전 로딩 상태를 true로 변경
    if (marker) {
      marker.setMap(null);
      // circle.setMap(null);
      // setMarker(map);
      marker.setPosition(null);
    }
    navigator.geolocation.getCurrentPosition(
      getPosSuccess,
      () => {
        setIsLoading(false); // 위치 정보 가져오기 실패 시 로딩 상태를 false로 변경
        alert('위치 정보 가져오기 실패');
      },
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

    // 이전 마커가 있다면 삭제
    if (marker) {
      marker.setMap(null);
    }

    // 새로운 마커 생성 및 위치 설정
    // const newMarker = new window.kakao.maps.Marker({
    //   position: currentPos,
    // });
    // newMarker.setMap(map);

    // 마커 상태 업데이트
    circle.setMap(map);
    marker.setMap(map);
    setIsLoading(false); // API 요청 후 로딩 상태를 false로 변경

    const geocoder = new window.kakao.maps.services.Geocoder();
    // 지도에 클릭 이벤트를 등록합니다
    // 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
    window.kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
      // // 클릭한 위도, 경도 정보를 가져옵니다
      const latlng = mouseEvent.latLng;
      // 이전 마커가 있다면 삭제
      if (marker) {
        marker.setMap(null);
        marker.setPosition(null);
      }

      // 새로운 마커 생성 및 위치 설정
      // const newMarker = new window.kakao.maps.Marker({
      //   position: latlng,
      // });
      // newMarker.setMap(map);

      // 마커 상태 업데이트
      // setMarker(newMarker);
      // // 마커 위치를 클릭한 위치로 옮깁니다
      // marker.setPosition(latlng);
      // circle.setPosition(latlng);

      // let message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
      // message += '경도는 ' + latlng.getLng() + ' 입니다';
      // console.log(message);
      // console.log('위도', latlng.getLat());
      // console.log('경도는', latlng.getLng());

      // const resultDiv = document.getElementById('clickLatlng');
      // resultDiv.innerHTML = message;

      searchDetailAddrFromCoords(mouseEvent.latLng, function (result, status) {
        if (status === window.kakao.maps.services.Status.OK) {
          let detailAddr = result[0].road_address
            ? '<div>도로명주소 : ' +
              result[0].road_address.address_name +
              '</div>'
            : '';
          detailAddr +=
            '<div>지번 주소 : ' + result[0].address.address_name + '</div>';

          const content =
            '<div class="bAddr">' +
            '<span class="title">법정동 주소정보</span>' +
            detailAddr +
            '</div>';
          console.log(content);
          console.log(result[0].address.address_name);
          const new_address = result[0].address.address_name;
          setNewAddress(new_address);
          if (marker) {
            marker.setMap(null);
            marker.setPosition(null);
          }

          // 마커를 클릭한 위치에 표시합니다
          marker.setPosition(mouseEvent.latLng);
          circle.setPosition(mouseEvent.latLng);
          marker.setMap(map);
          setMarker(marker);

          // // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
          // infowindow.setContent(content);
          // infowindow.open(map, marker);
        }
        geolocationMutation.mutate({
          lon: latlng.getLng(),
          lat: latlng.getLat(),
        });
      });
    });

    // // 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다
    // window.kakao.maps.event.addListener(map, 'idle', function () {
    //   searchAddrFromCoords(map.getCenter(), displayCenterInfo);
    // });

    // function searchAddrFromCoords(coords, callback) {
    //   // 좌표로 행정동 주소 정보를 요청합니다
    //   geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
    // }

    function searchDetailAddrFromCoords(coords, callback) {
      // 좌표로 법정동 상세 주소 정보를 요청합니다
      geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
    }

    navigator.geolocation.getCurrentPosition((pos) => {
      alterAddress(pos);
    });
    // geolocationMutation.mutate({
    //   lon: latlng.getLat(),
    //   lat: latlng.getLng(),
    // });
  };

  // const new_alterAddress = async (latlng) => {
  //   try  {
  //     const data = {
  //       lat: latlng.getLat(),
  //       lon: latlng.getLng(),
  //     }
  //   }
  // }

  // geolocationMutation.mutate({
  //   lon: latlng.getLat(),,
  //   lat: latlng.getLng(),
  // });

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
            setNewAddress(location);
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
  const getMainBtn = (mouseEvent) => {
    navigate('/splash');
    const latlng = mouseEvent.latLng;
    geolocationMutation.mutate({
      lon: latlng.getLng(),
      lat: latlng.getLat(),
    });
  };
  // const toggleNewAddress = () => {
  //   setIsShowingNewAddress(!isShowingNewAddress);
  // };
  const geolocationMutation = useMutation({
    mutationKey: ['location'],
    mutationFn: geolocation,
    onSuccess: (res) => {
      console.log('res', res);
      queryClient.invalidateQueries({ queryKey: ['location'] });
    },
    // onError: (error) => {
    //   console.log('error', error);
    // },
    onMutate: async (newLocation) => {
      // optimistic update 한 것이 덮어써지지 않도록 호출한 쿼리를 취소합니다.
      await queryClient.cancelQueries({ queryKey: ['location'] });

      // 에러 발생시 복원을 위해 기존 데이터를 저장합니다.
      const previousLocation = queryClient.getQueryData(['location']);

      // 예상되는 변경 값으로 쿼리를 업데이트 합니다.
      // queryClient.setQueryData(['location'], (prev) => [...prev, newLocation]);

      console.log(previousLocation);
      console.log(newLocation);
      // setAddress(newLocation);

      // 복원을 위한 기존 데이터를 반환합니다.
      return { previousLocation };
    },
    // mutate에 에러가 발생하면 실행됩니다.
    onError: (err, newLocation, context) => {
      // context를 통해 기존 값으로 쿼리를 업데이트 합니다.
      queryClient.setQueryData(['location'], context.previousLocation);
    },
    // mutate가 끝나면(성공, 실패 모두) 호출됩니다.
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['location'] });
    },
  });
  // const { data, isLoading, isError, refetch } = useQuery({
  //   queryKey: ['location'],
  //   queryFn: () => geolocation(CurrentPos),
  // });

  return (
    <>
      <Wrapper>
        <MenuBox>
          <span>내 위치 인증</span>
        </MenuBox>
        <PaddingBox>
          {isLoading && (
            <>
              <LoadingMap
                // style={{
                //   position: 'absolute',
                //   zIndex: '88888',
                //   backgroundColor: 'rgba(225, 225, 225, 0.5)',
                // }}
                id="map"
              >
                <LoadingContainer
                  style={{
                    width: '430px',
                    height: '463px',
                    position: 'absolute',
                    zIndex: '888888',
                    backgroundColor: 'rgba(225, 225, 225, 0.5)',
                  }}
                >
                  <LoadingMSG>로딩중입니다. 잠시만 기다려주세요!</LoadingMSG>
                </LoadingContainer>
              </LoadingMap>
            </>
          )}
          <Ao>
            <Map id="map"></Map>
          </Ao>
          <MSG1>현재 위치에 있는 동네는 아래와 같나요?</MSG1>
          <MSG2>
            내 위치를 수정하고 싶다면 해당 위치로 지도를 터치해주세요!
          </MSG2>
          {
            // isShowingNewAddress &&
            address && newAddress && <NewAddress>{newAddress}</NewAddress>
          }
          {
            // !isShowingNewAddress &&
            address && !newAddress && <Address>{address}</Address>
          }
          {/* {isShowingNewAddress ? (
        <NewAddress>{newAddress}</NewAddress>
      ) : (
        <Address>{address}</Address>
      )} */}
          <div style={{ width: '320px', marginBottom: '34px' }}>
            <IMG onClick={getCurrentPosBtn} $active={address}>
              위치설정하기
            </IMG>
            {(address || newAddress) && (
              <IMG onClick={getCurrentPosBtn} $active={address}>
                자동으로 위치 다시 설정하기
              </IMG>
            )}
            {/* </button> */}
            {(address || newAddress) && (
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
    overflow: scroll;
  }
`;

const MenuBox = styled.div`
  display: flex;
  position: relative;
  background-color: #f5f5f5;
  height: 60px;
  width: 100%;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.1);
  z-index: 888888;
  > span {
    display: flex;
    justify-content: center;
    width: 100%;
  }
  /* position: absolute;
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
    color: #000000; */
  @media screen and (max-width: 430px) {
    height: 60px;
    > span {
      width: 100px;
    }
  }
  /* } */
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
    bottom: ${$active ? '113px' : '40px'}; /* 조건부 위치 설정 */
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
    bottom: ${$active ? '40px' : '113px'}; /* 조건부 위치 설정 */
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
const LoadingMSG = styled.div`
  width: 340px;
  height: 24px;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 0.0015em;
  text-transform: uppercase;
  color: #282828;
  @media screen and (max-width: 430px) {
  }
`;
const LoadingContainer = styled.div`
  width: 285px;
  height: 24px;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 0.0015em;
  text-transform: uppercase;
  background-color: rgba(225, 225, 225, 0.5);
  color: #282828;
  flex: none;
  order: 1;
  flex-grow: 0;
  z-index: 5000000;
  padding: 50% 18%;

  /* display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 0.0015em;
  text-transform: uppercase;
  color: #282828;
  order: 1;
  flex-grow: 0;
  z-index: 5000000; */
  @media screen and (max-width: 430px) {
  }
`;

const Ao = styled.div`
  box-shadow: inset 0 5px 5px -5px #333;
  /* z-index: 1; */
  width: 100%;
  height: 463px;
  display: contents;
  @media screen and (max-width: 430px) {
  }
`;

const LoadingMap = styled.div`
  position: absolute;
  top: 60px;
  width: 430px;
  height: 463px;
  @media screen and (max-width: 390px) {
    width: 390px;
    height: 320px;
  }
`;
const Map = styled.div`
  position: absolute;
  top: 60px;
  width: 430px;
  height: 463px;
  @media screen and (max-width: 390px) {
    width: 390px;
    height: 320px;
  }
`;

const MSG1 = styled.div`
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
  bottom: 278.26px;
  @media screen and (max-width: 430px) {
    bottom: 258.26px;
  }
`;
const MSG2 = styled.div`
  position: absolute;
  width: 340px;
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
  bottom: 257.26px;
  @media screen and (max-width: 430px) {
    bottom: 237.26px;
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
    bottom: 190.4px;
  }
`;
const NewAddress = styled.div`
  position: absolute;
  width: 340px;
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
    bottom: 190.4px;
  }
`;
