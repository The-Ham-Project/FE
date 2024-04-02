import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from '../pages/main/Main';
import KakaoLogin from '../pages/Login/KakaoLogin';
import NaverLogin from '../pages/Login/NaverLogin';
import GoogleLogin from '../pages/Login/GoogleLogin';
import Location from '../pages/Location/Location';
import PostDetailsPage from '../pages/main/PostDetailsPage';
import Details from '../pages/main/Details';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/main/PostDetailsPage" element={<PostDetailsPage />} />
        <Route path="/oauth/kakaologin" element={<KakaoLogin />} />
        <Route path="/oauth/naverlogin" element={<NaverLogin />} />
        <Route path="/oauth/googlelogin" element={<GoogleLogin />} />
        <Route path="/thxkakaomap" element={<Location />} />
        <Route path="/details/:rentalId" element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
