import styled from 'styled-components';

function Loading() {
  return (
    <Container>
      <span>로딩중입니다.</span>
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
  > span {
    font-size: 20px;
  }
`;
