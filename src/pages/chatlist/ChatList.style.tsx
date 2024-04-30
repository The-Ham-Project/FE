import styled, { css } from 'styled-components';

export const Contaier = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
`;

export const MenuBox = styled.div`
  display: flex;
  background-color: #fff;
  height: 60px;
  width: 100%;
  align-items: center;
  justify-content: center;
  position: relative;
  > span {
    display: flex;
    justify-content: center;
    width: 100%;
    font-size: 14px;
  }
  > .arrow {
    width: 10px;
    height: 16px;
    position: absolute;
    left: 0;
    cursor: pointer;
  }
`;
export const PaddingBox = styled.div`
  padding: 0 20px;
  background-color: #fff;
  box-shadow: 0 0 20px 0px rgba(100, 100, 111, 0.2);
`;

export const List = styled.div`
  overflow-y: auto;
  height: calc(100% - 60px);

  padding: 0 0 100px 0;
  &::-webkit-scrollbar {
    display: none;
  }
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
    object-fit: cover;
  }
`;

export const FlexBox = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;

export const Btween = styled.div<{ $active: boolean }>(
  ({ $active }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    > .lastMessage {
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
      display: ${$active ? 'flex' : 'none'};
      justify-content: center;
      color: #fff;
      border-radius: 100%;
      align-items: center;
      height: 20px;
      width: 20px;
      font-size: 15px;
      background-color: #1689f3;
    }
    > .toMemberNickName {
      font-size: 13px;
      margin: 0 0 10px 0;
      width: 80%;
    }
    > .lastMessageTime {
      font-size: 10px;
      margin: 0 0 10px 0;
      color: #9e9e9e;
    }
  `,
);

export const TextBox = styled.div`
  width: 100%;
`;
