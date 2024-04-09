import React, { useEffect, useState } from 'react';
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
  const [rentals, setRentals] = useState<Rental[] | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const response = await authInstance.get(
          'https://api.openmpy.com/api/v1/rentals/my/posts?page=1&size=4',
        );
        setRentals(response.data.data.content);
        console.log(response.data.data.content);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching rentals:', error);
        setLoading(false);
      }
    };

    fetchRentals();
  }, []);

  return (
    <div>
      <h1>My Page</h1>
      {loading ? (
        <p>Loading...</p>
      ) : !rentals || rentals.length === 0 ? (
        <p>No rentals found.</p>
      ) : (
        <div>
          {rentals.map((rental) => (
            <div key={rental.rentalId}>
              <h2>{rental.title}</h2>
              <p>{rental.content}</p>
              <p>Rental Fee: {rental.rentalFee}</p>
              <p>Deposit: {rental.deposit}</p>
              <img src={rental.firstThumbnailUrl} alt="Rental Thumbnail" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyList;
