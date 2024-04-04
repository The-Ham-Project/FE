import { authInstance } from './axios';

export const createItem = async (newItem: any) => {
  // 게시글 작성
  try {
    const res = await authInstance.post(`/item`, newItem, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
