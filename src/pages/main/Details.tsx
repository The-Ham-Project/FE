import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface RentalImage {
  imageUrl: string;
  createdAt: string;
}

interface RentalData {
  rentalId: number;
  nickname: string;
  profileUrl: string;
  category: string;
  title: string;
  content: string;
  rentalFee: number;
  deposit: number;
  latitude: number;
  longitude: number;
  rentalImageList: RentalImage[];
}

function Details() {
  const { rentalId } = useParams(); // useParams를 사용하여 URL에서 rentalId를 추출
  const [item, setItem] = useState<RentalData | null>(null); // RentalData 타입으로 상태 초기화

  useEffect(() => {
    console.log('API 호출 전:', rentalId);
    axios
      .get<RentalData>(`https://api.openmpy.com/api/v1/rentals/${rentalId}`) // RentalData 타입으로 응답 데이터를 받도록 설정
      .then((response) => {
        console.log('API 호출 후 데이터:', response.data);
        setItem(response.data);
      })
      .catch((error) => {
        console.error('Error fetching item details:', error);
      });
  }, [rentalId]);

  useEffect(() => {
    console.log('상태 변경 후:', item);
  }, [item]);

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>{item.title}</h3>
      <p>{item.content}</p>
      <p>Rental Fee: {item.rentalFee}</p>
      <p>Deposit: {item.deposit}</p>
      <p>Category: {item.category}</p>
      <p>Posted by: {item.nickname}</p>
      <img
        src={item.profileUrl}
        alt="Profile"
        style={{ maxWidth: '50px', maxHeight: '50px', borderRadius: '50%' }}
      />
      {item.rentalImageList && item.rentalImageList.length > 0 && (
        <div>
          {item.rentalImageList.map((image, index) => (
            <img key={index} src={image.imageUrl} alt={`Image ${index + 1}`} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Details;
