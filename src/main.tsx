import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
// import {
//   ContentContainer,
//   Div,
//   Div1,
//   Div3,
//   Div4,
//   Flex,
//   Flex2,
// } from './pages/main/Main.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <GoogleOAuthProvider clientId="<294893311130-3r26qjanncd02i52313irpqs82b91pn3.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>,
  // </React.StrictMode>
);
