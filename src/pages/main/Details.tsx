import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
  Container,
  Deposit,
  Flex,
  Rental,
} from '../../styles/Details-Styles';
import { useMutation } from '@tanstack/react-query';
import { createChat } from '../../api/chat.ts';

interface RentalImage {
  imageUrl: string;
  createdAt: string;
}

interface ApiResponse {
  status: boolean;
  message: string;
  data: RentalData;
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
  const navigate = useNavigate();
  const { rentalId } = useParams(); 
  const [item, setItem] = useState<RentalData | null>(null); 

  const { mutate } = useMutation({
    mutationFn: createChat,
    onSuccess: () => {
      console.log('성공');
    },
  });

  const handleCreateChat = () => {
    if (item) {
      mutate({ sellerNickname: item!.nickname, rentalId: item!.rentalId });
      navigate(`/comm/${rentalId}`);
    }
  };

  useEffect(() => {
    axios
      .get<ApiResponse>(`https://api.openmpy.com/api/v1/rentals/${rentalId}`)
      .then((response) => {
        console.log('API 호출 후 데이터:', response.data);
        setItem(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching item details:', error);
      });
  }, [rentalId]);

  if (item === null) {
    return <div>Loading...</div>;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Container>
      <Slider {...settings}>
        {item.rentalImageList.map((image, index) => (
          <div key={index}>
            <img
              src={image.imageUrl}
              alt={`Image ${index + 1}`}
              style={{
                maxWidth: '400px',
                maxHeight: '400px',
                width: '100%',
                height: 'auto',
              }}
            />
          </div>
        ))}
      </Slider>

      <Flex>
        <img
          src={item.profileUrl}
          alt="Profile"
          style={{ maxWidth: '50px', maxHeight: '50px', borderRadius: '50%' }}
        />
        <p>{item.nickname}</p>
      </Flex>

      <Flex>
        <Rental>대여비 {item.rentalFee}원</Rental>
        <Deposit>보증금 {item.deposit}원</Deposit>
      </Flex>
      <h3>{item.title}</h3>
      <p>{item.content}</p>

      <p>Category: {item.category}</p>
      <button onClick={handleCreateChat}>채팅하기</button>
    </Container>
  );
}

export default Details;
