import { IoIosArrowBack } from 'react-icons/io';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { readChatList } from '../../api/chat.ts';
import { useNavigate } from 'react-router-dom';
import { ChatReadResponseDto } from '../../types/chat/chatList.type.ts';
function ChatList() {
  const navigate = useNavigate();
  const queryChatList = useQuery({
    queryKey: ['chatList', currentPageNo],
    queryFn: (readChatList, currentPageNo),
    select: (response) => response.data,
  });
  const { data, error, isLoading } = queryChatList;

  if (error) return <div>죄송합니다.다시 접속해주세요!</div>;

  if (isLoading) return <div>로딩주웅 ~.~</div>;
  return (
    <Contaier>
      <PaddingBox>
        <MenuBox>
          <IoIosArrowBack size={'24px'} />
          <span>메세지</span>
        </MenuBox>
      </PaddingBox>
      {data.ChatReadResponseDto.map((item) => (
        <ListBox
          key={item.chatRoomId}
          onClick={() => {
            navigate(`/comm/${item.chatRoomId}`);
          }}
        >
          <FlexBox>
            <ImgBox>
              <img src={item.toMemberProfileUrl} />
            </ImgBox>
            <TextBox>
              <FlexBox>
                <span>{item?.toMemberNickName}</span>
                {/*<span>동네</span>*/}
              </FlexBox>
              <Btween>
                <span>{item?.lastMessage}</span>
                <div>2</div>
              </Btween>
            </TextBox>
          </FlexBox>
        </ListBox>
      ))}
    </Contaier>
  );
}

export default ChatList;

const Contaier = styled.div`
  width: 100%;
  height: 100%;
`;

const MenuBox = styled.div`
  display: flex;
  background-color: #f5f5f5;
  height: 60px;
  width: 100%;
  align-items: center;
  > span {
    display: flex;
    justify-content: center;
    width: 100%;
  }
`;
const PaddingBox = styled.div`
  padding: 0 20px;
  background-color: #f5f5f5;
  box-shadow: 0 0 20px 0px rgba(100, 100, 111, 0.2);
`;

const ListBox = styled.div`
  height: 100px;
  display: flex;
  padding: 20px;
  align-items: center;
  position: relative;
  &:after {
    content: '';
    border-bottom: 1px solid #f5f5f5;
    position: absolute;
    bottom: 0;
    width: 90%;
    left: 5%;
  }
`;

const ImgBox = styled.div`
  width: 54px;
  margin: 0 15px 0 0;
  > img {
    width: 54px;
    height: 54px;
    border-radius: 100%;
  }
`;

const FlexBox = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  > span {
    font-size: 13px;
    margin: 0 0 10px 0;
  }
`;

const Btween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  > span {
    font-size: 15px;
    text-overflow: ellipsis;
    height: 14px;
    width: 70%;
    overflow: hidden;
    -webkit-line-clamp: 1;
    word-break: break-word;
    -webkit-box-orient: vertical;
    display: -webkit-box;
  }
  > div {
    display: flex;
    justify-content: center;
    color: #fff;
    border-radius: 100%;
    align-items: center;
    height: 20px;
    width: 20px;
    font-size: 15px;
    background-color: #1689f3;
  }
`;

const TextBox = styled.div`
  width: 100%;
`;
