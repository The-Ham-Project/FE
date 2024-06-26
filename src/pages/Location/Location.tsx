import { useEffect, useState } from 'react';
import axios from 'axios';
import { useMutation, QueryClient } from '@tanstack/react-query';
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

  const [map, setMap] = useState(null); // Map 객체
  const [marker, setMarker] = useState(null); // Marker 객체
  const [currentLatLng, setCurrentLatLng] = useState(null);
  const [circle, setCircle] = useState(null);
  const [address, setAddress] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태를 관리하는 상태 변수

  // 2. 현재 위치
  const getCurrentPosBtn = () => {
    setIsLoading(true); // API 요청 전 로딩 상태를 true로 변경
    console.log('getCurrentPosBtn', marker);
    navigator.geolocation.getCurrentPosition(
      getPosSuccess,
      () => {
        setIsLoading(false); // 위치 정보 가져오기 실패 시 로딩 상태를 false로 변경
        alert(
          `위치 정보 가져오기 실패하였습니다.
설정에서 사용하시는 브라우저의 위치정보 허용 상태인지 확인해주세요!
설정을 허용하셨다면 새로고침 후 이용해주세요.`,
        );
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
    console.log('getPosSuccess', pos);
    // 현재 위치의 위도, 경도
    const currentPos = new window.kakao.maps.LatLng(
      pos.coords.latitude, // 위도
      pos.coords.longitude, // 경도
    );

    geolocationMutation.mutate({
      lon: currentPos.La,
      lat: currentPos.Ma,
    });

    // 위치 정보 가져오기 성공 시 주소 변환 함수 호출
    alterAddress(pos);

    // 지도를 현재 위치로 이동
    map.panTo(currentPos);

    // 마커를 생성합니다
    marker.setMap(map);
    marker.setPosition(currentPos);
    circle.setMap(map);
    circle.setPosition(currentPos);

    setIsLoading(false); // API 요청 후 로딩 상태를 false로 변경
  };

  /* 카카오지도 API로 현재 유저 좌표를 동단위로 변환 */
  const alterAddress = async (pos: GeolocationPosition) => {
    const x = pos.coords.longitude;
    const y = pos.coords.latitude;
    if (x && y) {
      await axios
        .get(
          `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${x}&y=${y}`,
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
          } else {
            console.error('유효한 응답 데이터가 없습니다.');
          }
        })
        .catch((error) => {
          console.error('카카오지도 API 호출 중 오류 발생:', error);
        });
    }
  };

  const getMainBtn = (mouseEvent) => {
    navigate('/');
    const latlng = mouseEvent.latLng;
    geolocationMutation.mutate({
      lon: latlng.getLng(),
      lat: latlng.getLat(),
    });
  };

  const geolocationMutation = useMutation({
    mutationKey: ['location'],
    mutationFn: geolocation,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['location'] });
    },

    onMutate: async (newLocation) => {
      // optimistic update 한 것이 덮어써지지 않도록 호출한 쿼리를 취소합니다.
      await queryClient.cancelQueries({ queryKey: ['location'] });

      // 에러 발생시 복원을 위해 기존 데이터를 저장합니다.
      const previousLocation = queryClient.getQueryData(['location']);

      // 예상되는 변경 값으로 쿼리를 업데이트 합니다.
      // queryClient.setQueryData(['location'], (prev) => [...prev, newLocation]);

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

  function searchDetailAddrFromCoords(coords, callback) {
    // 좌표로 법정동 상세 주소 정보를 요청합니다
    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
  }

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
          setMap(new window.kakao.maps.Map(container, options));
          setMarker(new window.kakao.maps.Marker());
          setCircle(
            new window.kakao.maps.Circle({
              center: currentLatLng,
              radius: 8000,
              strokeWeight: 1,
              strokeColor: 'rgb(22,137,243)',
              strokeOpacity: 0.5,
              fillColor: 'rgb(0,26,255)',
              fillOpacity: 0.05,
            }),
          );
        });
      };
    })();
  }, []);

  useEffect(() => {
    if (map) {
      window.kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
        // 클릭한 위도, 경도 정보를 가져옵니다
        const latlng = mouseEvent.latLng;

        geolocationMutation.mutate({
          lon: latlng.La,
          lat: latlng.Ma,
        });

        // 이전 마커가 있다면 삭제
        if (marker) {
          marker.setMap(null);
          marker.setPosition(null);
        }
        if (circle) {
          circle.setMap(null);
          circle.setPosition(null);
        }

        searchDetailAddrFromCoords(
          mouseEvent.latLng,
          function (result, status) {
            if (status === window.kakao.maps.services.Status.OK) {
              const new_address = result[0].address.address_name;
              setNewAddress(new_address);
              setCurrentLatLng(latlng);
            }
          },
        );
      });
    }
  }, [map]);

  useEffect(() => {
    if (currentLatLng) {
      marker.setPosition(currentLatLng);
      marker.setMap(map);
      circle.setPosition(currentLatLng);
      circle.setMap(map);
    }
  }, [currentLatLng, map, marker, circle]);

  return (
    <>
      <Wrapper>
        <MenuBox>
          <span>내 위치 인증</span>
        </MenuBox>
        <PaddingBox>
          {isLoading && (
            <>
              <LoadingMap id="map">
                <LoadingContainer>
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
          {address && newAddress && <NewAddress>{newAddress}</NewAddress>}
          {address && !newAddress && <Address>{address}</Address>}
          <div style={{ width: '320px', marginBottom: '34px' }}>
            <IMG onClick={getCurrentPosBtn} $active={address}>
              먼저 여기를 눌러 위치설정해주세요!
            </IMG>
            {(address || newAddress) && (
              <IMG onClick={getCurrentPosBtn} $active={address}>
                자동으로 위치 다시 설정하기
              </IMG>
            )}
            {(address || newAddress) && (
              <IMG2 onClick={getMainBtn} $active={address}>
                설정 완료
              </IMG2>
            )}
          </div>
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
  background-color: #ffffff;
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
  @media screen and (max-width: 430px) {
    height: 60px;
    > span {
      width: 100px;
    }
  }
`;

const IMG = styled.button<{ $active: string }>(
  ({ $active }) => css`
    position: absolute;
    width: 320px;
    height: 52px;
    z-index: 100;
    bottom: ${$active ? '111px' : '34px'}; /* 조건부 위치 설정 */
    background-color: ${$active ? '#f5f5f5' : '#1689F3'}; /* 조건부 위치 설정 */
    color: ${$active ? 'grey' : '#ffffff'}; /* 조건부 위치 설정 */
    @media screen and (max-width: 430px) {
      bottom: ${$active ? '93px' : '20px'}; /* 조건부 위치 설정 */
    }
  `,
);

const IMG2 = styled.button<{ $active: string }>(
  ({ $active }) => css`
    position: absolute;
    width: 320px;
    height: 52px;
    z-index: 100;
    bottom: ${$active ? '34px' : '111px'}; /* 조건부 위치 설정 */
    @media screen and (max-width: 430px) {
      bottom: ${$active ? '20px' : '93px'}; /* 조건부 위치 설정 */
    }
  `,
);

const PaddingBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  @media screen and (max-width: 390px) {
    width: 390px;
    height: 320px;
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
  width: 430px;
  height: 433px;
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
  z-index: 888888;
  padding: 50% 18%;
  position: absolute;
  /* width: '430px'; */
  /* height: '433px%',
                    position: 'absolute',
                    zIndex: '888888',
                    backgroundColor: 'rgba(225, 225, 225, 0.5)', */
  @media screen and (max-width: 430px) {
    width: 390px;
    /* height: 320px; */
    height: 100%;
    padding: 40% 18%;
  }
`;

const Ao = styled.div`
  box-shadow: inset 0 5px 5px -5px #333;
  width: 100%;
  height: 463px;
  display: contents;
  @media screen and (max-width: 390px) {
    width: 390px;
    height: 320px;
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
  height: 433px;
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
  text-align: center;
  color: #000000;
  z-index: 100;
  bottom: 272.26px;
  @media screen and (max-width: 430px) {
    bottom: 252.26px;
  }
`;
const MSG2 = styled.div`
  position: absolute;
  width: 430px;
  height: 17px;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  color: #000000;
  z-index: 100;
  bottom: 251.26px;
  @media screen and (max-width: 430px) {
    bottom: 231.26px;
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
  bottom: 205.84px;
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
  z-index: 10000000;
  bottom: 205.84px;
  @media screen and (max-width: 430px) {
    bottom: 190.4px;
  }
`;
