import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import magnifyingtheham from '../../../public/assets/magnifyingtheham.png';

function NotFound() {
  const navigate = useNavigate();
  const mainBtn = () => navigate('/');
  return (
    <ErrorPage>
      <ContentsBox>
        <MSG>
          <img src={magnifyingtheham} />
          페이지를 찾을 수 없습니다. <br />
          <br />
          잠시후 다시 시도해주세요.
          <NotButton onClick={() => mainBtn()}>홈으로 이동하기</NotButton>
        </MSG>
      </ContentsBox>
    </ErrorPage>
  );
}

export default NotFound;

const ErrorPage = styled.div`
  background-color: #fff;
  width: 100%;
  height: 100%;
`;

const ContentsBox = styled.div`
  width: 100%;
  height: 100%;
  justify-content: center;
  display: flex;
  align-items: center;
`;

const MSG = styled.div`
  width: 170px;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  > img {
    width: 138px;
    height: 168px;
    display: flex;
    align-content: center;
    justify-content: center;
    margin-bottom: 25px;
  }
`;

const NotButton = styled.button`
  margin-top: 20px;
  width: 160px;
  height: 55px;
  outline: 0;
  border-radius: 10px;
`;
