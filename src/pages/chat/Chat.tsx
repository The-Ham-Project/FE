import { IoIosArrowBack } from 'react-icons/io';
import styled from 'styled-components';
import { RxExit } from 'react-icons/rx';
import { IoArrowUpCircleOutline } from 'react-icons/io5';
import { readChatRoom } from '../../api/chat.ts';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import SockJS from 'sockjs-client';
import { Stomp, Client } from '@stomp/stompjs';

import { useEffect, useRef, useState } from 'react';
import moment from 'moment';

// 밑으로 내려가는 거

//스타일드 컴포넌트에서 왜 오류가 나는지 ( @@@@)
//chatList에서 map이 왜 오류가 나는지

// 소켓으로 채팅 내용추가

const Chat = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const params = useParams();
  const [message, setMessage] = useState('');
  const [stompClient, setStompClient] = useState<Client | null>();

  const [testMessges, setTestMessges] = useState([]);

  //한번만
  const queryChatRoom = useQuery({
    queryKey: ['chatRoom'],
    queryFn: () => readChatRoom(params?.chatRoom),
    select: (response) => response.data,
    enabled: !!params.chatRoom,
  });
  const { data, error, isLoading } = queryChatRoom;

  useEffect(() => {
    if (params.chatRoom) {
      const fetchData = async () => {
        try {
          const response = await readChatRoom(params.chatRoom);
          const chatRoomData = response.data;

          // 프로필 이미지 데이터를 받아온 후 처리
          const socket = new SockJS('https://api.openmpy.com/chat', {
            headers: {
              Authorization: `${localStorage.getItem('accessToken')}`,
            },
          });
          const client = Stomp.over(socket);
          client.connectHeaders = {
            Authorization: `${localStorage.getItem('accessToken')}`,
          };

          const headers = {
            Authorization: `${localStorage.getItem('accessToken')}`,
          };
          client.connect(headers, () => {
            client.subscribe(
              `/sub/chat/chatRoom/${params.chatRoom}`,
              (message) => {
                const receivedMessage = JSON.parse(message.body);

                receivedMessage.profile = data?.senderProfileImage;

                // receivedMessage.sender = receivedMessage.nickname;
                receivedMessage.createdAt = moment(new Date()).format(
                  'YYYY-MM-DD hh:mm:ss',
                );

                console.log(receivedMessage);

                setTestMessges((prevMessages) => {
                  console.log([...prevMessages, receivedMessage]);
                  return [...prevMessages, receivedMessage];
                });
              },
            );
          });

          setStompClient(client);
          setTestMessges(chatRoomData.chatReadResponseDtoList.reverse());
        } catch (error) {
          console.error('Error fetching chat room data:', error);
        }
      };

      fetchData();
    }
    // Missing dependency array, assuming it's intended to run only once
  }, [params.chatRoom]);

  const handleMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const sendMessage = () => {
    if (message.trim() && stompClient && stompClient.connected) {
      const chatMessage = {
        profile: data?.senderProfileImage,
        message: message,
        createAt: new Date(),
      };
      // stompClient.send(
      //   `/pub/chat/talk/${params.chatRoom}`,
      //   {},
      //   JSON.stringify(chatMessage),
      // );
      stompClient.publish({
        destination: `/pub/chat/talk/${params.chatRoom}`,
        body: JSON.stringify(chatMessage),
      });

      // chatMessage.sender = '';

      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }

      setMessage('');
      // setTestMessges((prevMessages) => [...prevMessages, chatMessage]);
    } else {
      console.error('STOMP connection is not established.');
    }
  };

  useEffect(() => {
    if (queryChatRoom.data) {
      setTestMessges(queryChatRoom.data.chatReadResponseDtoList.reverse());
    }
  }, [queryChatRoom.data]);

  if (error) return <div>죄송합니다. 다시 접속해주세요!</div>;

  if (isLoading) return <div>로딩중입니다. ~.~</div>;

  return (
    <Contaier>
      <PaddingBox>
        <MenuBox>
          <IoIosArrowBack size={'24px'} />
          <span>{data?.toUserNickname}</span>
          <RxExit size={'22px'} />
        </MenuBox>
      </PaddingBox>
      <Center>
        <ChatBox ref={scrollRef}>
          {testMessges.map((item, index) => {
            return (
              <Chatting
                JustifyContent={item.sender === data.toUserNickname}
                key={index}
              >
                <Seserve JustifyContent={item.sender === data.toUserNickname}>
                  <img src={data.senderProfileImage} />
                  <Message JustifyContent={item.sender === data.toUserNickname}>
                    <span>{item.message}</span>
                  </Message>

                  <span>{item.createdAt}</span>
                </Seserve>
              </Chatting>
            );
          })}
        </ChatBox>
      </Center>
      <InputBox>
        <input
          type={'text'}
          placeholder={'메세지를 입력해주세요.'}
          onChange={handleMessage}
          value={message}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              sendMessage();
            }
          }}
        />
        <IoArrowUpCircleOutline
          style={{
            fontSize: '28px',
            position: 'absolute',
            right: '30px',
            zIndex: '100px',
            color: '#1689F3',
          }}
          onClick={sendMessage}
        />
      </InputBox>
    </Contaier>
  );
};

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
  box-sizing: border-box;
  background-color: #f5f5f5;
  height: calc(100% - 150px);
  width: 100%;

  overflow-y: auto;
`;

const Chatting = styled.div<{ JustifyContent: boolean }>`
  display: flex;
  margin: 10px;
  justify-content: ${(props) => (props.JustifyContent ? 'normal' : 'flex-end')};
`;

const Seserve = styled.div<{ JustifyContent: boolean }>`
  display: flex;
  flex-direction: ${(props) =>
    props.JustifyContent ? ' nomal' : 'row-reverse'};

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
`;

const Message = styled.div<{ JustifyContent: boolean }>`
  max-width: 220px;
  padding: 14px;
  margin: ${(props) =>
    props.JustifyContent ? '0 3px 0 10px' : '0 10px 0 3px'};
  align-items: center;
  border-radius: 10px;
  color: ${(props) => (props.JustifyContent ? 'black' : 'white')};

  background-color: ${(props) => (props.JustifyContent ? '#fff' : '#1689F3')};
`;

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
