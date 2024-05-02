import { useQuery } from '@tanstack/react-query';
import { readChatList } from '../../api/chat.ts';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import {
  Btween,
  Contaier,
  FlexBox,
  ImgBox,
  List,
  ListBox,
  MenuBox,
  None,
  PaddingBox,
  TextBox,
} from './ChatList.style.tsx';
import arrow from '/public/assets/arrow.svg';
import moment from 'moment/moment';
import Loading from '../glitch/Loading.tsx';
import NotFound from '../glitch/NotFound.tsx';
import { EventSourcePolyfill } from 'event-source-polyfill';
import sweattheham from '/public/assets/sweattheham.svg';

import Chat from '../chat/Chat.tsx';
const ChatList = () => {
  const navigate = useNavigate();
  const indicatorRef = useRef<HTMLDivElement>(null);
  const [currentPageNo, setCurrentPageNo] = useState(1);
  const [chatList, setChatList] = useState([]);

  const queryChatList = useQuery({
    queryKey: ['chatList', currentPageNo],
    queryFn: () => readChatList(currentPageNo),
    // refetchInterval: 2000,
    staleTime: 0,
    // cacheTime: 0,
    select: (response) => response.data,
  });
  const { data, error, isLoading, refetch } = queryChatList;

  useEffect(() => {
    if (data && data.chatRoomListResponseDto) {
      setChatList((prevList) => {
        const existingChatroomIds = prevList.map(
          (chatRoom) => chatRoom.chatRoomId,
        );
        const filteredChatRooms = data.chatRoomListResponseDto.filter(
          (chatRoom) => !existingChatroomIds.includes(chatRoom.chatRoomId),
        );
        return [...prevList, ...filteredChatRooms];
      });
    }
  }, [data]);

  // useEffect(() => {
  //   console.log('ddd', chatList);
  // }, [chatList]);
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    if (accessToken) {
      const eventSource = new EventSourcePolyfill(
        'https://api.openmpy.com/api/v1/sse',
        {
          headers: {
            Authorization: `${localStorage.getItem('accessToken')}`,
          },
          heartbeatTimeout: 600000,
          withCredentials: true,
        },
      );

      eventSource.addEventListener('sse', (event: any) => {
        const parseData = JSON.parse(event.data);
        console.log(parseData);

        // SSE 이벤트를 받으면 채팅 목록 업데이트
        if (parseData.message === 'UPDATE_CHATROOM') {
          const updatedChatRoom = parseData.data;

          // 채팅 목록에서 업데이트된 채팅룸의 인덱스 찾기
          const index = chatList.findIndex(
            (chatRoom) => chatRoom.chatRoomId === updatedChatRoom.chatRoomId,
          );

          // 찾은 경우 채팅 목록 업데이트
          if (index !== -1) {
            setChatList((prevChatList) => {
              const newChatList = [...prevChatList];
              newChatList[index] = {
                ...newChatList[index],
                lastMessage: updatedChatRoom.lastMessage,
                lastMessageTime: updatedChatRoom.lastMessageTime,
                unreadCount: updatedChatRoom.unreadCount,
              };

              newChatList.sort((a, b) => {
                return (
                  new Date(b.lastMessageTime).getTime() -
                  new Date(a.lastMessageTime).getTime()
                );
              });

              return newChatList;
            });
          }
        }
      });
    }
  }, [accessToken, chatList]);

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

  if (isLoading) return <Loading />;

  const handleClickNavigate = () => {
    navigate('/');
  };

  return (
    <Contaier>
      <PaddingBox>
        <MenuBox>
          <img src={arrow} className={'arrow'} onClick={handleClickNavigate} />
          <span>메세지</span>
        </MenuBox>
      </PaddingBox>
      {data.totalPage === 0 ? (
        <List>
          <None>
            <img src={sweattheham} />
            <span>채팅이 존재하지 않습니다.</span>
            <button
              onClick={() => {
                navigate('/');
              }}
            >
              대여 물품 보러가기
            </button>
          </None>
        </List>
      ) : (
        <List>
          {chatList.map((item) => {
            const isUnread = item.unreadCount !== 0;
            return (
              <ListBox
                key={item.chatRoomId}
                onClick={() => {
                  navigate(`/comm/${item.chatRoomId}`);
                  // window.location.reload();
                }}
              >
                <FlexBox>
                  <ImgBox>
                    <img src={item.toMemberProfileUrl} />
                  </ImgBox>
                  <TextBox>
                    <Btween $active={isUnread}>
                      <span className={'toMemberNickName'}>
                        {item?.toMemberNickName}
                      </span>
                      <span className={'lastMessageTime'}>
                        {moment(new Date(item.lastMessageTime)).format('HH:mm')}
                      </span>
                    </Btween>
                    <Btween $active={isUnread}>
                      <span className={'lastMessage'}>{item?.lastMessage}</span>
                      <div>{item.unreadCount}</div>
                    </Btween>
                  </TextBox>
                </FlexBox>
              </ListBox>
            );
          })}
          <div ref={indicatorRef} className={'indicator'} />
        </List>
      )}
      <Chat
        successCallback={() => {
          refetch();
        }}
      />
    </Contaier>
  );
};

export default ChatList;
