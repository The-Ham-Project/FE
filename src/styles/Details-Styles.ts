import styled from 'styled-components';

export const Container = styled.div`
  width: 420px;
  background: white;
`;

export const Flex = styled.div`
  width: 420px;
  border-bottom: 1px solid #d1d1d1;
  background: white;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  padding-top: 15px;
  padding-bottom: 15px;
  margin: 15px;
`;

export const Rental = styled.p`
  color: #1689f3;
  font-weight: 600;

  font-size: 20px;
`;

export const Deposit = styled.p`
  color: #808080;
  font-weight: 300;

  font-size: 15px;
`;

///카테고리 스타일

export const FlexWrap = styled.div`
    width: 550px;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
`;

export const MainContainer = styled.div`
  background-color: antiquewhite;
  display: flex;
`;

export const MainFlex = styled.div`
     background: white;
    display: flex;
    align-items: baseline;
    justify-content: flex-start;
    gap: 7px;
    margin: 15px;
    width: 200px;
`;

export const FlexColumn = styled.div`
  width: 70%;
  background: white;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 10px;
  margin: 15px;
  flex-direction: column;
  font-size: 10px;
`;

export const CategoryTsxtSize = styled.button`
       display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
font-size: 10px;
`;


export const Categoryinbutton = styled.button`
       display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;

`;



export const Categorybutton = styled.button`
  display: flex;
  flex-wrap: wrap;

`;


export const FlexCenter = styled.div`
display: flex;
    justify-content: center;
`;
