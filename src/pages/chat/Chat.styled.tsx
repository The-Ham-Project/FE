import styled, { css } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export const MenuBox = styled.div`
  height: 60px;
  width: 100%;
  display: flex;
  padding: 0 20px;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  > div {
    cursor: pointer;
  }
  > span {
    display: flex;
    font-size: 18px;
    justify-content: center;
  }
`;

export const Center = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: calc(100% - 130px);
  overflow-y: auto;
  background-color: #f5f5f5;
`;
export const ChatBox = styled.div`
  box-sizing: border-box;
  align-items: center;
`;

export const Chatting = styled.div<{ $active: boolean }>(
  ({ $active }) => css`
    display: flex;
    word-break: break-all;
    margin: 10px;
    justify-content: ${$active ? 'normal' : 'flex-end'};
  `,
);

export const Seserve = styled.div<{ $active: boolean }>(
  ({ $active }) => css`
    display: flex;
    flex-direction: ${$active ? 'normal' : 'row-reverse'};
    > img {
      width: 44px;
      height: 44px;
      border-radius: 100%;
    }
    > span {
      display: flex;
      align-items: flex-end;
      color: #9a9a9a;
      font-size: 10px;
    }
  `,
);
export const Message = styled.div<{ $active: boolean }>(
  ({ $active }) => css`
    max-width: 220px;
    padding: 13px;
    margin: ${$active ? `0 5px 0 10px` : `0 10px 0 5px`};
    align-items: center;
    border-radius: 9px;
    color: ${$active ? 'black' : 'white'};

    background-color: ${$active ? '#fff' : '#1689F3'};
  `,
);

export const InputBox = styled.div`
  padding: 0 20px;
  height: 70px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
`;
export const Box = styled.div`
  border-radius: 18px;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  width: 100%;
  > textarea {
    display: flex;
    border-radius: 18px;
    font-family: 'Pretendard-Regular';
    height: 20px;
    background-color: #f5f5f5;
    border: none;
    width: calc(100% - 32px);
    padding-left: 18px;
    font-size: 15px;
    outline: none;
    resize: none;
  }
`;
export const DateSpanBox = styled.div<{ $active: boolean }>(
  ({ $active }) => css`
    display: ${$active ? 'flex' : 'none'};
    margin: 22px 0;
    justify-content: center;
    align-items: center;
    width: 100%;
    > span {
      font-size: 13px;
      background-color: rgba(151, 147, 147, 0.4);
      color: #fff;
      padding: 8px 17px;
      border-radius: 30px;
    }
  `,
);
