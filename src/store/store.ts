import { create } from 'zustand';
import { Cookies } from 'react-cookie';
import axios from 'axios';

interface State {
  isLoggedIn: boolean;
  selectedCategory: Category | null;
  isLoading: boolean; // 로딩 상태 추가
  login: () => void;
  logout: () => void;
  getCategoryData: (category: Category) => Promise<any>;
}

export type Category =
  | 'ALL'
  | 'ELECTRONIC'
  | 'HOUSEHOLD'
  | 'KITCHEN'
  | 'CLOSET'
  | 'BOOK'
  | 'PLACE'
  | 'OTHER';

const cookies = new Cookies();
const userCookie = cookies.get('user');
const initialIsLoggedIn = !!userCookie;
const initialSelectedCategory: Category = 'ALL';

const useStore = create<State>((set) => ({
  isLoggedIn: initialIsLoggedIn,
  selectedCategory: initialSelectedCategory,
  isLoading: false, // 초기 로딩 상태는 false로 설정
  login: () => set({ isLoggedIn: true }),
  logout: () => set({ isLoggedIn: false }),
  getCategoryData: async (category) => {
    set({ isLoading: true }); // 데이터를 요청하기 전에 로딩 상태를 true로 설정
    try {
      const response = await axios.get(
        `https://api.openmpy.com/api/v1/rentals?category=${category}`,
      );

      return response.data;
    } catch (error) {
      console.error('Error fetching category data:', error);
      throw error;
    } finally {
      set({ isLoading: false }); // 데이터 요청 후에는 항상 로딩 상태를 false로 설정
    }
  },
}));

export default useStore;
