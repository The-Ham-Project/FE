import Navbar from '../../components/layout/Navbar.tsx';
import styled from 'styled-components';

function I() {
  return (
    <Com>
      <Navbar></Navbar>
    </Com>
  );
}

export default I;

const Com = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;
