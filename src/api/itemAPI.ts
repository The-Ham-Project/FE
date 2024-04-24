import { useMutation } from '@tanstack/react-query';
import { instance, authInstance } from './axios';
import { ReactNode, useState } from 'react';

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
    const res = await authInstance.post(`/api/v1/rentals`, newItem, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res;
  } catch (error) {
    console.log('error', error);
  }
};

export const removeItemPost = async (rentalId: number) => {
  // 게시글 삭제
  // console.log(`Removing ${rentalId}`);
  // const res = await authInstance.delete(`/api/v1/rentals/${rentalId}`);
  // return res.data;
  const { data } = await authInstance.delete(`/api/v1/rentals/${rentalId}`);
  return data;
};

interface ApiResponse {
  status: boolean;
  message: string;
  data: RentalData;
}

interface RentalData {
  district: ReactNode;
  rentalId: number;
  nickname: string;
  profileUrl: string;
  category: string;
  title: string;
  content: string;
  rentalFee: number;
  deposit: number;
  latitude: number;
  longitude: number;
  rentalImageList: RentalImage[];
}

interface RentalImage {
  imageUrl: string;
  createdAt: string;
}
export async function fetchPosts() {
  const response = await instance.get('/api/v1/rentals');
  return response.data.data;
}
export const fetchPost = async ({ rentalId }) => {
  console.log(rentalId);

  // const [item, setItem] = useState<RentalData | null>(null);
  const response = await instance
    .get(`/api/v1/rentals/${rentalId}`)
    .then((response) => {
      console.log('API 호출 후 데이터:', response.data);
      // setItem(response.data.data);
    })
    .catch((error) => {
      console.error('Error fetching item details:', error);
      // console.log(response.data)
    });
  return response;
};

export async function updatePost(postData) {
  try {
    const response = await authInstance.put(
      `/api/v1/rentals/${postData.rentalId}`,
      postData.formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      },
    );
    return response;
  } catch (error) {
    throw new Error('게시글을 수정하는 중 오류가 발생했습니다.');
  }
}
