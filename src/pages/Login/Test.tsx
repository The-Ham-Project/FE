import React from 'react';
import styled from 'styled-components';

function Test() {
  return (
    <Wrapper>
      <Container>
        <Box1>
          <Chat>
            안녕 우헤헤 니누기야 나는 황인영 대박사건 근데 이거 어디까지
          </Chat>
          <ChatTime>14:57</ChatTime>
        </Box1>
        <Box2>
          <ReturnChatTime>14:58</ReturnChatTime>
          <ReturnChat>이가 없으면 잇몸으로 ㄱㄱ 쌉가능</ReturnChat>
        </Box2>
      </Container>
    </Wrapper>
  );
}

export default Test;

const Wrapper = styled.div`
  @media screen and (max-width: 430px) {
    height: 844px;
    background-color: grey;
  }
`;
const Container = styled.div`
  @media screen and (max-width: 430px) {
    /* Frame 200 */

    /* Auto layout */
    display: flex;
    align-items: flex-end;
    padding: 0px;
    gap: 5.71px;

    display: flex;
    flex-direction: column;
    align-items: flex-start;

    /* Inside auto layout */

    flex: none;
    order: 1;
    flex-grow: 0;
  }
`;
const Box1 = styled.div`
  @media screen and (max-width: 430px) {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
  }
`;
const Box2 = styled.div`
  @media screen and (max-width: 430px) {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: flex-end;
    align-items: flex-end;
  }
`;

const ReturnChat = styled.div`
  @media screen and (max-width: 430px) {
    /* Frame 193 */

    /* Auto layout 저거 시간은 어케하더라 아까 align item 지우니가 저렇게 위로 올라가던데 돌아버리겠네   예진님 근데 왜 space-between 이거 안돼요...??? 그니까 justify content랑 align item 그부분 왜 안돼*/

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    padding: 13.4367px 20.155px;
    gap: 3.36px;
    background: #1689f3;
    border-radius: 6.71835px;

    // /* Inside auto layout */
    // flex: none;
    // order: 1;
    // flex-grow: 0;
  }
`;

const ReturnChatTime = styled.div`
  @media screen and (max-width: 430px) {
    /* 14:07 */

    width: 26px;
    height: 12px;
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 400;
    font-size: 10.0775px;
    line-height: 12px;
    /* identical to box height */
    letter-spacing: 0.02em;

    color: #9a9a9a;

    /* Inside auto layout */

    flex: none;
    order: 0;
    flex-grow: 0;
  }
`;

const Chat = styled.div`
  @media screen and (max-width: 430px) {
    /* Frame 192 */

    /* Auto layout */
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 13.4367px 20.155px;
    gap: 3.36px;

    background: #ffffff;
    border-radius: 6.71835px;

    /* Inside auto layout */
    flex: none;
    order: 0;
    flex-grow: 0;
    max-width: 250px;
  }
`;
const ChatTime = styled.div`
  @media screen and (max-width: 430px) {
    /* 14:07 */

    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 400;
    font-size: 10.0775px;
    line-height: 12px;
    /* identical to box height */
    letter-spacing: 0.02em;

    color: #9a9a9a;

    /* Inside auto layout */
    flex: none;
    order: 1;
    flex-grow: 0;
  }
`;
