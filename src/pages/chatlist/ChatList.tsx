import { IoIosArrowBack } from 'react-icons/io';
import styled from 'styled-components';
function ChatList() {
  return (
    <Contaier>
      <PaddingBox>
        <MenuBox>
          <IoIosArrowBack size={'24px'} />
          <span>메세지</span>
        </MenuBox>
      </PaddingBox>
      <ListBox>
        <FlexBox>
          <div>사진</div>
          <TextBox>
            <FlexBox>
              <span>이름</span>
              <span>동네</span>
            </FlexBox>
            <span>채팅내용</span>
          </TextBox>
        </FlexBox>
        <Line></Line>
      </ListBox>
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
