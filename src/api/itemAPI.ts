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
// export interface RemoveResponse {
//   resultCode: Result;
//   data: ChatDataProps;
//   message: string;
// }
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

// export const editItemPut = async ({
//   rentalId,
//   updatedItem,
// }: {
//   rentalId: number;
//   updatedItem: ItemDataRes;
// }): Promise<void> => {
//   // 게시글 수정
//   try {
//     await authInstance.put(`/api/v1/rentals/${rentalId}`, updatedItem);
//   } catch (error) {
//     throw error;
//   }
// };

export const removeItemPost = async (rentalId: number) => {
  // 게시글 삭제
  console.log(`Removing ${rentalId}`);
  // const res =
  await authInstance.delete(`api/v1/rentals/${rentalId}`);
  // return res.data;
};

// const getMeetingDetail = async (
//   meetingId: number
// ): Promise<MeetingDetailInfo> => {
//   try {
//     // 토큰 유무 분리
//     const { data } = token
//       ? await authInstance.get(`/api/meetings/meetings/${meetingId}`)
//       : await instance.get(`/api/meetings/meetings/${meetingId}`)
//     return data.data
//   } catch (error) {
//     console.log(error)
//     throw error
//   }
// }
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

export const updatePost = async ({
  // rentalId,
  updatedPost,
}: {
  // rentalId: number;
  updatedPost;
}) => {
  try {
    const response = await authInstance.put(
      `https://api.openmpy.com/api/v1/rentals'${updatedPost.rentalId}`,
      updatedPost,
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export async function deletePost(id) {
  const response = await instance.put(`http://localhost:3000/posts/${id}`, {
    method: 'DELETE',
  });
  return response;
}
