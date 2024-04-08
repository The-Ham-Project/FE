// import { useNavigate } from 'react-router-dom';
// // import mypage from '../../../public/assets/mypage.svg'

// function Header() {
//   const navigate = useNavigate();

//   const handleLogoClick = () => navigate('/');
//   const handleBackClick = () => navigate(-1);
//   const handleMypageClick = () => navigate('/mypage');

//   // 상태에 따라 Navbar에 표시될 아이콘 결정
//   const navbarContents = isLoggedIn ? (
//     <>
//       <NavbarIconContainer>
//         <NavbarBtn onClick={handleBackClick}></NavbarBtn>
//         <NavbarBtn onClick={handleLogoClick}></NavbarBtn>
//         <NavbarBtn onClick={handleMypageClick}>
//           <img src="/public/assets/mypage.svg" alt="logout" />
//         </NavbarBtn>
//       </NavbarIconContainer>
//     </>
//   ) : (
//     <>
//       <WigglyBtn onClick={handleLoginClick}>로그인</WigglyBtn>
//     </>
//   );

//   return (
//     <>
//       <NavbarLogoBtn onClick={handleLogoClick} color="white">
//         <LogoDiv>
//           <LogoIcon src="/public/assets/mypage.svg" />
//         </LogoDiv>
//       </NavbarLogoBtn>
//       {navbarContents}
//     </>
//   );
// }

// export default Header;

// import styled, { keyframes } from 'styled-components';
// import theme from './theme';

// export const LogoIcon = styled.img`
//   position: absolute;
//   width: 50px;
//   height: 28px;
//   left: 20px;
//   top: 63px;
// `;
// /* 네브바 버튼 */
// export const NavbarBtn = styled.button`
//   color: ${theme.white};
//   cursor: pointer;
//   transition: all 300ms ease;

//   &:hover {
//     transform: scale(1.2);
//     color: ${theme.primary};
//   }
// `;
// /* 전체 컨테이너 */
// export const MainContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   max-width: 1200px;
//   height: 100vh;
//   margin: 0 auto;
//   flex-wrap: wrap;
// `;

// export const LeftImgContainer = styled.div`
//   position: relative;
//   height: 0;
//   padding-left: 150px;
// `;

// export const LeftLogoTextIcon = styled.img`
//   position: absolute;
//   height: 40px;
//   bottom: 20px;
//   left: 30px;
//   cursor: pointer;
// `;

// export const BubbleImg = styled.img`
//   position: absolute;
//   bottom: 130px;
//   right: 130px;
//   height: 200px;
// `;

// export const LeftContent = styled.div`
//   display: flex;
//   flex-direction: row;
//   padding-top: 30px;
// `;

// export const LeftPieImg = styled.img`
//   position: absolute;
//   width: 250px;
//   right: 0;
//   bottom: -100px;
// `;

// /* 오른쪽 컨테이너 */
// export const RightContainer = styled.div`
//   position: relative;
//   width: -webkit-fill-available;
//   max-width: 390px;
//   height: calc(var(--vh, 1vh) * 100);
//   margin: 0 10px;
//   overflow-y: scroll;
//   &::-webkit-scrollbar {
//     display: none;
//   }
// `;

// /* 네브바 영역 */
// export const NavbarDiv = styled.div`
//   position: sticky;
//   top: 0;
//   left: 0;
//   width: 100%;
//   z-index: 9;
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
//   align-items: center;
//   padding: 10px 10px 4px 10px;
//   background-color: ${theme.gray1};
// `;

// // /* 네브바 버튼 */
// // export const NavbarBtn = styled.button`
// //   font-size: ${(props) => props.fs};
// //   font-weight: ${(props) => props.fw};
// //   padding-top: ${(props) => props.pt};
// //   padding-left: ${(props) => props.pl};
// //   padding-right: ${(props) => props.pr};
// //   color: ${theme.white};
// //   cursor: pointer;
// //   transition: all 300ms ease;

