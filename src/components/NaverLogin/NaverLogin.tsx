// VITE_APP_KAKAO_REST_API_KEY="1df8e00ba19cbaf3ed39000226e2e4c8"
// VITE_APP_KAKAO_CLIENT_ID="86e1404c807c52cb2261fa208ef88d27"
// VITE_APP_KAKAO_JAVASCRIPT_KEY="a10dff590e44c0b8a20d68095fbb3dbf"
// VITE_APP_KAKAO_REDIRECT_URI="http://localhost:5173/kakao/callback"

// VITE_APP_GOOGLE_CLIENT_ID="410095691528-h2c6l3kv771u82sh50uv7gmi66cjaov8.apps.googleusercontent.com"
// VITE_APP_GOOGLE_REDIRECT_URI="http://localhost:5173/google/callback"

// VITE_APP_NAVER_CLIENT_ID="FDNapTSIjIsNa0YGULsx"
// VITE_APP_NAVER_REDIRECT_URI="http://localhost:5173/naver/callback"

// # VITE_SERVER_URL="http://localhost:5173/"
// VITE_SERVER_URL="https://api.openmpy.com"

import startwithnaver from '../../../public/assets/startwithnaver.svg';
import styled from 'styled-components';

const client_id = import.meta.env.VITE_APP_NAVER_CLIENT_ID;
const redirect_uri = import.meta.env.VITE_APP_NAVER_REDIRECT_URI;

function NaverLogin() {
  const naverURL = `https://nid.naver.com/oauth2.0/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&state=false`;

  const naver = async () => {
    window.location.href = naverURL;
  };

  return (
    <>
      {/* <Header></Header> */}
      <Button onClick={naver}>
        <IMG src={startwithnaver} alt="네이버 로그인 버튼" />
      </Button>
    </>
  );
}

export default NaverLogin;

const Button = styled.button`
  background-color: white;
  @media screen and (max-width: 430px) {
    width: 350px;
    height: 45px;
  }
`;

const IMG = styled.img`
  width: 350px;
  height: 44px;
  @media screen and (max-width: 430px) {
  }
`;
//////////////////////////////////////////
// import { useEffect, useState } from 'react';
// // import startwithnaver from '../../../public/assets/startwithnaver.svg';
// import styled from 'styled-components';

// interface User {
//   nickname: string;
//   image: string;
// }

// interface Image {
//   url: string;
// }

// function NaverLogin() {
//   const [data, setData] = useState<User>({ nickname: '', image: '' });
//   const [profile, setProfile] = useState<boolean>(false);

//   useEffect(CDM, []);
//   function CDM() {
//     Naver();
//     //     GetProfile();
//   }
//   function Naver() {
//     const naverLogin = new naver.LoginWithNaverId({
//       clientId: 'LxN5wJ7nfaBEdeEwePqQ', //황인영
//       // clientId: 'FDNapTSIjIsNa0YGULsx',
//       callbackUrl: 'http://localhost:5173/oauth/naverlogin',
//       callbackHandle: true,
//       loginButton: { color: 'green', type: 3, height: 58 },
//     });
//     naverLogin.init();
//   }
//   //   const NAVER_CLIENT_ID: string | undefined = import.meta.env.VITE_APP_NAVER_CLIENT_ID; // 발급받은 클라이언트 아이디
//   //   const REDIRECT_URI: string = 'http://localhost:5173/oauth/naverlogin'; // Callback URL
//   //   const STATE: string = 'false';
//   //   const NAVER_AUTH_URL: string = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${STATE}&redirect_uri=${REDIRECT_URI}`;
//   const { naver } = window;

//   //   const initializeNaverLogin = () => {
//   //     const naverLogin = new naver.LoginWithNaverId({
//   //       clientId: NAVER_CLIENT_ID!,
//   //       callbackUrl: REDIRECT_URI,
//   //       // 팝업창으로 로그인을 진행할 것인지?
//   //       isPopup: false,
//   //       // 버튼 타입 ( 색상, 타입, 크기 변경 가능 )
//   //       loginButton: { color: 'green', type: 3, height: 58 },
//   //       callbackHandle: true,
//   //     });
//   //     naverLogin.init();
//   //   };
//   function GetProfile() {
//     window.location.href.includes('access_token') && GetUser();

