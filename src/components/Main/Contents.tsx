import styled from 'styled-components';

function Contents() {
  return (
    <>
    <div></div>
      <Box>상단 컨텐츠 박스</Box>
    </>
  );
}

export default Contents;



const Box = styled.div`
  width: 350px;
  height: 150px;
  background-color: #1879ff;
  border: 1px solid #7c40ff;
  border-radius: 8px;
  padding: 16px;
  margin: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;