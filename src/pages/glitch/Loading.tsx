import styled from 'styled-components';
import loding from '../../../public/assets/loding.gif';

function Loading() {
  return (
    <Container>
      <img src={loding} />
    </Container>
  );
}

export default Loading;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  background-color: #fff;
  align-items: center;
  justify-content: center;
  > img {
    width: 70px;
  }
`;
