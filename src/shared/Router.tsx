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
// import SearchDetail from '../components/Main/SearchDetail.tsx';
import RedirectNaver from '../components/NaverLogin/RedirectNaver.tsx';
import Edit from '../pages/Mypage/Edit.tsx';

function Router() {
  const isLoggedIn = useStore((state) => state.isLoggedIn);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/main/PostDetailsPage" element={<PostDetailsPage />} />
  <Route path="/sociallogin" element={<SocialLogin />} />
        <Route path="/kakao/callback" element={<RedirectKakao />} />
        <Route path="/google/callback" element={<RedirectGoogle />} />
        <Route path="/naver/callback" element={<RedirectNaver />} />
        <Route path="/thxkakaomap" element={<Location />} />
        {/* <Route path="/mypage" element={<Mypage />} /> */}
        <Route
          path="/search/:keyword"
          // element={<SearchDetail match={undefined} />}
        />
        <Route path="/mylist" element={<MyList />} />
        {isLoggedIn && <Route path="/mypage" element={<Mypage />} />}
        {isLoggedIn && <Route path="/mylist" element={<MyList />} />}
        <Route path="/Details/:rentalId/edit" element={<Edit />} />
        <Route path="/details/:rentalId" element={<Details />} />
        <Route path={`/comm/:chatRoom`} element={<Chat />} />
        <Route path={'/commlist'} element={<ChatList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
