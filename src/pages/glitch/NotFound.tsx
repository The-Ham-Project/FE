import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import magnifyingtheham from '../../../public/assets/magnifyingtheham.png';

function NotFound() {
  const navigate = useNavigate();
  const mainBtn = () => navigate('/');
  return (
    <ErrorPage>
      <img src={magnifyingtheham} />
      <MSG>
        페이지를 찾을 수 없습니다. <br />
        <br />
        잠시후 다시 시도해주세요.
      </MSG>
      <NotButton onClick={() => mainBtn()}>홈으로 이동하기</NotButton>
    </ErrorPage>
  );
}

export default NotFound;

const ErrorPage = styled.div`
  @media screen and (max-width: 430px) {
    /* Group 1394 */
    background-color: white;
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

const NotButton = styled.button`
  width: 170px;
  height: 60px;
  outline: 0;
  border-radius: 10px;
`;
