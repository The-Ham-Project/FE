// import { useRouter } from 'next/router';
// import Link from 'next/link';

// export default function RoutingMap(): JSX.Element {
//   const router = useRouter();
//   const onClickMove = (): void => {
//     void router.push('/thxkakaomap'); // 기다리려면 await 안기다리려면 void
//   };
//   return (
//     <>
//       <button onClick={onClickMove}>페이지 이동하기</button>
//       <a href="/thxkakaomap">
//         옛날 방식(매 페이지를 새로 다운받으므로 SPA 활용 못하므로 리액트나
//         라우터에서 제공하는 기능인 router.push를 사용함)으로 페이지 이동하기에
//         웬만하면 쓰지말지~
//       </a>
//       <Link href="/thxkakaomap">
//         <a>
//           next에서 제공하는 a 태그이므로 SPA 활용하여 링크 태그로 페이지
//           이동하기 // 버튼을 클릭해서 이동하는 게 아니면 router.push를 쓴다.
//           링크 태그 안에서 anchor 태그를 쓰면 a태그 기능은 무효화된다. 하지만
//           쓰는 이유는 검색로봇 때문에
//         </a>
//       </Link>
//     </>
//   );
// }

import { useEffect } from 'react';
import { Link } from 'react-router-dom';

declare global {
  interface Window {
    kakao;
  }
}

declare const window: typeof globalThis & {
  kakao;
};

function RoutingMap(): JSX.Element {
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
        const map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
      });
    };
  }, []);
  //   useEffect(() => {
  //     const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
  //     const options = {
  //       //지도를 생성할 때 필요한 기본 옵션
  //       center: new window.kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
  //       level: 3, //지도의 레벨(확대, 축소 정도)
  //     };

  //     const map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
  //     console.log(map);
  //   }, []);
  return (
    <>
      {/* <script
        type="text/javascript"
        src="//dapi.kakao.com/v2/maps/sdk.js?appkey=1df8e00ba19cbaf3ed39000226e2e4c8"
      ></script> */}
      <div id="map" style={{ width: 500, height: 400 }}></div>
      <Link to="/thxkakaomap">내 위치 인증하기</Link>
    </>
  );
}

export default RoutingMap;
