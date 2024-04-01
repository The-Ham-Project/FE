import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from '../pages/Main';
import KakaoLogin from '../pages/KakaoLogin';
import NaverLogin from '../pages/NaverLogin';
import GoogleLogin from '../pages/GoogleLogin';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/oauth/kakaologin" element={<KakaoLogin />} />
        <Route path="/oauth/naverlogin" element={<NaverLogin />} />
        <Route path="/oauth/googlelogin" element={<GoogleLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
