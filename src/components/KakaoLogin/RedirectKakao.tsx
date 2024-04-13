import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveTokensToLocalStorage } from '../../util/localStorage/localStorage';
import styled from 'styled-components';
import donotcrythehamzzang from '../../../public/assets/donotcrythehamzzang.svg';
import { instance } from '../../api/axios';
// const client_id = import.meta.env.VITE_APP_KAKAO_CLIENT_ID;

// const redirect_uri = import.meta.env.VITE_APP_KAKAO_REDIRECT_URI;

function RedirectKakao() {
  // const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code`;

  const navigate = useNavigate();
  const PARAMS = new URL(window.location.href).searchParams;
  const KAKAO_CODE = PARAMS.get('code');
  const [accessTokenFetching, setAccessTokenFetching] = useState(false);

  console.log('KAKAO_CODE:', KAKAO_CODE);
  // console.log(client_id);

  // Access Token 받아오기
  const getAccessToken = async () => {
    if (accessTokenFetching) return; // Return early if fetching

    console.log('getAccessToken 호출');

    try {
      setAccessTokenFetching(true); // Set fetching to true

      const response = await instance.get(
        `/api/v1/members/kakao/callback?code=${KAKAO_CODE}`,
      );
      console.log('나 김동준이야', response);
      const accessToken = response.headers.authorization;
      console.log('accessToken:', accessToken);
      saveTokensToLocalStorage(accessToken);
      // localStorage.setItem('accessToken', accessToken);
      setAccessTokenFetching(false); // Reset fetching to false
      navigate('/thxkakaomap');
    } catch (error) {
      console.error('Error:', error);
      setAccessTokenFetching(false); // Reset fetching even in case of error
    }
  };

  useEffect(() => {
    if (KAKAO_CODE) {
      getAccessToken();
    }
  }, [KAKAO_CODE]);

  return (
    <ErrorPage>
      <img src={donotcrythehamzzang} />
      <MSG>
        페이지를 찾을 수 없습니다. <br />
        <br />
        잠시후 다시 시도해주세요.
      </MSG>
    </ErrorPage>
  );
}

export default RedirectKakao;

const ErrorPage = styled.div`
  @media screen and (max-width: 430px) {
    /* Group 1394 */

    position: absolute;
    width: 141.1px;
    height: 193.64px;
    left: 125.29px;
    top: 280.25px;
  }
`;

const MSG = styled.div`
  @media screen and (max-width: 430px) {
    /* 페이지를 찾을 수 없습니다. 잠시 후 다시 시도해주세요. */
    position: absolute;
    width: 230px;
    height: 56px;
    left: calc(50% - 230px / 2);
    top: calc(50% + 56px / 2 + 113.25px);
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 22px;
    text-align: center;
    color: #505050;
  }
`;
