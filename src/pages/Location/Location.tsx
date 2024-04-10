import { useEffect, useState } from 'react';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { geolocation } from '../../api/geolocation';
import styled from 'styled-components';
import locationButton from '../../../public/assets/locationButton.svg';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';

declare global {
  interface Window {
    kakao: any;
  }
}

declare const window: typeof globalThis & {
  kakao: any;
};

export default function Location(): JSX.Element {
  const navigate = useNavigate();
  const handleBackClick = () => navigate(-2);
  const [map, setMap] = useState<any>(null);
  const [address, setAddress] = useState('');
  // const [results, setResults] = useState([]);
  // const [currentPosState, setCurrentPosState] = useState();

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
          level: 7, //지도의 레벨(확대, 축소 정도)
        };

        setMap(new window.kakao.maps.Map(container, options));
      });
    };
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
          <IoIosArrowBack onClick={handleBackClick} size={'24px'} />
        </MenuBox>
        <PaddingBox>
          <Ao>
            <Map id="map"></Map>
          </Ao>
          <MSG>현재 위치에 있는 동네는 아래와 같나요?</MSG>
          <Address>{address}</Address>
          <button onClick={getCurrentPosBtn}>
            <IMG src={locationButton} alt="위치인증하기" />
          </button>
        </PaddingBox>
      </Wrapper>
    </>
  );
}

// return (
//   <>
//     <Button onClick={kakao}>
//       <IMG src={startwithkakao} alt="카카오 로그인 버튼" />
//     </Button>
//   </>
// );
const Wrapper = styled.div`
  @media screen and (max-width: 430px) {
  }
`;

const MenuBox = styled.div`
  @media screen and (max-width: 430px) {
    display: flex;
    flex-direction: row;
    background-color: #f5f5f5;
    height: 60px;
    width: 100%;
    margin: 0px;
    padding: 0 20px;
    align-items: center;
  }
`;

const IMG = styled.img`
  @media screen and (max-width: 430px) {
    position: absolute;
    width: 350px;
    height: 52px;
    left: calc(50% - 350px / 2 + 0.49px);
    top: 758px;
  }
`;

const PaddingBox = styled.div`
  @media screen and (max-width: 430px) {
    /* box-shadow: inset 0 -5px 5px -5px #333; */
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 10000;
  }
`;

const Ao = styled.div`
  @media screen and (max-width: 430px) {
    box-shadow: inset 0 5px 5px -5px #333;
    position: absolute;
    width: 100%;
    height: 463px;
    left: 0px;
    top: 60px;
  }
`;

const Map = styled.div`
  @media screen and (max-width: 430px) {
    position: absolute;
    width: 100%;
    height: 463px;
    left: 0px;
    top: 4px;
  }
`;

const MSG = styled.div`
  @media screen and (max-width: 430px) {
    /* 현재 위치에 있는 동네는 아래와 같아요. */

    position: absolute;
    width: 230px;
    height: 17px;
    left: calc(50% - 230px / 2 - 0.5px);
    top: 576.74px;
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    /* identical to box height */
    text-align: center;
    color: #000000;
    transform: matrix(1, -0.02, 0.01, 1, 0, 0);
  }
`;

const Address = styled.div`
  @media screen and (max-width: 430px) {
    position: absolute;
    width: 250px;
    height: 26px;
    left: calc(50% - 250px / 2 - 0.5px);
    top: 612.16px;
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 600;
    font-size: 22px;
    line-height: 26px;
    text-align: center;
    color: #000000;

    transform: matrix(1, -0.02, 0.01, 1, 0, 0);
  }
`;
