import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeItemPost } from './itemAPI';
export function useDeleteItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => removeItemPost(id),

    onSuccess: () => {
      console.log('deleted successfully');
    },

    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ['todos'] });
      }
    },
  });
}
