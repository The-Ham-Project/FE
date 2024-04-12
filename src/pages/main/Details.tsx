import { ReactNode, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
  Contentitem,
  Deposit,
  Flex,
  Flexbetween,
  Flexnickname,
  Rental,
  Title,
} from '../../styles/Details-Styles';
import { useMutation } from '@tanstack/react-query';
import { createChat } from '../../api/chat.ts';
import styled from 'styled-components';
import { FaCamera } from 'react-icons/fa';

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
  district: ReactNode;
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
        // console.log(response.data)
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
    slickNext: false,
    arrows: false,
  };

  const images =
  item.rentalImageList.length === 0 ? (
    <div>
      {/* 이미지가 없는 경우에 보여줄 요소 */}
      <FaCamera
        size={24}
        color="#B1B1B1"
        style={{
          maxWidth: '330px',
          maxHeight: '330px',
          width: '100%',
          height: '50px',
          objectFit: 'cover',
          paddingTop: '150px',
          paddingBottom: '150px',
          backgroundColor: '#ececec',
          borderRadius: '20px',
        }}
      />
    </div>
  ) : item.rentalImageList.length === 1 ? (
    <div>
      <img
        src={item.rentalImageList[0].imageUrl}
        alt={`Image 1`}
        style={{
          maxWidth: '330px',
          maxHeight: '330px',
          width: '100%',
          height: '330px',
          objectFit: 'contain',
          borderRadius: '20px',
          paddingBottom: '10px',
        }}
      />
    </div>
  ) : (
    <Slider {...settings}>
      {item.rentalImageList.map((image, index) => (
        <div key={index}>
          <img
            src={image.imageUrl}
            alt={`Image ${index + 1}`}
            style={{
              maxWidth: '330px',
              maxHeight: '330px',
              width: '100%',
              height: '330px',
              objectFit: 'contain',
              borderRadius: '20px',
              paddingBottom: '10px',
            }}
          />
        </div>
      ))}
    </Slider>
  );

  return (
    
    <DetailsContainer>
      <ImageContainer>{images}</ImageContainer>

      <Flexbetween>
        <Flexnickname>
          <img
            src={item.profileUrl}
            alt="Profile"
            style={{ maxWidth: '50px', maxHeight: '50px', borderRadius: '50%' }}
          />
          <p>{item.nickname}</p>
        </Flexnickname>
        <div>
          <p>{item.district}</p>
        </div>
      </Flexbetween>

      <Flex>
        <Rental>대여비 {item.rentalFee}원</Rental>
        <Deposit>보증금 {item.deposit}원</Deposit>
      </Flex>

      <Contentitem>
        <Title>{item.title}</Title>
      </Contentitem>
      <p>{item.content}</p>

      <button onClick={handleCreateChat}>채팅하기</button>
    </DetailsContainer>
  );
}

export default Details;

const DetailsContainer = styled.div`
  padding: 50px;
  overflow-y: scroll;
    height: 100vh;
`;

const ImageContainer = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
`;
