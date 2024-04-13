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
  chatRoomListResponseDto: chatRoomListResponseDto[];
}

export interface chatRoomListResponseDto {
  chatRoomId: number;
  toMemberId: number;
  toMemberNickName: string;
  toMemberProfileUrl: string;
  lastMessage: string;
  lastMessageTime: string;
}