//     function GetUser() {
//       const location = window.location.href.split('=')[1];
//       const loca = location.split('&')[0];
//       const header = {
//         Authorization: loca,
//       };

//       fetch(`${ip}user/naver_auth`, {
//         method: 'get',
//         headers: header,
//       })
//         .then((res) => res.json())
//         .then((res) => {
//           localStorage.setItem('wtw_token', res.token);
//           setData(res.user);
//         });
//     }
//   }
//   const handleProfile = () => {
//     setProfile(!profile);
//   };

//   const handleLogout = () => {
//     window.localStorage.clear();
//     window.location.reload();
//   };

//   naver?.Login?.getLoginStatus?.(async function (status) {
//     if (status) {
//       // 아래처럼 선택하여 추출이 가능하고,
//       const userid = naver.Login.user.getEmail();
//       const username = naver.Login.user.getName();
//       // 정보 전체를 아래처럼 state 에 저장하여 추출하여 사용가능하다.
//       // setUserInfo(naverLogin.user)
//     }
//   });

//   //   const NaverLogin = () => {
//   //     window.location.href = NAVER_AUTH_URL;
//   //   };

//   const userAccessToken = () => {
//     window.location.href.includes('access_token') && getToken();
//   };

//   const getToken = () => {
//     const token = window.location.href.split('=')[1].split('&')[0];
//     // console.log, alert 창을 통해 어스코드가 잘 추출 되는지 확인하자!

//     // 이후 로컬 스토리지 또는 state에 저장하여 사용하자!
//     // localStorage.setItem('access_token', token)
//     // setGetToken(token)
//   };

//   // 화면 첫 렌더링이후 바로 실행하기 위해 useEffect 를 사용하였다.
//   //   useEffect(() => {
//   //     initializeNaverLogin();
//   //     userAccessToken();
//   //   }, []);

//   return (
//     <>
//       {/* <button id="naverIdLogin"
//       onClick={NaverLogin}
//       >
//         네이버 로그인
//       </button> */}
//       <DIV id="naverIdLogin"></DIV>
//       <Button onClick={handleProfile}>{data.nickname}</Button>
//     </>
//   );
// }

// export default NaverLogin;

// const Button = styled.button`
//   @media screen and (max-width: 430px) {
//     width: 350px;
//     height: 45px;
//     margin-left: 30px;
//   }
// `;
// const DIV = styled.div`
//   @media screen and (max-width: 430px) {
//     position: absolute;
//     width: 350px;
//     height: 45px;
//     left: 20.16px;
//     top: 684.42px;
//     margin-left: 40px;
//   }
// `;

///////////////////////////////////////

// 구현 코드

// const NaverLogin = ({ setGetToken, setUserInfo }) => {

// 	const { naver } = window
// 	const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID; // 발급 받은 Client ID 입력
// 	const NAVER_CALLBACK_URL = 'http://localhost:5173/oauth/naverlogin' // 작성했던 Callback URL 입력

// const initializeNaverLogin = () => {
// 	const naverLogin = new naver.LoginWithNaverId({
// 		clientId: NAVER_CLIENT_ID,
// 		callbackUrl: NAVER_CALLBACK_URL,
//       // 팝업창으로 로그인을 진행할 것인지?
// 		isPopup: false,
//       // 버튼 타입 ( 색상, 타입, 크기 변경 가능 )
// 		loginButton: { color: 'green', type: 3, height: 58 },
// 		callbackHandle: true,
// 	})
// 	naverLogin.init()

//            // 선언된 naverLogin 을 이용하여 유저 (사용자) 정보를 불러오는데
//            // 함수 내부에서 naverLogin을 선언하였기에 지역변수처리가 되어
//            // userinfo 정보를 추출하는 것은 지역변수와 같은 함수에서 진행주어야한다.

