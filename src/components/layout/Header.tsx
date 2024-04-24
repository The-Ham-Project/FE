import { IoIosArrowBack } from 'react-icons/io';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import arrow from '/public/assets/arrow.svg';
function Header({text}) {
  const navigate = useNavigate();
  const handleBackClick = () => navigate(-1);
  return (
    <PaddingBox>
    <MenuBox>
       <img src={arrow} className={'arrow'}
        onClick={handleBackClick}
       
        style={{ position: 'absolute', left: '20px'}}
      />
      <span style={{ }}>{text}</span>
    </MenuBox>
          </PaddingBox>
  );
}

export default Header;
export const MenuBox = styled.div`
  display: flex;
  background-color: #fff;
  height: 60px;
  width: 100%;
  align-items: center;
  justify-content: center;
  > span {
    display: flex;
    justify-content: center;
    width: 100%;
    font-size: 14px;
  }
  > .arrow {
    width: 10px;
    height: 16px;
  }
`;
export const PaddingBox = styled.div`
width: 100%;
position: relative;
  padding: 0 20px;
  background-color: #fff;
  box-shadow: 0 0 20px 0px rgba(100, 100, 111, 0.2);
`;