// //   &:hover {
// //     transform: scale(1.2);
// //     color: ${theme.primary};
// //   }
// // `;

// const wigglyAnimation = keyframes`
//   0% {
//     transform: rotate(0deg);
//   }

//   25% {
//     transform: rotate(-8deg);
//   }

//   50% {
//     transform: rotate(8deg);
//   }
  
//   75% {
//     transform: rotate(-8deg);
//   }

//   100% {
//     transform: rotate(0deg);
//   }
// `;

// export const WigglyBtn = styled.button`
//   color: ${theme.white};
//   background-color: ${theme.primary};
//   cursor: pointer;
//   animation: ${wigglyAnimation} 3s infinite;
//   width: 60px;
//   height: 34px;
//   border-radius: 8px;
//   border: 2px solid ${theme.primaryFont};
//   transition: all 300ms ease-in;

//   &:hover {
//     background-color: ${theme.primaryFont};
//   }
// `;

// export const NavbarLogoBtn = styled.button``;

// export const NavbarIconContainer = styled.div`
//   display: flex;
//   align-items: center;
// `;

// export const LogoDiv = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// export const LogoTextIcon = styled.img`
//   height: 25px;
//   margin-left: 10px;
//   margin-top: 10px;
// `;

// // 바디 영역
// export const Body = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   width: 100%;
//   max-width: 390px;
//   height: auto;
// `;

// export const MainBtnContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   margin-right: 20px;
//   gap: 10px;
// `;

// export const MainBtn = styled.button`
//   justify-content: center;
//   align-items: center;
//   color: gray;
//   font-size: ${theme.body2};
//   color: ${(props) => props.color};
// `;

// export const FundingDiv = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   margin-bottom: 10px;
// `;

// export const BannerImg = styled.img`
//   width: -webkit-fill-available;
//   max-width: 390px;
//   padding-bottom: 10px;
// `;

// export const RecentFundingDiv = styled.div`
//   display: flex;
//   font-size: 18px;
//   padding-top: 30px;
//   padding-left: 6px;
// `;

// export const FundingSection = styled.section`
//   display: flex;
//   justify-content: space-evenly;
//   flex-wrap: wrap;
//   flex-shrink: 0;
//   width: 100%;
//   padding: 10px;
//   gap: 10px 2%;
// `;

// export const RecentFundingBtn = styled.button`
//   display: flex;
//   width: -webkit-fill-available;
//   max-width: 390px;
//   justify-content: center;
//   align-items: center;
//   border-top: 1px solid ${theme.gray5};
//   padding-top: 12px;
//   padding-bottom: 6px;
// `;

// export const EndingSection = styled.section`
//   display: flex;
//   justify-content: space-around;
//   flex-wrap: wrap;
//   width: 100%;
//   height: 235px;
//   gap: 10px;
//   padding: 10px;
// `;

// export const FundingGrid = styled.div`
//   width: 32%;
//   max-width: 110px;
//   overflow: hidden;
//   cursor: pointer;
// `;

// export const CharacterImg = styled.img`
//   width: 100px;
//   margin: 20px;
// `;

// export const MyFundingDiv = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   width: -webkit-fill-available;
//   max-width: 390px;
//   height: 128px;
// `;

// export const MyFundingTitle = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   font-size: ${theme.body2};
//   padding: 12px 0 20px 0;
// `;

// export const MyFundingImg = styled.img`
//   position: relative;
//   width: 100%;
//   max-width: 120px;
//   height: 120px;
//   border-radius: 10px;
//   margin: 0 20px 0 20px;
//   border: 1px solid ${theme.gray5};
//   box-shadow: 0 0.3px 0 0.3px ${theme.gray4};
//   object-fit: cover;
//   background-color: ${theme.white};
// `;

// export const MyFundingBtn = styled.button`
//   width: 80px;
//   height: 34px;
//   background-color: ${theme.primaryBtn};
//   color: ${theme.primaryFont};
//   font-size: ${theme.detail};
//   border-radius: 8px;
// `;

