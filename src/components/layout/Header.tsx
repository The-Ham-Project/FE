import { IoIosArrowBack } from 'react-icons/io';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const handleBackClick = () => navigate(-1);
  return (
    <MenuBox>
      <IoIosArrowBack onClick={handleBackClick} size={'24px'} style={{marginTop: '25px'}} />
      <span style={{marginTop: '25px'}}>내가 쓴 글</span>
    </MenuBox>
  );
}

export default Header;
const MenuBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 10vh;
  padding: 0 7%;
  box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.1);
  background-color: #f5f5f5;
  z-index: 1;
  > span {
    width: 69px;
    height: 17px;
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 400;
    font-size: 14.1085px;
    line-height: 17px;
    text-align: center;
    color: #000000;
  }
  @media screen and (max-width: 430px) {
    height: 60px;
    width: 100%;
    margin: 0px;
    padding: 0 20px;
  }
`;
