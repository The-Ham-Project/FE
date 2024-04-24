import { instance } from './axios';
import { useQuery } from '@tanstack/react-query';

export const getKeywordList = async (keyword) => {
  return await instance
    .get(`/api/v1/rentals/search?keyword=${keyword}&page=1&size=6`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
