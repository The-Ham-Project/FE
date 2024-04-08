import { useNavigate } from 'react-router-dom';
import Category from '../../components/Main/Category';
import Contents from '../../components/Main/Contents';
import Search from '../../components/Main/Search';
import useStore from '../../store/store';

function Main() {
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (isLoggedIn) {
      navigate('/main/PostDetailsPage');
    } else {
      alert('로그인 후에 게시글을 생성할 수 있습니다');
      navigate('/sociallogin');
    }
  };

  return (
    <>
      <Search />
      <Category />
      <Contents />
      <button onClick={handleButtonClick}>+</button>
    </>
  );
}

export default Main;
