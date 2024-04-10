import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { authInstance } from '../../api/axios';

interface Rental {
  rentalId: number;
  profileUrl: string;
  title: string;
  content: string;
  rentalFee: number;
  deposit: number;
  firstThumbnailUrl: string;
}

const MyList: React.FC = () => {
  const page = 1; // 페이지당 아이템 수
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['rentals', {  page }],
    queryFn: async () => {
      const response = await authInstance.get(
        'https://api.openmpy.com/api/v1/rentals/my/posts',
        {
          params: {
  
            page,
          },
        },
      );
      console.log(response.data);
      return response.data;
    },
  });

  return (
    <div>

    </div>
  );
};

export default MyList;
