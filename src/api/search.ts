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
// const searchPosts = async (query: string) => {
// const { data } = await instance.get(`/posts/search?query=${query}`);
// return data;
// };

// export const useSearchedPosts = (query: string) => {
// return useQuery({
// queryKey: ['searchedPosts', query],
// queryFn: () => searchPosts(query),
// });
// };