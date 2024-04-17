export interface ChatRoomResponse {
  toUserNickname: string;
  toUserProfileImage: string;
  senderProfileImage: string;
  currentPage: number;
  totalPage: number;
  rentalId: number;
  rentalTitle: string;
  rentalFee: number;
  deposit: number;
  rentalThumbnailUrl: string;
  chatReadResponseDtoList: ChatReadResponseDto[];
}

export interface ChatReadResponseDto {
  chatId: number;
  sender: string;
  message: string;
  createdAt: string;
}
