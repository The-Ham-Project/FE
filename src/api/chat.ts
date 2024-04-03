import axios from 'axios';

export const createChat = async (nickname?: string) => {
  const { data } = await axios.post(
    `https://api.openmpy.com/api/v1/chats`,
    nickname,
  );
  return data;
};
