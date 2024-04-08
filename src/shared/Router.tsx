import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from '../pages/main/Main';
import Location from '../pages/Location/Location';
import RoutingMap from '../pages/Location/RoutingMap.tsx';
import RedirectKakao from '../components/KakaoLogin/RedirectKakao.tsx';
import PostDetailsPage from '../pages/main/PostDetailsPage';
import Details from '../pages/main/Details';
import Chat from '../pages/chat/Chat.tsx';
import ChatList from '../pages/chatlist/ChatList.tsx';
import RedirectGoogle from '../components/GoogleLogin/RedirectGoogle.tsx';
import SocialLogin from '../pages/Login/SocialLogin.tsx';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/main/PostDetailsPage" element={<PostDetailsPage />} />
        <Route path="/sociallogin" element={<SocialLogin />} />
        <Route path="/kakao/callback" element={<RedirectKakao />} />
        <Route path="/google/callback" element={<RedirectGoogle />} />
        <Route path="/hellokakaomap" element={<RoutingMap />} />
        <Route path="/thxkakaomap" element={<Location />} />
        <Route path="/details/:rentalId" element={<Details />} />
        <Route path={`/comm/:chatRoom`} element={<Chat />} />
        <Route path={'/commlist'} element={<ChatList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
