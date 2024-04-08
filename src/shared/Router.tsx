import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from '../pages/main/Main';
import KakaoLogin from '../pages/Login/KakaoLogin';
import NaverLogin from '../pages/Login/NaverLogin';
import GoogleLogin from '../pages/Login/GoogleLogin';
import Location from '../pages/Location/Location';
// import RoutingMap from '../pages/Location/RoutingMap.tsx';
import Redirect from '../components/KakaoLogin/Redirect';
import PostDetailsPage from '../pages/main/PostDetailsPage';
import Details from '../pages/main/Details';
import Chat from '../pages/chat/Chat.tsx';
import ChatList from '../pages/chatlist/ChatList.tsx';
import Chat2 from '../pages/chat/Chat2.tsx';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/main/PostDetailsPage" element={<PostDetailsPage />} />
        <Route path="/oauth/kakaologin" element={<KakaoLogin />} />
        <Route path="/oauth/naverlogin" element={<NaverLogin />} />
        <Route path="/oauth/googlelogin" element={<GoogleLogin />} />
        {/* <Route path="/hellokakaoap" element={<RoutingMap />} /> */}
        <Route path="/thxkakaomap" element={<Location />} />
        <Route path="/details/:rentalId" element={<Details />} />
        <Route path="/kakao/callback" element={<Redirect />} />
        <Route path={`/comm/:chatRoom`} element={<Chat />} />
        <Route path={'/commlist'} element={<ChatList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