//            // 아래와 같이 로그인한 유저 ( 사용자 ) 정보를 직접 접근하여 추출가능하다.
//            // 이때, 데이터는 첫 연동시 정보 동의한 데이터만 추출 가능하다.

//            // 백엔드 개발자가 정보를 전달해준다면 아래 요기! 라고 작성된 부분까지는
//            // 코드 생략이 가능하다.

//   naverLogin.getLoginStatus(async function (status) {
// 		if (status) {
//           // 아래처럼 선택하여 추출이 가능하고,
// 			const userid = naverLogin.user.getEmail()
// 			const username = naverLogin.user.getName()
//           // 정보 전체를 아래처럼 state 에 저장하여 추출하여 사용가능하다.
//           // setUserInfo(naverLogin.user)
// 		}
// 	})
//             // 요기!
// 	}

//             // 네이버 소셜 로그인 (네아로) 는 URL 에 엑세스 어스코드가 붙어서 전달된다.
//             // 우선 아래와 같이 어스코드를 추출 할 수 있으며,
//             // 3부에 작성 될 Redirect 페이지를 통해 빠르고, 깨끗하게 처리가 가능하다.

//     const userAccessToken = () => {
// 	    window.location.href.includes('access_token') && getToken()
// }

//   	const getToken = () => {
// 	const token = window.location.href.split('=')[1].split('&')[0]
//          // console.log, alert 창을 통해 어스코드가 잘 추출 되는지 확인하자!

//          // 이후 로컬 스토리지 또는 state에 저장하여 사용하자!
//             // localStorage.setItem('access_token', token)
// 	        // setGetToken(token)
// }

//          // 화면 첫 렌더링이후 바로 실행하기 위해 useEffect 를 사용하였다.
// useEffect(() => {
// 	initializeNaverLogin()
// 	userAccessToken()
// }, [])

// 	return (
// 		<>
//          {/* // 구현할 위치에 아래와 같이 코드를 입력해주어야 한다.
//          // 태그에 id="naverIdLogin" 를 해주지 않으면 오류가 발생한다! */}
// 			<div id="naverIdLogin"> </div>
// 		</>
// 	)
// }

// import React, { useEffect, useState } from 'react';
// import { RouteComponentProps, withRouter } from 'react-router-dom';
// import styled, { css } from 'styled-components';
// // import Login from 'Utils/Login';
// import Icons from 'Images/vibe.svg';

// declare global {
//   interface Window {
//     naver: any;
//   }
// }

// const { naver } = window;

// interface User {
//   nickname: string;
//   image: string;
// }

// interface Image {
//   url: string;
// }

// interface Menu {
//   menu: number | boolean;
// }

// const Nav: React.FC<RouteComponentProps> = ({
//   history,
// }: RouteComponentProps) => {
//   const [data, setData] = useState<User>({ nickname: '', image: '' });
//   const [menu, setMenu] = useState<number>(1);
//   const [profile, setProfile] = useState<boolean>(false);

//   useEffect(CDM, []);

//   function CDM() {
//     Naver();
//     GetProfile();
//   }
//   function Naver() {
//     //리팩토링 예정
//     const naverLogin = new naver.LoginWithNaverId({
//       clientId: 'l8Te_G6HB311ZMRozq4s',
//       callbackUrl: 'http://localhost:3000',
//       callbackHandle: true,
//       loginButton: {
//         color: 'green',
//         type: 1,
//         height: 20,
//       } /* 로그인 버튼의 타입을 지정 */,
//     });

//     naverLogin.init();

// window.addEventListener('load', function() {
//   naverLogin.getLoginStatus(function(status: string) {
//     if (status) {
//       /* 필수적으로 받아야하는 프로필 정보가 있다면 callback처리 시점에 체크 */

//       var name = naverLogin.user.getNickName();
//       var profileImage = naverLogin.user.getProfileImage();

