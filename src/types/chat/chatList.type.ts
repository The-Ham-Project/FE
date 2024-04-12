// export interface ChatListType {
//   chatRoomId: number;
//   toMemberId: number;
//   toMemberNickName: string;
//   toMemberProfileUrl: string;
//   lastMessage: string;
//   lastMessageTime: string;
// }

export interface ChatListType {
  currentPage: number;
  totalPage: number;
  chatReadResponseDtoList: ChatReadResponseDto[];
}

export interface ChatReadResponseDto {
  chatRoomId: number;
  toMemberId: number;
  toMemberNickName: string;
  toMemberProfileUrl: string;
  lastMessage: string;
  lastMessageTime: string;
}
