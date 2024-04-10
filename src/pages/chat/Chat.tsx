import { IoIosArrowBack } from 'react-icons/io';
import styled, { css } from 'styled-components';
import { RxExit } from 'react-icons/rx';
import { IoArrowUpCircleOutline } from 'react-icons/io5';
import { readChatRoom } from '../../api/chat.ts';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { MdOutlineCalendarMonth } from 'react-icons/md';
import SockJS from 'sockjs-client';
import { Stomp, Client } from '@stomp/stompjs';
import { useEffect, useRef, useState } from 'react';
import moment from 'moment';

//무한 스크롤
//디테일 페이지 , 알림

const Chat = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const params = useParams();
  const [message, setMessage] = useState('');
  const [stompClient, setStompClient] = useState<Client | null>();
  const [testMessges, setTestMessges] = useState([]);

  const navigate = useNavigate();
  const queryChatRoom = useQuery({
    queryKey: ['chatRoom'],
    queryFn: () => readChatRoom(params?.chatRoom),
    select: (response) => response.data,
    enabled: !!params.chatRoom,
  });

  //
  // const getChats = async ({ pageParam = 0 }) => {
  //   const res = await fetch(
  //     `/api/v1/chat-rooms/${params.chatRoom}?page=${pageParam}&size=10`,
  //   );
  //   const data = await res.json();
  //   return { ...data, prevPage: pageParam };
  // };
  //
  // const queryChatRoom = useInfiniteQuery({
  //   queryKey: ['chatRoom'],
  //   queryFn: () => readChatRoom(params?.chatRoom),
  //   select: (response) => response.data,
  //   enabled: !!params.chatRoom,
  //   getNextPageParam: lastPage=> {
  //     if(lastPage.prevPage + 10 > lastPage.ar)
  // },
  // });
  //
  const { data, error, isLoading } = queryChatRoom;

  useEffect(() => {
    if (params.chatRoom) {
      const fetchData = async () => {
        try {
          const response = await readChatRoom(params.chatRoom);
          const chatRoomData = response.data;

          const socket = new SockJS('https://api.openmpy.com/chat');
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

                // receivedMessage.sender = receivedMessage.nickname;
                receivedMessage.createdAt = new Date();
                // moment(new Date()).format('hh:mm');
                //YYYY-MM-DD hh:mm:ss
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
  }, [params.chatRoom]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [testMessges]);

  const handleMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const sendMessage = () => {
    if (message.trim() && stompClient && stompClient.connected) {
      const chatMessage = {
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

      setMessage('');
      // setTestMessges((prevMessages) => [...prevMessages, chatMessage]);
    } else {
      console.error('STOMP connection is not established.');
    }
  };

  useEffect(() => {
    if (queryChatRoom.data) {
      const reversedMessages = [
        ...queryChatRoom.data.chatReadResponseDtoList,
      ].reverse();

      //  moment(new Date(queryData.createdAt)).format('hh:mm');
      setTestMessges(reversedMessages);
    }
  }, [queryChatRoom.data]);

  if (error) return <div>죄송합니다. 다시 접속해주세요</div>;

  if (isLoading) return <div>로딩중입니다. ~.~</div>;

  const handleClickNavigate = () => {
    navigate('/commlist');
    console.log('클릭');
  };

  return (
    <Contaier>
      <PaddingBox>
        <MenuBox>
          <div onClick={handleClickNavigate}>
            <IoIosArrowBack size={'24px'} />
          </div>
          <span>{data?.toUserNickname}</span>
          <RxExit size={'22px'} />
        </MenuBox>
      </PaddingBox>
      <Center>
        <ChatBox ref={scrollRef}>
          {testMessges.map((item, index) => {
            const previousMessageDate =
              index > 0 ? new Date(testMessges[index - 1].createdAt) : null;
            const currentDate = new Date(item.createdAt);
            const isDifferentDate =
              previousMessageDate === null ||
              previousMessageDate.getDate() !== currentDate.getDate() ||
              previousMessageDate.getMonth() !== currentDate.getMonth() ||
              previousMessageDate.getFullYear() !== currentDate.getFullYear();
            return (
              <div>
                <DateSpanBox $active={isDifferentDate}>
                  <span>
                    <MdOutlineCalendarMonth style={{ margin: '0 6px 0 0' }} />
                    {moment(new Date(item.createdAt)).format('YYYY-MM-DD')}
                  </span>
                </DateSpanBox>
                <Chatting
                  $active={item.sender === data.toUserNickname}
                  key={index}
                >
                  <Seserve $active={item.sender === data.toUserNickname}>
                    <img
                      src={
                        item.sender === data.toUserNickname
                          ? data.toUserProfileImage
                          : data.senderProfileImage
                      }
                    />
                    <Message $active={item.sender === data.toUserNickname}>
                      <span>{item.message}</span>
                    </Message>

                    <span>
                      {moment(new Date(item.createdAt)).format('hh:mm')}
                    </span>
                  </Seserve>
                </Chatting>
              </div>
            );
          })}
        </ChatBox>
      </Center>
      <InputBox>
        <Box>
          <textarea
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
              fontSize: '32px',
              // position: 'absolute',
              // right: '30px',
              // zIndex: '100px',
              color: '#1689F3',
              padding: '10px',
            }}
            onClick={sendMessage}
          />
        </Box>
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
    z-index: 100;
    height: 60px;
    width: 100%;
    align-items: center;
    background-color: white;
    > div {
      cursor: pointer;
    }
    > span {
      display: flex;
      font-size: 18px;
      justify-content: center;
      width: 100%;
    }
  }
`;

const PaddingBox = styled.div`
  @media screen and (max-width: 430px) {
    padding: 0 20px;
    position: fixed;
    //box-shadow: 0 8px 29px 0px rgba(100, 100, 111, 0.2);
    width: 100%;
    background-color: white;
  }
`;

const Center = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
  position: fixed;
`;
const ChatBox = styled.div`
  box-sizing: border-box;
  align-items: center;
  background-color: #f5f5f5;
  height: calc(100% - 130px);
  width: 100%;
  overflow-y: auto;
`;

const Chatting = styled.div<{ $active: boolean }>(
  ({ $active }) => css`
    display: flex;
    word-break: break-all;
    margin: 10px;
    justify-content: ${$active ? 'normal' : 'flex-end'};
  `,
);

const Seserve = styled.div<{ $active: boolean }>(
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
const Message = styled.div<{ $active: boolean }>(
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

const InputBox = styled.div`
  @media screen and (max-width: 430px) {
    position: absolute;
    bottom: 0;
    height: 70px;
    padding: 20px 30px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
  }
`;
const Box = styled.div`
  border-radius: 18px;
  background-color: #f5f5f5;
  display: flex;
  height: 50px;
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
const DateSpanBox = styled.div<{ $active: boolean }>(
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