//       if (name === undefined || name === null) {
//         alert('닉네임은 필수정보입니다. 정보제공을 동의해주세요.');
//         /* 사용자 정보 재동의를 위하여 다시 네아로 동의페이지로 이동함 */
//         naverLogin.reprompt();
//         return;
//       } else if (profileImage === undefined || profileImage === null) {
//         alert('프로필사진은 필수정보입니다. 정보제공을 동의해주세요.');
//         naverLogin.reprompt();
//         return;
//       }

//       window.location.replace(
//         'http://' +
//           window.location.hostname +
//           (window.location.port === '' || window.location.port === undefined
//             ? ''
//             : ':' + window.location.port),
//       );
//     } else {
//       console.log('callback 처리에 실패하였습니다.');
//     }
//   });
// });
// }

//   function GetProfile() {
//     window.location.href.includes('access_token') && GetUser();

//     function GetUser() {
//       const location = window.location.href.split('=')[1];
//       const loca = location.split('&')[0];
//       const header = {
//         Authorization: loca,
//       };

//       fetch(`${ip}user/naver_auth`, {
//         method: 'get',
//         headers: header,
//       })
//         .then((res) => res.json())
//         .then((res) => {
//           localStorage.setItem('wtw_token', res.token);
//           setData(res.user);
//         });
//     }
//   }

//   const handleProfile = () => {
//     setProfile(!profile);
//   };

//   const handleLogout = () => {
//     window.localStorage.clear();
//     history.push('/');
//     window.location.reload();
//   };

//   const todayClick = () => {
//     history.push('/');
//     setMenu(1);
//   };

//   const djClick = () => {
//     history.push('/dj_station');
//     setMenu(2);
//   };

//   return (
//     <MainNav>
//       <LogoLink onClick={todayClick} />
//       <SearchLink href="#" />
//       <MyMenu>
//         <ProfileArea>
//           {data.image ? (
//             <LoggedLink url={data.image}>
//               <LoginText onClick={handleProfile}>{data.nickname}</LoginText>
//             </LoggedLink>
//           ) : (
//             <LoginLink href="#">
//               <LoginText>로그인</LoginText>
//               <NaverLogin id="naverIdLogin"></NaverLogin>
//             </LoginLink>
//           )}
//           {profile && (
//             <ProfilePopup>
//               <MyMerbership>My 멤버십</MyMerbership>
//               <Notice>공지사항</Notice>
//               <Account>계정설정</Account>
//               <Logout onClick={handleLogout}>로그아웃</Logout>
//             </ProfilePopup>
//           )}
//         </ProfileArea>
//         <MenuArea>
//           <Ul>
//             <List marginTop="0" onClick={todayClick}>
//               <TodayLink menu={menu === 1}>
//                 <TodayText menu={menu === 1}>투데이</TodayText>
//               </TodayLink>
//             </List>
//             <List>
//               <ChartLink href="#">
//                 <DefaultText>차트</DefaultText>
//               </ChartLink>
//             </List>
//             <List onClick={djClick}>
//               <DjLink menu={menu === 2}>
//                 <DjText menu={menu === 2}> DJ 스테이션</DjText>
//               </DjLink>
//             </List>
//             <List>
//               <MagLink href="#">
//                 <DefaultText>VIBE MAG</DefaultText>
//               </MagLink>
//             </List>
//             <List>
//               <MonthlyLink href="#">
//                 <DefaultText>이달의 노래</DefaultText>
//               </MonthlyLink>
//             </List>
//           </Ul>
//           {window.localStorage.wtw_token ? (
//             <LoginMenuWrapper>
//               <StorageBox>보관함</StorageBox>
//               <StorageBoxListWrapper>
//                 <StorageMixTape>믹스테잎</StorageMixTape>
//                 <StorageSong>노래</StorageSong>
//                 <StorageArtist>아티스트</StorageArtist>
//                 <StorageAlbum>앨범</StorageAlbum>
//                 <StoragePlayList>플레이리스트</StoragePlayList>
//                 <StorageGetSong>받은노래</StorageGetSong>
//               </StorageBoxListWrapper>
//             </LoginMenuWrapper>
//           ) : (
//             <></>
//           )}
//           <ExtraMenu>
//             <ExtraLink1
//               href="https://vibe.naver.com/wheresmymoney"
//               target="_blank"
//             />
//             <ExtraLink2
//               href="https://music.naver.com/onStage/onStageSeason2List.nhn"
//               target="_blank"
//             />
//             <ExtraLink3
//               href="https://music.naver.com/musicianLeague/contents/home.nhn"
//               target="_blank"
//             />
//             <ExtraText href="#">서비스 소개</ExtraText>
//             <ExtraText href="#">맴버쉽 구독</ExtraText>
//           </ExtraMenu>
//         </MenuArea>
//       </MyMenu>
//     </MainNav>
//   );
// };

