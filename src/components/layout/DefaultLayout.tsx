import styled from 'styled-components';

function DefaultLayout() {
  return (
    <>
      <Container />
    </>
  );
}

export default DefaultLayout;

export const Phone = styled.div`
  position: absolute;
  left: -20px;

  width: 420px;
  top: -50px;
  z-index: 9999;
  pointer-events: none;
  background-repeat: no-repeat;
`;
export const Containerrelative = styled.div`
  max-width: 430px;
  height: 98vh;
  position: relative;
`;

export const Container = styled.div`
  overflow: scroll;
  display: flex;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  overflow-y: hidden;
  overflow-x: hidden;
  position: relative;

  flex-direction: column;
`;

export const Div = styled.div`
  width: 62%;
  height: 100vh;
  overflow-y: hidden;

  @media screen and (max-width: 768px) {
    width: 30%;
    background-color: #178cf3;
  }
  @media screen and (max-width: 500px) {
    width: 10%;
    background-color: #178cf3;
  }
`;

export const Flex = styled.div`
  display: flex;
  align-items: center;
`;
