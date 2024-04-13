import bar from '../../../public/assets/bar.svg';
import styled from 'styled-components';
import { FiPlus } from 'react-icons/fi';
import message from '../../../public/assets/message.svg';
import home from '../../../public/assets/home.svg';

function Navbar() {
  return (
    <Container>
      <img className={'home'} src={home} />
      <img className={'message'} src={message} />
      <div>
        <FiPlus fontSize={'40px'} />
      </div>
      <img className={'bar'} src={bar} />
    </Container>
  );
}

export default Navbar;

const Container = styled.div`
  width: 100%;
  height: 100px;
  position: absolute;
  z-index: 1000;
  bottom: 0;
  > .bar {
    width: 100%;
    margin: 0;
    position: absolute;
    bottom: 0;
    //box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  > .message {
    position: absolute;
    right: 63px;
    bottom: 21px;
    z-index: 102;
    width: 34px;
  }
  .home {
    position: absolute;
    bottom: 21px;
    zindex: 100;
    left: 63px;
    z-index: 103;
    width: 27px;
  }
  > div {
    z-index: 100;
    background-color: #1689f3;
    color: #fff;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    bottom: 43px;
    left: calc(50% - 27px);
    height: 54px;
    width: 54px;
    border-radius: 100%;
  }
`;
