// import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
// import jwt_decode, { jwtDecode } from 'jwt-decode'
// import axios from 'axios'
// import { useGoogleLogin } from "@react-oauth/google";

// // interface GoogleProps {
// //   successGoogleLogin: (res: any) => void;
// // }

// const client_id =
// //   '294893311130-3r26qjanncd02i52313irpqs82b91pn3.apps.googleusercontent.com';
// '410095691528-h2c6l3kv771u82sh50uv7gmi66cjaov8.apps.googleusercontent.com';
//   https://accounts.google.com/o/oauth2/auth?client_id=410095691528-h2c6l3kv771u82sh50uv7gmi66cjaov8.apps.googleusercontent.com&scope=email&redirect_uri=https://api.openmpy.com/api/v1/members/google/callback&response_type=code
// // const clientId = process.env.GOOGLE_CLIENT_KEY as string
// const redirect_uri = 'https://api.openmpy.com/api/v1/members/google/callback';
// const googleURL = `https://kauth.kakao.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code`;
// function Login() {
// //   const GoogleLoginButton: React.FC<GoogleProps> = ({ successGoogleLogin }) => {
//     // const login = useGoogleLogin({
//         // onSuccess: async(response) => {
//         //     try{
//         //         const res = await axios.get(
//         //             'https://www.googleapis.com/oauth2/v3/userinfo',
//         //             {
//         //                 headers: {
//         //                     Authorization: `Bearer ${response.access_token}`
//         //                 }
//         //             }
//         //         );
//         //         console.log(res)
//         //     } catch (err) {
//         //         console.log(err);
//         //     }
//     // }})
//     const google = () => {
//         window.location.href = googleURL;
//       };
//     // return (
//     // //   <GoogleOAuthProvider clientId={client_id}>
//     //     {/* <GoogleLogin
//     //       onSuccess={(credentialResponse:any) => {
//     //         console.log(jwtDecode(credentialResponse.credential));
//     //       }}
//     //       onError={() => {
//     //         console.log('로그인 실패');
//     //       }}
//     //     /> */}
//     //   <button onClick={google}>꾸글 로긴</button>
//     //     {/* <GoogleLogin
//     //       onSuccess={(credentialResponse) => {
//     //         const credentialResponseDecoded = jwt_decode(
//     //             credentialResponse.credential
//     //         );
//     //         console.log(credentialResponse);
//     //       }}
//     //       onError={() => {
//     //         console.log('로그인 실패');
//     //       }}
//     //     /> */}
//     // //   </GoogleOAuthProvider>

//     // // return <button onClick={() => login()}>꾸글로긴</button>;

//     // //   <GoogleLoginWrap>
//     // //     <GoogleOAuthProvider clientId={clientId}>
//     // //       <GoogleLogin onSuccess={successGoogleLogin} />
//     // //     </GoogleOAuthProvider>
//     // //   </GoogleLoginWrap>
//     // )
//     return(
//         <>
//         <button onClick={google}>꾸글 로긴</button>
//         </>
//     )
//   };

// export default Login;


const client_id = '410095691528-h2c6l3kv771u82sh50uv7gmi66cjaov8.apps.googleusercontent.com';
// const redirect_uri = 'http://localhost:5173/oauth/kakaologin';
const redirect_uri = 'https://api.openmpy.com/api/v1/members/google/callback';
function Login() {
  const googleURL = `https://accounts.google.com/o/oauth2/auth?client_id=${client_id}&scope=email&redirect_uri=${redirect_uri}&response_type=code`;
  //https://accounts.google.com/o/oauth2/auth?client_id=410095691528-h2c6l3kv771u82sh50uv7gmi66cjaov8.apps.googleusercontent.com&scope=email&redirect_uri=https://api.openmpy.com/api/v1/members/google/callback&response_type=code

  const google = () => {
    window.location.href = googleURL;
  };
  return (
    <>
      <button onClick={google}>꾸글 로긴</button>
    </>
  );
}

export default Login;