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
import arrow from '/public/assets/arrow.svg';
import exit from '/public/assets/exit.svg';
import send from '../../../public/assets/send.svg';
import ChatList from '../chatlist/ChatList.tsx';

interface Props {
  successCallback?: () => void;
}

const Chat: React.FC<Props> = ({ successCallback }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const params = useParams();
  const [message, setMessage] = useState('');
  const [stompClient, setStompClient] = useState<Client | null>();
  const [testMessges, setTestMessges] = useState([]);
  const [currentPageNo, setCurrentPageNo] = useState(1);

  // const [isFirst, setIsFirst] = useState(true);

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
      successCallback && successCallback();
    },
  });

  useEffect(() => {
    if (params.chatRoom && !stompClient) {
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
              '/user/queue/error',
              (message) => {
                const receivedMessage = JSON.parse(message.body);
                alert(JSON.stringify(receivedMessage.data.message));
              },
              { chatRoomId: `${params.chatRoom}` },
            ),
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
          console.log('다시시도');
        }
      };

      fetchData();
      return () => {
        const headers = { chatRoomId: `${params?.chatRoom}` };
        client.unsubscribe(`/sub/chat/chatRoom/${params.chatRoom}`, headers);
        client.disconnect();
        (client as Client).deactivate();
        socket.close();

        setStompClient(undefined);
        setTestMessges([]);
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
    if (message.trim() && !!stompClient?.connected) {
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
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    } else {
      console.error('STOMP connection is not established.');
    }
  }, [testMessges]);

  // useEffect(() => {
  //   if (queryChatRoom.data) {
  //     const messagesToAdd = [...queryChatRoom.data.chatReadResponseDtoList];
  //     setTestMessges((prev) => {
  //       return [...messagesToAdd, ...prev];
  //     });
  //   }
  // }, [queryChatRoom.data]);

  useEffect(() => {
    if (queryChatRoom.data) {
      const messagesToAdd = [...queryChatRoom.data.chatReadResponseDtoList];
      setTestMessges((prev) => {
        const existingChatroomIds = prev.map((message) => message.chatId);
        const filteredMessagesToAdd = messagesToAdd.filter(
          (message) => !existingChatroomIds.includes(message.chatId),
        );
        return [...prev, ...filteredMessagesToAdd];
      });
    }
  }, [queryChatRoom.data]);

  useEffect(() => {
    let io: IntersectionObserver | null = null;

    const updateIndicator = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log('감지');
          const nextPageNo = currentPageNo + 1;
          const isPageEnd = nextPageNo > data.totalPage;
          console.log(currentPageNo);
          if (!isPageEnd) {
            setCurrentPageNo(nextPageNo);
          }
        }
      });
    };
    console.log('indicatorRef', indicatorRef.current);
    console.log('data?.totalPage', data?.totalPage);
    console.log(currentPageNo);

    if (indicatorRef?.current && data?.totalPage) {
      console.log('생성');
      const timeoutId = setTimeout(() => {
        io = new IntersectionObserver(updateIndicator);
        io.observe(indicatorRef.current);
      }, 1500);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [data?.totalPage, currentPageNo, indicatorRef]);

  if (error) return <NotFound />;

  if (!isFetchedAfterMount) return <Loading />;

  if (queryChatRoom.error) {
    return <NotFound />;
  }

  const handleClickNavigate = () => {
    navigate('/commlist');
  };
  const handelLeaveButton = () => {
    mutate(parseInt(params?.chatRoom));
    navigate('/commlist');
  };

  return (
    <ChatStyle.Container>
      <ChatStyle.MenuBox>
        <div id={'test'} onClick={handleClickNavigate}>
          <img src={arrow} className={'arrow'} />
        </div>
        <span>{data?.toUserNickname}</span>
        <img src={exit} className={'exit'} onClick={handelLeaveButton} />
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
            <span className={'rentalFee'}>
              대여비 {data.rentalFee.toLocaleString()}원
            </span>
            <span>보증금 {data.deposit.toLocaleString()}원</span>
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
                      {moment(new Date(item.createdAt)).format('HH:mm')}
                    </span>
                  </ChatStyle.Seserve>
                </ChatStyle.Chatting>
              </div>
            );
          })}
        </ChatStyle.ChatBox>
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
          <img src={send} onClick={sendMessage} />
          {/*<IoArrowUpCircleOutline*/}
          {/*  style={{*/}
          {/*    fontSize: '32px',*/}
          {/*    // position: 'absolute',*/}
          {/*    // right: '30px',*/}
          {/*    // zIndex: '100px',*/}
          {/*    color: '#1689F3',*/}
          {/*    padding: '10px',*/}
          {/*    cursor: 'pointer',*/}
          {/*  }}*/}
          {/*  onClick={sendMessage}*/}
          {/*/>*/}
        </ChatStyle.Box>
      </ChatStyle.InputBox>
    </ChatStyle.Container>
  );
};

export default Chat;
