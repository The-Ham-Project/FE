import create from 'zustand';
import { Cookies } from 'react-cookie';

interface State {
isLoggedIn: boolean;
login: () => void;
logout: () => void;
}
//쿠키에서 사용자 정보를 읽어옴
const cookies = new Cookies();
const userCookie = cookies.get('user');
const initialTsLohggedin = !!userCookie;

//create 함수를 사용하여 상태 저장소를 만들고 초기 상태 설정
const useStore = create<State>((set) => ({
isLoggedIn: initialTsLohggedin,
login: () => set({ isLoggedIn: true }),
logout: () => set({ isLoggedIn: false }),
}));

export default useStore;