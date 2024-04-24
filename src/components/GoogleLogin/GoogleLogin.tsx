import startwithgoogle from '../../../public/assets/startwithgoogle.svg';
import styled from 'styled-components';
import useStore from '../../store/store';

const client_id = import.meta.env.VITE_APP_GOOGLE_CLIENT_ID;

const redirect_uri = import.meta.env.VITE_APP_GOOGLE_REDIRECT_URI;
function GoogleLogin() {
  const { login } = useStore();
  const googleURL = `https://accounts.google.com/o/oauth2/auth?client_id=${client_id}&scope=email&redirect_uri=${redirect_uri}&response_type=code`;

  const google = () => {
    window.location.href = googleURL;
  };
  return (
    <>
      <Button onClick={google}>
        <IMG onClick={login} src={startwithgoogle} alt="구글 로그인 버튼" />
      </Button>
    </>
  );
}

export default GoogleLogin;

const Button = styled.button`
  background-color: white;
  width: 350px;
  height: 44px;
  /* margin-right: 6px; */
  @media screen and (max-width: 430px) {
    margin-right: 0px;
  }
`;
const IMG = styled.img`
  width: 350px;
  height: 44px;
  /* margin-right: 6px; */
  @media screen and (max-width: 430px) {
    margin-right: 0px;
  }
`;
