import styled, { css } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ImgBox = styled.div`
  width: 100%;
  position: relative;
  > img {
    height: 16px;
    width: 10px;
    z-index: 1000;
    position: absolute;
    top: 22px;
    left: 20px;
    cursor: pointer;
  }
  .slick-dots li.slick-active button:before {
    opacity: .75;
    color: rgb(22, 137, 243);
}
`;

export const Img = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  object-fit: none;
  background-color: #ececec;
`;

export const ContentsBox = styled.div`
  width: 100%;
  height: 53%;
  padding: 0 20px;
`;

export const Contents = styled.div`
  width: 100%;
  height: 100%;
`;

export const TitleBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 82px;
  position: relative;
margin-top: 12px;
  &:after {
    content: '';
    border-bottom: 1px solid #d1d1d1;
    position: absolute;
    bottom: 0;
    width: 100%;
    left: 0;
  }
`;
export const Between = styled.div`
  display: flex;
  align-items: center;
  > img {
    border-radius: 100%;
    width: 32px;
    height: 32px;
    margin-right: 8px;
  }
  > span {
    font-size: 20px;
  }
  > .district {
    color: #606060;
    font-size: 15px;
    margin-left: 6px;
  }
`;

export const PriceBox = styled.div`
  height: 69px;
  display: flex;
  align-items: center;
  position: relative;
  > .rentalFee {
    color: #1689f3;
    font-size: 19px;
    margin-right: 12px;
  }
  .deposit {
    color: #808080;
    font-size: 14px;
  }

  &:after {
    content: '';
    border-bottom: 1px solid #d1d1d1;
    position: absolute;
    bottom: 0;
    width: 100%;
    left: 0;
  }
`;

export const TextBox = styled.div`
  margin: 25px 0 25px 0;
  display: flex;
  align-items: center;
  > h5 {
    font-size: 22px;
  }
`;

export const Text = styled.div`
  margin-bottom: 46px;
  width: 100%;
  > span {
    font-size: 12px;
  }
`;

export const Chat = styled.div<{ $active: boolean }>(
  ({ $active }) => css`
    height: 170px;
    display: ${$active ? 'flex' : 'none'};

    .chatButton {
      display: ${$active ? 'flex' : 'none'};
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 52px;
      background-color: #1689f3;
      border-radius: 31.14px;
      color: white;
      font-size: 15.45px;
      font-family: 'Pretendard';
      font-weight: 500;
      text-align: center;
      border: none;
      cursor: pointer;
    }
  `,
);

export const Catting = styled.div`
  height: 170px;

  .chatButton {
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 52px;
    background-color: #1689f3;
    border-radius: 31.14px;
    color: white;
    font-size: 15.45px;
    font-family: 'Pretendard';
    font-weight: 500;
    text-align: center;
    border: none;
    cursor: pointer;
  }
`;
