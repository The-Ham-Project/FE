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
import styled from 'styled-components';

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
    onSuccess: (response) => {
      navigate(`/comm/${response?.data}`);
    },
    onError: () => {
      console.log('error');
    },
  });

  const handleCreateChat = () => {
    if (item) {
      mutate({ sellerNickname: item!.nickname, rentalId: item!.rentalId });
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
    <DetailsContainer>
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
      <Button  onClick={handleCreateChat}>채팅하기</Button >
    </DetailsContainer>
  );
}

export default Details;


const DetailsContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;

const ImageContainer = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
`;

const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Button = styled.button`
  width: 100%;
  max-width: 350px;
  height: 52px;
  background-color: #1689f3;
  border-radius: 31.14px;
  color: white;
  font-size: 15.45px;
  font-family: 'Pretendard';
  font-weight: 500;
  text-align: center;
  margin: 20px auto;
  cursor: pointer;

  @media (max-width: 768px) {

    height: 42px;
    font-size: 14px;
    border-radius: 20px;
    margin: 15px auto;
  }
`;