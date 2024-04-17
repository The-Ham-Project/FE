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
  background-color: #fff;
  position: relative;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  z-index: 100;
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
  height: calc(100% - 246px);
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
    border-radius: 7px;
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
    margin: 24px 0;
    justify-content: center;
    align-items: center;
    width: 100%;
    > span {
      font-size: 13px;
      background-color: #ffffff;
      color: #9e9e9e;
      padding: 8px 16px;
      border-radius: 30px;
      > img {
        padding: 0 6px 0 0;
      }
    }
  `,
);

export const RentalItemBox = styled.div`
  height: 116px;
  padding: 18px 20px;
  display: flex;
  align-items: center;
  width: 100%;
  background-color: #fff;
  position: relative;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  > img {
    height: 80px;
    width: 80px;
    border-radius: 7px;
    margin: 0 29px 0 0;
  }
`;
export const Cloum = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 70%;
  > h6 {
  }
`;
export const Flex = styled.div`
  display: flex;
  margin-top: 29px;
  > .rentalFee {
    color: #1689f3;
    margin: 0 12px 0 0;
  }
`;
