import { authInstance } from './axios.ts';
import { createChatItem } from '../types/chat/createChat.type.ts';
import { ChatListType } from '../types/chat/chatList.type.ts';
import { ServerResponse } from '../types/chat/common.type.ts';
import { ChatRoomResponse } from '../types/chat/chatRoom.ts';

export const createChat = async ({
  sellerNickname,
  rentalId,
}: createChatItem) => {
  const { data } = await authInstance.post('/api/v1/chat-rooms', {
    sellerNickname,
    rentalId,
  });
  return data;
};

export const readChatList = async () => {
  const { data } =
    await authInstance.get<ServerResponse<ChatListType>>('/api/v1/chat-rooms');
  return data;
};

export const readChatRoom = async (chatRoomId?: string) => {
  const { data } = await authInstance.get<ServerResponse<ChatRoomResponse>>(
    `/api/v1/chat-rooms/${chatRoomId}`,
  );
  return data;
};
