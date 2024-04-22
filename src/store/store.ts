import { create } from 'zustand';
import axios, { AxiosResponse } from 'axios';

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

const initialIsLoggedIn = !!localStorage.getItem('accessToken');
const initialSelectedCategory: Category = 'ALL';

const useStore = create<State>((set) => ({
  pageSize: 4,
  pageNumber: 1,
  isLoggedIn: initialIsLoggedIn,
  selectedCategory: initialSelectedCategory,
  isLoading: false,
  rentalData: {},
  login: () => set({ isLoggedIn: true }),
  logout: () => set({ isLoggedIn: false }),

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
}));

export const useErrorModalStore = create<ErrorModalState>((set) => ({
  isOpen: false,
  errorMessage: '',

  openModal: (errorMessage, ) => {
    set({ isOpen: true, errorMessage,  }); // confirmCallback 저장
  },
  closeModal: () => set({ isOpen: false, errorMessage: ''}), // closeModal 함수 수정
}));

export default useStore;
