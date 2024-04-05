import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <GoogleOAuthProvider clientId="<294893311130-3r26qjanncd02i52313irpqs82b91pn3.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>,
  // </React.StrictMode>
);
