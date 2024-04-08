import { IoIosArrowBack } from 'react-icons/io';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { readChatList } from '../../api/chat.ts';
import { useNavigate } from 'react-router-dom';
function ChatList() {
  const navigate = useNavigate();
  const queryChatList = useQuery({
    queryKey: ['chatList'],
    queryFn: readChatList,
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
      {data?.map((item) => (
        <ListBox
          key={item.chatRoomId}
          onClick={() => {
            navigate(`/comm/${item.chatRoomId}`);
          }}
        >
          <FlexBox>
            <div>사진</div>
            <TextBox>
              <FlexBox>
                <span>{item?.toMemberNickName}</span>
                <span>동네</span>
              </FlexBox>
              <span>{item?.lastMessage}</span>
            </TextBox>
          </FlexBox>
          <Line></Line>
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
`;
export const Line = styled.hr`
  border: 1px solid #f5f5f5;
  width: 86%;
`;
const ListBox = styled.div``;
const FlexBox = styled.div`
  display: flex;
`;

const TextBox = styled.div``;
