# 더함(Theham)

![더함](https://github.com/The-Ham-Project/BE/assets/150704638/d1b03e86-d633-436b-89e3-440a0f2c88f7)

> 더함에서 필요한 물건들 함께 쓰고 나눠봐요 !

- 함께 쓰고 나누어 경제적 부담을 줄이고 사람들 간의 소통과 마음의 따뜻함을 증진시키는 동네 쉐어 서비스입니다.
- 1인 가구의 온라인 연결, 상호 지원의 기회를 마련해주고 우산부터 주거 물품까지 다양한 서비스를 제공해주는 공유 플랫폼입니다.
- [바로가기](https://www.theham.me/)

## 📆 프로젝트 기간

- 2024/03/26 ~ 2024/05/07

## 📚 기술 스택

- React-Query(tanstack)
- Zustand 
- Styled-Component
- Axios
- Vite
- KAKAO API
- react-infinite-scroll-component -react-query
- sockjs & Stompjs

## 💡 주요 기능

<details>
<summary>소셜 로그인</summary>
<img width="1680" alt="스크린샷 2024-05-02 오전 11 08 57" src="https://github.com/The-Ham-Project/BE/assets/150704638/6a15ce73-8676-45f4-8061-8b21beeaab44">

- OAuth2.0을 통해 회원가입 및 로그인 프로세스를 간소화했습니다.

</details>

<details>
<summary>사용자 위치 설정</summary>
<img width="1680" alt="스크린샷 2024-05-02 오전 11 09 45" src="https://github.com/The-Ham-Project/BE/assets/150704638/8da8371f-e195-4c16-9f9e-6b4678ca660f">

- 카카오 지도 API를 이용하여 사용자의 현재 위치를 설정할 수 있습니다.

</details>

<details>
<summary>함께쓰기 등록</summary>
<img width="1680" alt="스크린샷 2024-05-02 오전 11 11 28" src="https://github.com/The-Ham-Project/BE/assets/150704638/8a516eab-353a-4dc3-954c-5970a1dc673f">

- 이미지를 최대 3장까지 올릴 수 있습니다.
- 나머지 정보들을 모두 입력하여 게시글을 등록할 수 있습니다.

</details>

<details>
<summary>함께쓰기 조회</summary>
<img width="1680" alt="스크린샷 2024-05-02 오전 11 10 18" src="https://github.com/The-Ham-Project/BE/assets/150704638/382fe1b0-2bb9-4f62-9580-18dcf6b72d3f">
<img width="1680" alt="스크린샷 2024-05-02 오전 11 11 03" src="https://github.com/The-Ham-Project/BE/assets/150704638/adfda370-3d42-411a-ab24-38602299bd29">

- 로그인시 사용자 위치 반경 4KM 이내의 게시글만 조회됩니다.
- 비로그인시 최신순으로 게시글이 조회됩니다.

</details>

<details>
<summary>함께쓰기 검색</summary>
<img width="1680" alt="스크린샷 2024-05-02 오전 11 11 50" src="https://github.com/The-Ham-Project/BE/assets/150704638/3a366f56-c119-4c62-a155-c6cbef99b1bd">

- 함께쓰기 게시글 제목 또는 내용에 포함된 키워드를 검색할 수 있습니다.

</details>

<details>
<summary>함께쓰기 좋아요</summary>
<img width="1680" alt="스크린샷 2024-05-02 오전 11 23 57" src="https://github.com/The-Ham-Project/BE/assets/150704638/7f390fba-3326-454a-8a9a-1dc3f3dc6c4c">

- 함께쓰기 게시글에 좋아요를 누를 수 있습니다.

</details>

<details>
<summary>함께쓰기 채팅</summary>
<img width="1680" alt="스크린샷 2024-05-02 오전 11 12 50" src="https://github.com/The-Ham-Project/BE/assets/150704638/d1172a6c-82a1-436d-bc09-60e5936c80f6">
<img width="1680" alt="스크린샷 2024-05-02 오전 11 12 42" src="https://github.com/The-Ham-Project/BE/assets/150704638/899901ee-e604-4037-bc9f-d21725bf527d">

- 함께쓰기 게시글을 작성한 이용자와 1대1 채팅을 할 수 있습니다.

</details>

## 🏗️ 서비스 아키텍처

![아키텍처](https://github.com/The-Ham-Project/BE/assets/150704638/61628531-2a1b-4206-9477-14c856a457ee)


## 🤔 기술적 의사결정

| 기술                             | 설명                                                                                                                                                                   |
|--------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `React-Query(tanstack)`        | Client 측의 데이터가 아닌 서버쪽 데이터 관리를 더 원활하게 하기위해 사용하였고 API 호출을 간편하게 관리할 수 있어서 비동기 데이터를 다루는데 효율적이며, 캐시 및 자동 재요청과 같은 기능을 제공하여 상태 관리를 단순화할 수 있으며 TypeScript 지원과 강력한 문서화로 개발 생산성을 높일 수 있어서 결정                                                                |
| `Styled-Component`                | 보일러 플레이트 코드가 적어 직관적이고 효율적인 코드를 작성하여 주요 로직에 집중 가능하고 우리 프로젝트 규모에 적합한 전역상태관리 라이브러리라고 생각하였으며 컴포넌트 트리에서 필요한 상태만 가져와 사용할 수 있도록 구성 가능하므로 필요한 상태의 변경이 발생했을 때 해당 컴포넌트만 리렌더링되도록 최적화 가능                                                                           |
| `Styled-Component`                     | - 컴포넌트의 props를 참조할 수 있으며, props의 값에 따라 동적 스타일을 적용할 수 있음. - className을 일일이 설정하지 않고 사용이 가능 - 스스로 className을 생성하기 때문에 className의 중복이나 오타로 인한 버그를 줄여줌. - 컴포넌트 단위로 관리할 수 있게 해주어 코드의 모듈화와 재사용성을 높일 수 있음. - JavaScript를 활용하여 동적으로 스타일을 조작 가능|
| `Axios`              | - Promise 기반의 API 호출을 쉽게 할수 있고, 인터셉터와 같은 기능 제공이나 직관적인 사용법 - fetch에 비해 직관적으로 사용할 수 있고, 에러 핸들링 및 중간 요청 수정과 같은 작업을 수행하기 위해 코드를 추가적으로 작성하지 않아도 됨. - axios는 대부분의 프로젝트에서 편리하게 사용할 수 있는 라이브러리로 널리 사용되고, 간단한 REST API 호출과 에러 핸들링에 용이|
| `Vite` |  ESbuild를 기반으로 한 프론트엔드 빌드툴로서 ES 모듈을 사용하여 자바스크립트의 코드를 모두 번들하지 않고 브라우저가 필요로 하는 애플리케이션 코드의 일부분만 변환하여 작동시켜 CRA에 비해 빠른 속도 |
| `KAKAO API`                        | Kakao Maps API의 geolocation을 이용해 GPS 기능으로 사용자의 현재 위치를 표시                                                                                            |
| `react-infinite-scroll-component   -react-query`                   | react-query로 데이터 통신을 하고 react-infinite-scroll-component 라이브러리를 이용한 스크롤 구현                                        |

## 🔥 트러블 슈팅

<details>
<summary>지도 영역 표시</summary>

`문제사항`

- 처음에는 정상적으로 작동하는것처럼(첫화면에서 위치설정하기 버튼을 누르고 난 후 지도 위의 다른 지역을 클릭했다가 하단의 회색버튼을 클릭하면 정상적으로 마커가 하나만 찍힌다.) 보이지만 이내 다시 2개가 찍히고 회색버튼을 연타하면 마커와 원이 모두 진해지는 현상이 일어났다.
 ![image](https://github.com/The-Ham-Project/FE/assets/145915197/a5e14840-fd61-466a-8f8c-ecd50721f91a)
 ![image](https://github.com/The-Ham-Project/FE/assets/145915197/f4ce3816-25ce-4668-8642-21f25003de0d)
 ![image](https://github.com/The-Ham-Project/FE/assets/145915197/2d927c13-70f1-4667-bac1-16fdf86c1fa9)
 ![image](https://github.com/The-Ham-Project/FE/assets/145915197/462b53bc-eccb-4f77-b6ed-f03dcf215ce0)
 ![image](https://github.com/The-Ham-Project/FE/assets/145915197/05f27f1e-812b-4ec4-9f48-2d7d4a4c355a)






`해결시도`

- 생성된 마커를 저장해서 관리하는 부분이 없는 것 같다고 생각했다. 그래서 마커를 생성하고 지도를 클릭하면 지도 클릭 이벤트로 마커 위치를 변경하고 다시 위치 설정하는 버튼을 눌러서 마커를 생성하고 있어서 마커가 지워지지 않고 쌓이고 있다고 보았기 때문에 이전에 생성된 마커가 있다면 해당 마커를 marker.setMap(null)로 지우고 새로운 마커를 생성해주도록 하였다.

```yaml
const [marker, setMarker] = useState<any>(null);
  
    // 현재 위치 함수가 정상 작동하면 실행되는 함수
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
```
이렇게 변경해봤으나 초기에는 괜찮다싶다가도 이내 곧 상기한 것과 동일한 증상이 발현되었다.

`해결방법`

- 1. addListener 이벤트는 useEffect로 단독 실행되게 분리
  2. currentLatLng (현재 위경도)를 상태로 관리해서 얘가 변할 때마다 마커 다시 그리도록 useEffect 추가
  3. 첫 렌더링 시 setMarker 로 marker 상태 초기화하고 이후 계속 해당 marker 객체를 호출해서 사용
  4. searchDetailAddrFromCoords 함수 루트로 분리
```yaml
  const [map, setMap] = useState(null); // Map 객체
  const [marker, setMarker] = useState(null); // Marker 객체
  const [currentLatLng, setCurrentLatLng] = useState(null);
  const [circle, setCircle] = useState(null);
  const [address, setAddress] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태를 관리하는 상태 변수
  
  
    // 현재 위치 함수가 정상 작동하면 실행되는 함수
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
        '//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=비밀키키키';
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
```

</details>

<details>
<summary>vite에서 소켓 연결이 안 되는 문제</summary>

`문제사항`

- 소켓이 연결 안 되는 문제

`해결 시도`

- 코드에 문제가 있나 계속 수정과 디버깅을 해보았지만 해결이 안 되어 CRA에서 같은 코드를 확인해보았다.

확인해보니 CRA에서는 연결이 되고 Vite는 연결이 안 된다는 것을 확인했다..

`해결방법`

- 1. index.html에  `<script>  var *global* = *window*</script>`추가
  2. vite.config.ts에 proxy 설정

</details>

<details>
<summary>업로드, 삭제 , 수정이 실시간으로 안되는 문제</summary>

`문제사항`

- 실시간으로 업로드 삭제 수정이 반영되지않고 새로고침을 해야만 반영이 되는 문제

`해결 시도`

- useEffect로 api를 호출하여 의존성 배열에 값이 변경될 때마다 실시간으로 data를 업데이트되도록 하였다.

`해결방법`

- 1. useEffect로 api를 호출하여 새로운 데이터를 상태에 반영한다.
  2. 의존성 배열에 data을 포함하여 data가 바뀔 때마다 새로운 data를 호출한다.
  3. 새로운 데이터를 기존데이터를 합친 후 중복을 제거하여 상태에 반영한다.

</details>


## 👥 팀원 소개

| 이름    | 깃허브                            | 이메일                      |
|-------|--------------------------------|--------------------------|
| `이혜인` | https://github.com/zook0320  | zook020320@gmail.com |
| `정예진` | https://github.com/asdfg030906     | s94979892@gmail.com         |
| `황인영` | https://github.com/inyoungfriend | happy5225@naver.com    |
