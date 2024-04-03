import { IoIosArrowBack } from 'react-icons/io';
import styled from 'styled-components';
import { RxExit } from 'react-icons/rx';
import { IoArrowUpCircleOutline } from 'react-icons/io5';

function Chat() {
  return (
    <Contaier>
      <PaddingBox>
        <MenuBox>
          <IoIosArrowBack size={'24px'} />
          <span>이름</span>
          <RxExit size={'22px'} />
        </MenuBox>
      </PaddingBox>
      <Center>
        <ChatBox>
          <div>프로필</div>
          <Chatting>
            <span>메시지</span>
            <span>시간</span>
          </Chatting>
        </ChatBox>
      </Center>
      <InputBox>
        <input type={'text'} placeholder={'메세지를 입력해주세요.'} />
        <IoArrowUpCircleOutline
          style={{
            fontSize: '28px',
            position: 'absolute',
            right: '30px',
            zIndex: '100px',
            color: '#1689F3',
          }}
        />
      </InputBox>
    </Contaier>
  );
}

export default Chat;

const Contaier = styled.div`
  @media screen and (max-width: 430px) {
    width: 100%;
    height: 100%;
  }
`;

const MenuBox = styled.div`
  @media screen and (max-width: 430px) {
    display: flex;
    height: 70px;
    width: 100%;
    align-items: center;
    background-color: white;
    > span {
      display: flex;
      justify-content: center;
      width: 100%;
    }
  }
`;

const PaddingBox = styled.div`
  @media screen and (max-width: 430px) {
    padding: 0 20px;
    position: fixed;
    width: 100%;
    background-color: white;
  }
`;

const Center = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;
const ChatBox = styled.div`
  background-color: #f5f5f5;
  height: calc(100% - 150px);
  width: 100%;
  position: fixed;
  overflow-y: auto;
`;

const Chatting = styled.div``;

const InputBox = styled.div`
  @media screen and (max-width: 430px) {
    position: absolute;
    bottom: 0;
    height: 80px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    > input {
      background-color: #f5f5f5;
      height: 45px;
      border-radius: 20px;
      width: 89%;
      padding-left: 18px;
      font-size: 12px;
    }
  }
`;