// export default withRouter(Nav);

// const MainNav = styled.nav`
//   /* 제일 작을 때, 768px 이하**************** */
//   width: 100%;
//   height: 67px;
//   background-color: black;
//   position: fixed;
//   top: 0;
//   z-index: 10;
//   /* 1100정도 이상********************* */
//   ${({ theme }) => theme.media.desktop`
//     background-color: black;
//     width: 225px;
//     height: 100vh;
//     position: fixed;
//     top: 0;
//   `}
// `;

// const pseudoBefore = css`
//   content: '';
//   display: inline-block;
//   background-image: url(${Icons});
// `;

// const LogoLink = styled.a`
//   display: inline-block;
//   vertical-align: top;

//   ::before {
//     margin: 23px 10px 23px 20px;
//     width: 111px;
//     height: 24px;
//     background-position: -328px -130px;
//     ${pseudoBefore}
//   }
// `;

// const SearchLink = styled.a`
//   position: absolute;
//   top: 0;
//   right: 0;
//   z-index: 10;
//   opacity: 0.7;

//   :hover {
//     opacity: 1;
//   }

//   ::before {
//     width: 20px;
//     height: 20px;
//     margin: 26px 19px;
//     background-position: -555px -747px;
//     ${pseudoBefore}
//   }
// `;

// const MyMenu = styled.div`
//   overflow-y: auto;
//   position: absolute;
//   top: 73px;
//   right: 0;
//   bottom: 0;
//   left: 0;
//   padding: 0 15px 40px;

//   /* 커스텀 스크롤 바 */
//   ::-webkit-scrollbar {
//     -webkit-appearance: none;
//     width: 8px;
//   }

//   ::-webkit-scrollbar-thumb {
//     background-color: #333;
//     border-radius: 8px;
//   }

//   ::-webkit-scrollbar-track {
//     border-radius: 8px;
//     background-color: #111;
//   }
// `;

// const ProfileArea = styled.div`
//   display: none;
//   border-style: solid;
//   border-color: rgba(216, 216, 216, 0.13);
//   border-width: 1px 0;
//   ${({ theme }) => theme.media.desktop`
//   display: block;
//   border-style: solid;
//   border-color: rgba(216, 216, 216, 0.13);
//   border-width: 1px 0;
//   `}
// `;

// const ProfilePopup = styled.div`
//   top: 39px;
//   right: 20px;
//   width: 150px;
//   background-color: #fff;
//   position: absolute;
//   z-index: 15;
//   padding: 11px 0;
//   white-space: nowrap;
//   border-radius: 4px;
//   box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
//   cursor: pointer;
// `;

// const MyMerbership = styled.div`
//   color: #232323;
//   display: block;
//   width: 100%;
//   padding: 6px 20px 7px;
//   font-size: 14px;
//   line-height: 18px;
//   text-align: left;
//   white-space: nowrap;
//   box-sizing: border-box;
//   &:hover {
//     background-color: #f3f3f3;
//   }
// `;

