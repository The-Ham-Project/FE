import styled from 'styled-components';

function Contents() {
  return (
    <>
      <div></div>
      <Box></Box>
    </>
  );
}

export default Contents;

const Box = styled.div`
  width: 100%;
  height: 110px;
  background-color: #ffffff;

  border-radius: 15px;

  display: flex;
  justify-content: center;
  align-items: center;
`;
