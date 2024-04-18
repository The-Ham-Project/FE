import { authInstance } from './axios.ts';

export const deleteRental = async (rentalId: number) => {
  const { data } = await authInstance.delete(`/api/v1/rentals/${rentalId}`);
  return data;
};
