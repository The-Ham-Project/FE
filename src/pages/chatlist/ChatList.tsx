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
  PaddingBox,
  TextBox,
} from './ChatList.style.tsx';
import arrow from '/public/assets/arrow.svg';
import moment from 'moment/moment';

function ChatList() {
  const navigate = useNavigate();
  const indicatorRef = useRef<HTMLDivElement>(null);
  const [currentPageNo, setCurrentPageNo] = useState(1);
  const [chatList, setChatList] = useState([]);

  const queryChatList = useQuery({
    queryKey: ['chatList', currentPageNo],
    queryFn: () => readChatList(currentPageNo),
    select: (response) => response.data,
  });
  const { data, error, isLoading } = queryChatList;

  useEffect(() => {
    if (data && data.chatRoomListResponseDto) {
      setChatList((prevList) => [...data.chatRoomListResponseDto, ...prevList]);
    }
  }, [data]);

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

  if (error) return <div>죄송합니다.다시 접속해주세요!</div>;

  if (isLoading) return <div>로딩주웅 ~.~</div>;
  const handleClickNavigate = () => {
    navigate(-1);
  };

  return (
    <Contaier>
      <PaddingBox>
        <MenuBox>
          <img src={arrow} className={'arrow'} onClick={handleClickNavigate} />
          <span>메세지</span>
        </MenuBox>
      </PaddingBox>
      <List>
        {chatList.map((item) => {
          const isUnread = item.unreadCount !== 0;
          return (
            <ListBox
              key={item.chatRoomId}
              onClick={() => {
                navigate(`/comm/${item.chatRoomId}`);
                window.location.reload();
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
    </Contaier>
  );
}

export default ChatList;
