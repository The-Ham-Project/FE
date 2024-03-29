import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from '../pages/Main';
import KakaoLogin from '../pages/KakaoLogin';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/oath/kakaologin" element={<KakaoLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
