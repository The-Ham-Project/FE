import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from '../pages/main/Main';
import Location from '../pages/Location/Location';
import RedirectKakao from '../components/KakaoLogin/RedirectKakao.tsx';
import PostDetailsPage from '../pages/main/PostDetailsPage';
import Details from '../pages/main/Details';
import Chat from '../pages/chat/Chat.tsx';
import ChatList from '../pages/chatlist/ChatList.tsx';
import RedirectGoogle from '../components/GoogleLogin/RedirectGoogle.tsx';
import SocialLogin from '../pages/Login/SocialLogin.tsx';
import Mypage from '../pages/Mypage/Mypage.tsx';
import useStore from '../store/store.ts';
import MyList from '../pages/Mypage/MyList.tsx';
import SearchDetail from '../components/Main/SearchDetail.tsx';
import RedirectNaver from '../components/NaverLogin/RedirectNaver.tsx';
import Edit from '../pages/Mypage/Edit.tsx';
import Layout from '../components/layout/Layout.tsx';
import App from '../App.tsx';
import { createBrowserRouter } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';

function Router() {
  const isLoggedIn = useStore((state) => state.isLoggedIn);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route element={<Navbar />} />
          <Route path="/" element={<Main />} />
          <Route path={'/commlist'} element={<ChatList />} />
          <Route path="/mylist" element={<MyList />} />
          <Route path={`/comm/:chatRoom`} element={<Chat />} />
          <Route path="/details/:rentalId" element={<Details />} />
          <Route path="/sociallogin" element={<SocialLogin />} />
          <Route path="/kakao/callback" element={<RedirectKakao />} />
          <Route path="/google/callback" element={<RedirectGoogle />} />
          <Route path="/naver/callback" element={<RedirectNaver />} />
          <Route path="/thxkakaomap" element={<Location />} />
          {isLoggedIn && <Route path="/mylist" element={<MyList />} />}
          {isLoggedIn && <Route path="/mypage" element={<Mypage />} />}
          <Route path="/PostDetailsPage" element={<PostDetailsPage />} />
          <Route path="/Details/:rentalId/edit" element={<Edit />} />
        </Route>

        {/*</Route>*/}

        {/* <Route path="/mypage" element={<Mypage />} /> */}
        <Route
          path="/search/:keyword"
          element={<SearchDetail match={undefined} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
// export const router = createBrowserRouter([
//   {
//     element: <App />,
//     children: [
//       {
//         path: '/',
//         element: <Layout />,
//         children: [
//           {
//             index: true,
//             element: <Main />,
//           },
//           {
//             path: '/main/PostDetailsPage',
//             element: <PostDetailsPage />,
//           },
//           {
//             path: '/kakao/callback',
//             element: <RedirectKakao />,
//           },
//           {
//             path: '/google/callback',
//             element: <RedirectGoogle />,
//           },
//           {
//             path: '/naver/callback',
//             element: <RedirectNaver />,
//           },
//           {
//             path: '/thxkakaomap',
//             element: <Location />,
//           },
//           {
//             path: '/mypage',
//             element: <Mypage />,
//           },
//         ],
//       },
//     ],
//   },
// ]);
