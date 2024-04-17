import { authInstance } from './axios.ts';
import {
  createChatItem,
  CreateChatResponse,
} from '../types/chat/createChat.type.ts';
import { ChatListType } from '../types/chat/chatList.type.ts';
import { ServerResponse } from '../types/chat/common.type.ts';
import { ChatRoomResponse } from '../types/chat/chatRoom.ts';

export const createChat = async ({
  sellerNickname,
  rentalId,
}: createChatItem) => {
  const { data } = await authInstance.post<ServerResponse<CreateChatResponse>>(
    '/api/v1/chat-rooms',
    {
      sellerNickname,
      rentalId,
    },
  );
  return data;
};

export const readChatList = async (currentPageNo: number) => {
  const { data } = await authInstance.get<ServerResponse<ChatListType>>(
    '/api/v1/chat-rooms',
    {
      params: {
        page: currentPageNo,
        size: 20,
      },
    },
  );
  return data;
};

export const readChatRoom = async (
  chatRoomId: number,
  currentPageNo: number,
) => {
  const { data } = await authInstance.get<ServerResponse<ChatRoomResponse>>(
    `/api/v1/chat-rooms/${chatRoomId}`,
    {
      params: {
        page: currentPageNo,
        size: 10,
      },
    },
  );
  return data;
};

export const leaveChatRoom = async (chatRoomId: number) => {
  const { data } = await authInstance.patch(`api/v1/chat-rooms/${chatRoomId}`);
  return data;
};