// export const FundingImg = styled.img`
//   width: 100%;
//   max-width: 110px;
//   height: 100%;
//   max-height: 110px;
//   border: 1px solid ${theme.gray5};
//   border-top-left-radius: 10px;
//   border-top-right-radius: 10px;
//   margin-top: 10px;
//   object-fit: cover;
// `;

// export const ProgressBar = styled.div`
//   width: 100%;
//   max-width: 110px;
//   height: 4px;
//   background-color: ${theme.gray5};
//   overflow: hidden;
//   transform: translateY(-6px);
// `;

// export const TogetherBetween = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: 220px;
// `;

// export const TogetherLogoImg = styled.img`
//   width: 80px;
//   height: 24px;
// `;

// export const TogetherImg = styled.img`
//   width: 70px;
//   height: 70px;
//   margin-bottom: 10px;
// `;

// export const TogetherGrids = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 100%;
//   max-width: 390px;
//   margin-top: 10px;
//   gap: 5px;
// `;

// export const BannerProgressDiv = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   margin-right: 40px;
//   width: 100%;
//   max-width: 200px;
// `;

// export const RoundProgressBar = styled.div`
//   width: 100%;
//   height: 11px;
//   background-color: ${theme.gray5};
//   border-radius: 12px;
//   font-weight: 600;
// `;

// export const TogetherGrid = styled.div`
//   background-color: snow;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   width: 100%;
//   max-width: 115px;
//   height: 130px;
//   border-radius: 8px;
//   margin-bottom: 50px;
//   padding-bottom: 40px;
// `;

// export const ProductGrids = styled.div`
//   display: flex;
//   align-items: center;
//   width: 100%;
//   max-width: 390px;
//   gap: 10px;
//   padding: 0 20px;
//   overflow-x: scroll;

//   &::-webkit-scrollbar {
//     height: 8px;
//   }

//   &::-webkit-scrollbar-thumb {
//     background: ${theme.gray5};
//     border-radius: 100px;
//   }

//   &::-webkit-scrollbar-track {
//     background: ${theme.white};
//   }
// `;

// export const ProductGrid = styled.div`
//   width: -webkit-fill-available;
//   max-width: 390px;
// `;

// export const ProductImg = styled.img`
//   width: 120px;
//   height: 120px;
//   border: 1px solid ${theme.gray5};
//   margin-top: 10px;
//   border-radius: 8px;
//   object-fit: cover;
//   cursor: pointer;
//   pointer-events: auto;
// `;

// export const FundingProductGrid = styled.div`
//   width: 100%;
//   max-width: 110px;
//   object-fit: cover;
// `;

// export const FloatingBtn = styled.button`
//   position: sticky;
//   bottom: 18px;
//   left: 50%;
//   transform: translateX(-50%);
//   margin-bottom: 10px;
//   width: 132px;
//   height: 44px;
//   border-radius: 24px;
//   background-color: ${theme.primary};
//   color: ${theme.white};
//   font-size: ${theme.body2};
//   z-index: 9;

//   &:hover {
//     background-color: ${theme.primaryFont};
//   }

//   box-shadow:
//     6px 6px 6px rgba(0, 0, 0, 0.2),
//     -6px 6px 6px rgba(0, 0, 0, 0.2),
//     -6px -6px 6px rgba(0, 0, 0, 0.2),
//     6px -6px 6px rgba(0, 0, 0, 0.2);

//   @media screen and (max-width: 390px) {
//     position: fixed;
//   }
// `;

// export const ProductRecommend = styled.button`
//   display: flex;
//   width: -webkit-fill-available;
//   max-width: 390px;
//   justify-content: center;
//   align-items: center;
//   border-top: 1px solid ${theme.gray5};
//   padding-top: 12px;
//   padding-bottom: 14px;
// `;
