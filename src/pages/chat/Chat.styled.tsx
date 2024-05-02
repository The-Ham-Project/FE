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
  //justify-content: space-between;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  position: relative;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  z-index: 100;
  > div {
    cursor: pointer;
    > .arrow {
      width: 10px;
      height: 16px;
      position: absolute;
      left: 20px;
      top: 22px;
    }
  }
  > span {
    display: flex;
    font-size: 17px;
    justify-content: center;
  }
  > .exit {
    width: 18px;
    height: 18px;
    position: absolute;
    right: 20px;
    top: 21px;
  }
`;

export const Center = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: calc(100% - 246px);
  overflow-y: scroll;
  background-color: #f5f5f5;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #a4a4a4; /* 스크롤바 색상 */
    border-radius: 10px; /* 스크롤바 둥근 테두리 */
  }

  //&::-webkit-scrollbar-track {
  //  background: rgba(220, 20, 60, 0.1); /*스크롤바 뒷 배경 색상*/
  //}
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
      display: ${$active ? 'flex' : 'none'};
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
    > span {
      font-size: 12px;
    }
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
  overflow: hidden;
  border-radius: 27px;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  > textarea {
    display: flex;
    border-radius: 27px;
    font-family: 'Pretendard-Regular';
    background-color: #f5f5f5;
    height: 35px;
    overflow: hidden;
    border: none;
    width: calc(100% - 32px);
    padding-left: 18px;
    padding-top: 25px;
    font-size: 15px;
    outline: none;
    resize: none;
    line-height: 1;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  > img {
    padding-right: 13px;
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
      font-size: 10px;
      display: flex;
      align-items: center;
      background-color: #ffffff;
      color: #9e9e9e;
      padding: 8px 16px;
      overflow: auto;
      border-radius: 30px;
      > img {
        padding: 0 6px 0 0;
        width: 19px;
        height: 12px;
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
    text-overflow: ellipsis;
    height: 32px;
    width: 100%;
    font-size: 16px;
    overflow: hidden;
    -webkit-line-clamp: 2;
    word-break: break-word;
    -webkit-box-orient: vertical;
    display: -webkit-box;
  }
`;
export const Flex = styled.div`
  display: flex;
  margin-top: 18px;
  align-items: center;
  > .rentalFee {
    color: #1689f3;
    font-size: 14px;
    margin: 0 12px 0 0;
    position: relative;

    &:after {
      content: '';
      background-color: rgba(22, 137, 243, 0.1);
      border-radius: 27px;
      width: 100%;
      height: 10px;
      position: absolute;
      z-index: 1000;
      left: 0;
      top: 10px;
    }
  }
  > span {
    color: #595959;
    font-size: 12px;
  }
`;
