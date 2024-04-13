import { IoIosArrowBack } from 'react-icons/io';
import { RxExit } from 'react-icons/rx';
import { IoArrowUpCircleOutline } from 'react-icons/io5';
import { readChatRoom } from '../../api/chat.ts';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { MdOutlineCalendarMonth } from 'react-icons/md';
import SockJS from 'sockjs-client';
import { Client, Stomp } from '@stomp/stompjs';
import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import * as ChatStyle from './Chat.styled.tsx';

const Chat = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const params = useParams();
  const [message, setMessage] = useState('');
  const [stompClient, setStompClient] = useState<Client | null>();
  const [testMessges, setTestMessges] = useState([]);
  const [currentPageNo, setCurrentPageNo] = useState(1);

  const navigate = useNavigate();
  const queryChatRoom = useQuery({
    queryKey: ['chatRoom', currentPageNo],
    queryFn: () => readChatRoom(parseInt(params?.chatRoom), currentPageNo),
    select: (response) => response.data,
    enabled: !!params.chatRoom,
  });

  const { data, error, isLoading } = queryChatRoom;

  useEffect(() => {
    if (params.chatRoom) {
      const fetchData = async () => {
        try {
          const response = await readChatRoom(
            parseInt(params?.chatRoom),
            currentPageNo,
          );
          const chatRoomData = response.data;

          const socket = new SockJS('https://api.openmpy.com/chat');
          const client = Stomp.over(socket);

          client.connectHeaders = {
            Authorization: `${localStorage.getItem('accessToken')}`,
          };

          const headers = {
            Authorization: `${localStorage.getItem('accessToken')}`,
            ChatRoomId: `${params?.chatRoom}`,
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
              {
                chatRoomId: `${params.chatRoom}`,
              },
            );
          });

          setStompClient(client);
          setTestMessges(chatRoomData.chatReadResponseDtoList);
          // .reverse();
        } catch (error) {
          console.error('Error fetching chat room data:', error);
        }
      };

      fetchData();
    }
  }, [params.chatRoom]);

  // useEffect(() => {
  //   if (scrollRef.current) {
  //     scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  //   }
  // }, [testMessges]);
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (!isFirstRun.current) {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }
  }, [currentPageNo]);

  useEffect(() => {
    isFirstRun.current = false;
  }, []);

  const handleMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const sendMessage = () => {
    if (message.trim() && stompClient && stompClient.connected) {
      const chatMessage = {
        message: message,
        createAt: new Date(),
      };

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

  // useEffect(() => {
  //   if (queryChatRoom.data) {
  //     const reversedMessages = [...queryChatRoom.data.chatReadResponseDtoList];
  //     // ].reverse();
  //
  //     //  moment(new Date(queryData.createdAt)).format('hh:mm');
  //     setTestMessges((prev) => [...reversedMessages, ...prev]);
  //   }
  // }, [queryChatRoom.data]);
  useEffect(() => {
    if (queryChatRoom.data) {
      const messagesToAdd = [...queryChatRoom.data.chatReadResponseDtoList];

      setTestMessges((prev) => [...prev, ...messagesToAdd]);
    }
  }, [queryChatRoom.data]);

  useEffect(() => {
    const updateIndicator = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const nextPageNo = currentPageNo + 1;
          const isPageEnd = nextPageNo > data.totalPage;

          if (!isPageEnd) {
            setCurrentPageNo(nextPageNo);
          }
        }
      });
    };
    if (indicatorRef?.current && data?.totalPage) {
      const io = new IntersectionObserver(updateIndicator);
      io.observe(indicatorRef.current);
    }
  }, [data?.totalPage, indicatorRef, currentPageNo]);

  if (error) return <div>죄송합니다. 다시 접속해주세요</div>;

  if (isLoading) return <div>로딩중입니다. ~.~</div>;

  const handleClickNavigate = () => {
    navigate('/commlist');
  };

  return (
    <ChatStyle.Container>
      <ChatStyle.MenuBox>
        <div id={'test'} onClick={handleClickNavigate}>
          <IoIosArrowBack size={'24px'} />
        </div>
        <span>{data?.toUserNickname}</span>
        <RxExit size={'22px'} />
      </ChatStyle.MenuBox>
      <ChatStyle.Center ref={scrollRef}>
        <div ref={indicatorRef} className={'indicator'} />
        <ChatStyle.ChatBox>
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
              <div key={index}>
                <ChatStyle.DateSpanBox $active={isDifferentDate}>
                  <span>
                    <MdOutlineCalendarMonth style={{ margin: '0 6px 0 0' }} />
                    {moment(new Date(item.createdAt)).format('YYYY-MM-DD')}
                  </span>
                </ChatStyle.DateSpanBox>
                <ChatStyle.Chatting
                  $active={item.sender === data.toUserNickname}
                >
                  <ChatStyle.Seserve
                    $active={item.sender === data.toUserNickname}
                  >
                    <img
                      src={
                        item.sender === data.toUserNickname
                          ? data.toUserProfileImage
                          : data.senderProfileImage
                      }
                      alt={'프로필'}
                    />
                    <ChatStyle.Message
                      $active={item.sender === data.toUserNickname}
                    >
                      <span>{item.message}</span>
                    </ChatStyle.Message>

                    <span>
                      {moment(new Date(item.createdAt)).format('hh:mm')}
                    </span>
                  </ChatStyle.Seserve>
                </ChatStyle.Chatting>
              </div>
            );
          })}
        </ChatStyle.ChatBox>
        {/*<div ref={indicatorRef} className={'indicator'} />*/}
      </ChatStyle.Center>
      <ChatStyle.InputBox>
        <ChatStyle.Box>
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
        </ChatStyle.Box>
      </ChatStyle.InputBox>
    </ChatStyle.Container>
  );
};

export default Chat;
