import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Main from '../pages/main/Main';
import Location from '../pages/Location/Location';
import RedirectKakao from '../components/KakaoLogin/RedirectKakao.tsx';
import PostDetailsPage from '../pages/main/PostDetailsPage';
import Details from '../pages/detail/Details.tsx';
import Chat from '../pages/chat/Chat.tsx';
import ChatList from '../pages/chatlist/ChatList.tsx';
import RedirectGoogle from '../components/GoogleLogin/RedirectGoogle.tsx';
import SocialLogin from '../pages/Login/SocialLogin.tsx';
import Mypage from '../pages/Mypage/Mypage.tsx';
// import ChangeUserInfo from '../pages/Mypage/ChangeUserInfo.tsx';
import useStore from '../store/store.ts';
import MyList from '../pages/Mypage/MyList.tsx';
import SearchDetail from '../components/Main/SearchDetail.tsx';
import RedirectNaver from '../components/NaverLogin/RedirectNaver.tsx';
import Edit from '../pages/Mypage/Edit.tsx';
import Layout from '../components/layout/Layout.tsx';
import App from '../App.tsx';
import { createBrowserRouter } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
// import Splash from '../components/Splash/Splash.tsx';

function Router() {
  const isLoggedIn = useStore((state) => state.isLoggedIn);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route element={<Navbar />}>
            <Route path="/" element={<Main />} />
            <Route path="/search" element={<SearchDetail />} />
            <Route path="/mypage" element={<Mypage />} />
            {/* <Route path="/userinfo" element={<ChangeUserInfo />} /> */}
            <Route path="/mylist" element={<MyList />} />
            <Route path="/details/:rentalId" element={<Details />} />
            <Route path={'/commlist'} element={<ChatList />} />
            <Route path="/kakao/callback" element={<RedirectKakao />} />
            <Route path="/google/callback" element={<RedirectGoogle />} />
            <Route path="/naver/callback" element={<RedirectNaver />} />

            <Route path="/postdetailspage" element={<PostDetailsPage />} />

            <Route path="/details/:rentalId/edit" element={<Edit />} />
          </Route>
          {/* <Route path={`/splash`} element={<Splash />} /> */}
          <Route path={`/comm/:chatRoom`} element={<Chat />} />
          <Route path="/sociallogin" element={<SocialLogin />} />
          <Route path="/thxkakaomap" element={<Location />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
