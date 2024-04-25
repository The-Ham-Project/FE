import styled from 'styled-components';
import loading from '../../../public/assets/loading.gif';

function Loading() {
  return (
    <Container>
      <img src={loading} />
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
`;
