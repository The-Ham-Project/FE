import styled from 'styled-components';

export const Contaier = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
`;

export const MenuBox = styled.div`
  display: flex;
  background-color: #f5f5f5;
  height: 60px;
  width: 100%;
  align-items: center;
  > span {
    display: flex;
    justify-content: center;
    width: 100%;
  }
`;
export const PaddingBox = styled.div`
  padding: 0 20px;
  background-color: #f5f5f5;
  box-shadow: 0 0 20px 0px rgba(100, 100, 111, 0.2);
`;

export const List = styled.div`
  overflow-y: auto;
  height: 100%;
  padding: 0 0 100px 0;
  > indicator {
    height: 10px;
    border: 1px solid black;
  }
`;

export const ListBox = styled.div`
  height: 100px;
  display: flex;
  padding: 20px;
  align-items: center;
  position: relative;
  &:after {
    content: '';
    border-bottom: 1px solid #f5f5f5;
    position: absolute;
    bottom: 0;
    width: 90%;
    left: 5%;
  }
`;

export const ImgBox = styled.div`
  width: 54px;
  margin: 0 15px 0 0;
  > img {
    width: 54px;
    height: 54px;
    border-radius: 100%;
  }
`;

export const FlexBox = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  > span {
    font-size: 13px;
    margin: 0 0 10px 0;
  }
`;

export const Btween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  > span {
    font-size: 15px;
    text-overflow: ellipsis;
    height: 14px;
    width: 70%;
    overflow: hidden;
    -webkit-line-clamp: 1;
    word-break: break-word;
    -webkit-box-orient: vertical;
    display: -webkit-box;
  }
  > div {
    display: flex;
    justify-content: center;
    color: #fff;
    border-radius: 100%;
    align-items: center;
    height: 20px;
    width: 20px;
    font-size: 15px;
    background-color: #1689f3;
  }
`;

export const TextBox = styled.div`
  width: 100%;
`;