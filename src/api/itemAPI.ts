import { authInstance } from './axios';

export interface ItemDataRes {
  itemId?: number;
  title: string;
  category: { value: string; label: string };
  contents: string;
  price: number;
}

export const createItem = async (newItem: any) => {
  // 게시글 작성
  try {
    const res = await authInstance.post(`/api/v1/item`, newItem, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res;
  } catch (error) {
    console.log('error', error);
  }
};

export const editItemPut = async ({
  rentalId,
  updatedItem,
}: {
  rentalId: number;
  updatedItem: ItemDataRes;
}): Promise<void> => {
  // 게시글 수정
  try {
    await authInstance.put(`/api/v1/ren/${rentalId}`, updatedItem);
  } catch (error) {
    throw error;
  }
};

export const removeItemPost = async (rentalId: number) => {
  // 게시글 삭제
  try {
    console.log(`Removing ${rentalId}`);
    const res = await authInstance.delete(`/item/${rentalId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
