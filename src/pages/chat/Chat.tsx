import { IoIosArrowBack } from 'react-icons/io';
import { RxExit } from 'react-icons/rx';
import { IoArrowUpCircleOutline } from 'react-icons/io5';
import { leaveChatRoom, readChatRoom } from '../../api/chat.ts';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import SockJS from 'sockjs-client';
import { Client, Stomp } from '@stomp/stompjs';
import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import * as ChatStyle from './Chat.styled.tsx';
import calender from '/public/assets/calender.svg';
import Loading from '../glitch/Loading.tsx';
import { FaCamera } from 'react-icons/fa';
import NotFound from '../glitch/NotFound.tsx';

const Chat = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const params = useParams();
  const [message, setMessage] = useState('');
  const [stompClient, setStompClient] = useState<Client | null>();
  const [testMessges, setTestMessges] = useState([]);
  const [currentPageNo, setCurrentPageNo] = useState(1);

  // const [isFirst, setIsFirst] = useState(false);

  const navigate = useNavigate();
  const queryChatRoom = useQuery({
    queryKey: ['chatRoom', currentPageNo],
    queryFn: () => readChatRoom(parseInt(params?.chatRoom), currentPageNo),
    select: (response) => response.data,
    enabled: !!params.chatRoom,
  });

  const { data, error, isFetchedAfterMount } = queryChatRoom;

  const { mutate } = useMutation({
    mutationFn: leaveChatRoom,
    onSuccess: () => {
      navigate(-1);
    },
  });

  useEffect(() => {
    if (params.chatRoom) {
      let socket;
      let client;
      const fetchData = () => {
        try {
          socket = new SockJS(import.meta.env.VITE_SERVER_URL + '/chat');
          client = Stomp.over(socket);

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
                  return [...prevMessages, receivedMessage];
                });
              },
              {
                chatRoomId: `${params.chatRoom}`,
              },
            );
          });

          setStompClient(client);
        } catch (error) {
          console.error('Error fetching chat room data:', error);
        }
      };

      fetchData();
      return () => {
        const headers = { chatRoomId: `${params?.chatRoom}` };
        client.unsubscribe({}, headers);
        client.disconnect();
        socket.close();
      };
    }
  }, []);

  // useEffect(() => {
  //   if (data && !isFirst && scrollRef.current) {
  //     console.log('is trigger first scrollT');
  //     scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  //     setIsFirst(true);
  //   }
  // }, [data, isFirst, scrollRef.current]);

  // useEffect(() => {
  //   if (scrollRef.current) {
  //     scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  //   }
  // }, [currentPageNo, scrollRef.current, queryChatRoom.data]);

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
      //   setTestMessges((prevMessages) => [...prevMessages, chatMessage]);
    }
  };
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    } else {
      console.error('STOMP connection is not established.');
    }
  }, [testMessges]);

  useEffect(() => {
    if (queryChatRoom.data) {
      const messagesToAdd = [...queryChatRoom.data.chatReadResponseDtoList];
      setTestMessges((prev) => {
        return [...messagesToAdd, ...prev];
      });
    }
  }, [queryChatRoom.data]);

  // useEffect(() => {
  //   console.log('testMessges:', testMessges);
  // }, [testMessges]);

  useEffect(() => {
    setTestMessges([]);
  }, []);

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

  if (error) return <NotFound />;

  if (!isFetchedAfterMount) return <Loading />;

  const handleClickNavigate = () => {
    navigate(-1);
  };
  const handelLeaveButton = () => {
    mutate(parseInt(params?.chatRoom));
  };
  console.log(data.rentalThumbnailUrl);
  return (
    <ChatStyle.Container>
      <ChatStyle.MenuBox>
        <div id={'test'} onClick={handleClickNavigate}>
          <IoIosArrowBack size={'24px'} />
        </div>
        <span>{data?.toUserNickname}</span>
        <RxExit size={'22px'} onClick={handelLeaveButton} />
      </ChatStyle.MenuBox>
      <ChatStyle.RentalItemBox
        onClick={() => {
          navigate(`/details/${data.rentalId}`);
        }}
      >
        {data.rentalThumbnailUrl ? (
          <img src={data.rentalThumbnailUrl} />
        ) : (
          <FaCamera
            size={24}
            color="#B1B1B1"
            style={{
              height: '20px',
              width: '20px',
              objectFit: 'cover',
              padding: '30px 30px',
              backgroundColor: '#ececec',
              marginRight: '29px',
              borderRadius: '7px',
            }}
          />
        )}
        <ChatStyle.Cloum>
          <h6>{data.rentalTitle}</h6>
          <ChatStyle.Flex>
            <span className={'rentalFee'}>대여비{data.rentalFee}</span>
            <span>보증금{data.deposit}</span>
          </ChatStyle.Flex>
        </ChatStyle.Cloum>
      </ChatStyle.RentalItemBox>
      <ChatStyle.Center ref={scrollRef} id={'scrollRef'}>
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
                    {/*<MdOutlineCalendarMonth style={{ margin: '0 6px 0 0' }} />*/}
                    <img src={calender} />
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
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                sendMessage();
                setMessage('');
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