// const Notice = styled.div`
//   color: #232323;
//   display: block;
//   width: 100%;
//   padding: 6px 20px 7px;
//   font-size: 14px;
//   line-height: 18px;
//   text-align: left;
//   white-space: nowrap;
//   box-sizing: border-box;
//   &:hover {
//     background-color: #f3f3f3;
//   }
// `;

// const Account = styled.div`
//   color: #232323;
//   display: block;
//   width: 100%;
//   padding: 6px 20px 7px;
//   font-size: 14px;
//   line-height: 18px;
//   text-align: left;
//   white-space: nowrap;
//   box-sizing: border-box;
//   &:hover {
//     background-color: #f3f3f3;
//   }
// `;

// const Logout = styled.div`
//   color: #232323;
//   display: block;
//   width: 100%;
//   padding: 6px 20px 7px;
//   font-size: 14px;
//   line-height: 18px;
//   text-align: left;
//   white-space: nowrap;
//   box-sizing: border-box;
//   &:hover {
//     background-color: #f3f3f3;
//   }
// `;

// const MenuArea = styled.div`
//   margin-top: 34px;
// `;

// const LoginLink = styled.a`
//   line-height: 19px;
//   color: rgb(153, 153, 153);
//   padding: 11px 0;
//   display: block;
//   font-size: 15px;

//   ::before {
//     width: 30px;
//     height: 30px;
//     vertical-align: middle;
//     background-position: -694px -624px;
//     margin: 0 10px 0 7px;
//     border-radius: 50%;
//     ${pseudoBefore}
//   }
// `;

// const LoggedLink = styled.a`
//   line-height: 19px;
//   color: rgb(153, 153, 153);
//   padding: 11px 0;
//   display: block;
//   font-size: 15px;

//   ::before {
//     width: 30px;
//     height: 30px;
//     vertical-align: middle;
//     margin: 0 10px 0 7px;
//     border-radius: 50%;
//     content: '';
//     background-image: url(${(props: Image) => props.url});
//     background-position: 50% 50%;
//     background-size: cover;
//     display: inline-block;
//   }
// `;

// const LoginText = styled.span`
//   display: inline-block;
//   vertical-align: middle;
// `;

// const NaverLogin = styled.div`
//   width: 30px;
//   height: 30px;
//   vertical-align: middle;
//   float: right;
//   margin-right: 10px;
// `;

// const Ul = styled.ul`
//   padding: 0;
// `;

// interface ListProps {
//   marginTop?: string;
// }

// const List = styled.li`
//   margin-top: ${(props: ListProps) => props.marginTop || '8px'};
// `;

// const defaultLink = css`
//   display: block;
//   padding: 6px 9px;
//   opacity: 0.8;

//   :hover {
//     opacity: 1;
//   }

//   ::before {
//     ${pseudoBefore}
//     margin-right: 8px;
//     vertical-align: middle;
//     width: 20px;
//     height: 20px;
//   }
// `;

// const defaultText = css`
//   font-weight: 700;
//   display: inline-block;
//   font-size: 16px;
//   line-height: 20px;
//   vertical-align: middle;
//   color: #fff;
//   opacity: 0.8;
// `;

// const TodayLink = styled.a`
//   ${defaultLink}
//   opacity: 1;
//   ::before {
//     background-position: ${(props: Menu) =>
//       props.menu ? '-499px -747px' : '-527px -747px'};
//   }
// `;

// const TodayText = styled.span`
//   ${defaultText}
//   color: ${(props: Menu) => props.menu && 'rgb(255, 0, 80)'};
//   opacity: 1;
// `;

// const ChartLink = styled.a`
//   ${defaultLink} ::before {
//     background-position: -471px -747px;
//   }
// `;

// const DefaultText = styled.span`
//   ${defaultText}
// `;

// const DjLink = styled.a`
//   ${defaultLink} ::before {
//     background-position: ${(props: Menu) =>
//       props.menu ? '-164px -719px' : '-528px -719px'};
//   }
// `;

// const DjText = styled.span`
//   ${defaultText}
//   color: ${(props: Menu) => props.menu && 'rgb(255, 0, 80)'};
//   opacity: 1;
// `;

