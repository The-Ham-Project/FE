import styled from 'styled-components';

export const Container = styled.div`
  width: 430px;
  background: white;
  gap: 10px;
`;

export const Flex = styled.div`
  border-bottom: 1px solid #d1d1d1;
  background: white;
  display: flex;
  align-items: center;

  gap: 10px;
  padding-top: 15px;
  padding-bottom: 15px;
`;

export const Flexnickname = styled.div`
  background: white;
  display: flex;
  align-items: center;

  padding-top: 15px;
`;

export const Contentitem = styled.div`
  background: white;

  padding-top: 20px;
  padding-bottom: 15px;
`;

export const Flexbetween = styled.div`
  border-bottom: 1px solid #d1d1d1;
  background: white;
  display: flex;
  align-items: center;
  gap: 10px;
  padding-top: 15px;
  padding-bottom: 15px;
  justify-content: space-between;
`;

export const Rental = styled.p`
  color: #1689f3;
  font-weight: 600;
  font-size: 20px;
`;
export const Title = styled.p`
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
  width: 424px;
  height: 330px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

export const MainContainer = styled.div`
  display: flex;
`;

export const MainFlex = styled.div`
  background: white;
  display: flex;
  align-items: baseline;
  justify-content: flex-start;
  gap: 7px;
  margin: 15px;
  width: 150px;
`;

export const FlexColumn = styled.div`
  width: 80%;
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

export const Categoryinbutton = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
`;

export const Categorybutton = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  width: 300px;
  gap: 5px;
  border-radius: 20px;
`;

export const FlexCenter = styled.div`
  display: flex;

  flex-direction: column;
  align-content: center;
  align-items: center;
`;
