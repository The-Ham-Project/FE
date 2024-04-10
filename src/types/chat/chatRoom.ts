export interface ChatRoomResponse {
  toUserNickname: string;
  toUserProfileImage: string;
  senderProfileImage: string;
  chatReadResponseDtoList: ChatReadResponseDto[];
}

export interface ChatReadResponseDto {
  chatId: number;
  sender: string;
  message: string;
  createdAt: string;
}
