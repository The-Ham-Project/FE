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