// const MagLink = styled.a`
//   ${defaultLink} ::before {
//     background-position: -415px -747px;
//   }
// `;

// const MonthlyLink = styled.a`
//   ${defaultLink} ::before {
//     background-position: -723px -747px;
//   }
// `;

// const ExtraMenu = styled.div`
//   margin-top: 34px;
//   padding-top: 24px;
//   border-top: 1px solid hsla(0, 0%, 84.7%, 0.13);
//   height: 300px;
// `;

// const extraLink = css`
//   display: block;
//   padding: 8px 9px 10px;
//   opacity: 0.8;

//   :hover {
//     opacity: 1;
//   }
// `;

// const ExtraLink1 = styled.a`
//   ${extraLink} ::before {
//     background-position: -686px -289px;
//     width: 72px;
//     height: 14px;
//     ${pseudoBefore}
//   }
// `;

// const ExtraLink2 = styled.a`
//   ${extraLink} ::before {
//     background-position: -328px -271px;
//     width: 82px;
//     height: 16px;
//     ${pseudoBefore}
//   }
// `;

// const ExtraLink3 = styled.a`
//   ${extraLink} ::before {
//     background-position: -328px -295px;
//     width: 82px;
//     height: 16px;
//     ${pseudoBefore}
//   }
// `;

// const ExtraText = styled.a`
//   :hover {
//     opacity: 1;
//   }
//   display: block;
//   padding: 5px 9px 7px;
//   font-size: 16px;
//   line-height: 19px;
//   color: #fff;
//   opacity: 0.8;
//   text-decoration: none;
// `;
// // 로그인 시 생길 div
// const LoginMenuWrapper = styled.div`
//   /* margin-top: 34px; */
//   /* border-top: 1px solid hsla(0, 0%, 84.7%, 0.13); */
// `;
// const StorageBox = styled.span`
//   display: block;
//   margin: 32px 9px 0;
//   font-size: 13px;
//   line-height: 16px;
//   color: #555;
// `;
// const StorageBoxListWrapper = styled.div`
//   margin: 0;
//   padding: 0;
//   margin-block-start: 0px;
//   margin-block-end: 0px;
// `;
// const StorageMixTape = styled.a`
//   display: block;
//   padding: 6px 9px;
//   margin-top: 6px;
//   font-size: 16px;
//   line-height: 19px;
//   color: #fff;
//   opacity: 0.8;
//   :hover {
//     opacity: 1;
//   }
// `;
// const StorageSong = styled.a`
//   display: block;
//   padding: 6px 9px;
//   margin-top: 6px;
//   font-size: 16px;
//   line-height: 19px;
//   color: #fff;
//   opacity: 0.8;
//   :hover {
//     opacity: 1;
//   }
// `;
// const StorageArtist = styled.li`
//   display: block;
//   padding: 6px 9px;
//   margin-top: 6px;

//   font-size: 16px;
//   line-height: 19px;
//   color: #fff;
//   opacity: 0.8;
//   :hover {
//     opacity: 1;
//   }
// `;
// const StorageAlbum = styled.li`
//   display: block;
//   padding: 6px 9px;
//   margin-top: 6px;
//   font-size: 16px;
//   line-height: 19px;
//   color: #fff;
//   opacity: 0.8;
//   :hover {
//     opacity: 1;
//   }
// `;
// const StoragePlayList = styled.a`
//   display: block;
//   padding: 6px 9px;
//   margin-top: 6px;
//   font-size: 16px;
//   line-height: 19px;
//   color: #fff;
//   opacity: 0.8;
//   :hover {
//     opacity: 1;
//   }
// `;
// const StorageGetSong = styled.a`
//   display: block;
//   padding: 6px 9px;
//   margin-top: 6px;
//   font-size: 16px;
//   line-height: 19px;
//   color: #fff;
//   opacity: 0.8;
//   :hover {
//     opacity: 1;
//   }
// `;
