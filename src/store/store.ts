import { create } from 'zustand';
import axios, { AxiosResponse } from 'axios';
import { useEffect } from 'react';

interface State {
  pageSize: number;
  pageNumber: number;
  isLoggedIn: boolean;
  selectedCategory: Category;
  isLoading: boolean;
  rentalData: { [key in Category]?: any[] };
  login: () => void;
  logout: () => void;
  getCategoryData: (
    category: Category,
    page: number,
    pageSize: number,
  ) => Promise<any>;
  setPageSize: (pageSize: number) => void;
  setPageNumber: (pageNumber: number) => void; // setPageNumber 함수 추가
}

interface ErrorModalState {
  isOpen: boolean;
  errorMessage: string;

  openModal: (errorMessage: string) => void; // openModal 함수 수정
  closeModal: () => void;
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

const useStore = create<State>((set) => {
  // 초기 isLoggedIn 값을 localStorage에서 가져옵니다.
  const initialIsLoggedIn = !!localStorage.getItem('accessToken');
  // 초기 선택된 카테고리를 ALL로 설정합니다.
  const initialSelectedCategory: Category = 'ALL';

  return {
    pageSize: 4,
    pageNumber: 1,
    isLoggedIn: initialIsLoggedIn,
    selectedCategory: initialSelectedCategory,
    isLoading: false,
    rentalData: {},
    login: () => {
      localStorage.setItem('isLoggedIn', 'true'); // 로그인 시 로컬 스토리지 업데이트
      set({ isLoggedIn: true });
    },
    logout: () => {
      localStorage.setItem('isLoggedIn', 'false'); // 로그아웃 시 로컬 스토리지 업데이트
      set({ isLoggedIn: false });
    },
    getCategoryData: async (category, pageNumber, pageSize) => {
      set({ isLoading: true });

      try {
        const response: AxiosResponse<any> = await axios.get(
          `https://api.openmpy.com/api/v1/rentals?category=${category}&page=${pageNumber}&size=${pageSize}`,
        );

        const newData: any = response.data;
        set((state: State) => ({
          rentalData: { ...state.rentalData, [category]: newData },
          isLoading: false,
        }));
        console.log('게시 성공!');
        return newData;
      } catch (error) {
        console.error('Error fetching category data:', error);
        throw error;
      } finally {
        set({ isLoading: false });
      }
    },
    setPageSize: (pageSize) => set({ pageSize }),
    setPageNumber: (pageNumber) => set({ pageNumber }), // setPageNumber 함수 정의
  };
});

// useEffect를 사용하여 로컬 스토리지의 변경을 감지하고 상태를 업데이트합니다.
export const useLocalStorageEffect = () => {
  useEffect(() => {
    const handleStorageChange = () => {
      // 액세스 토큰이 있는지 확인하여 isLoggedIn 상태 업데이트
      const isLoggedIn = !!localStorage.getItem('accessToken');
      useStore.setState({ isLoggedIn });
    };

    // 로컬 스토리지 변경을 감지하는 리스너를 추가합니다.
    window.addEventListener('storage', handleStorageChange);

    // 컴포넌트가 언마운트될 때 리스너를 제거합니다.
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []); // 의존성 배열이 비어 있으므로 컴포넌트가 처음 렌더링될 때만 실행
};

export const useErrorModalStore = create<ErrorModalState>((set) => ({
  isOpen: false,
  errorMessage: '',

  openModal: (errorMessage) => {
    set({ isOpen: true, errorMessage }); // confirmCallback 저장
  },
  closeModal: () => set({ isOpen: false, errorMessage: '' }), // closeModal 함수 수정
}));

export default useStore;
