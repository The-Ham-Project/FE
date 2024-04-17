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
import DefaultLayout from '../components/layout/DefaultLayout.tsx';

function Router() {
  const isLoggedIn = useStore((state) => state.isLoggedIn);

  return (
    <BrowserRouter>
      <Routes>
        
        <Route element={<DefaultLayout />}> //하단네비게이션 필요 영역
          <Route path="/" element={<Main />} />
          <Route path={'/commlist'} element={<ChatList />} />
          {isLoggedIn && <Route path="/mypage" element={<Mypage />} />}
          <Route path="/mylist" element={<MyList />} />
          <Route path="/details/:rentalId" element={<Details />} />
        </Route>

        //하단네비게이션 필요 없는 영역
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

        

        {isLoggedIn && <Route path="/mylist" element={<MyList />} />}
        <Route path="/PostDetailsPage" element={<PostDetailsPage />} />
        <Route path="/Details/:rentalId/edit" element={<Edit />} />
    
        <Route path={`/comm/:chatRoom`} element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
