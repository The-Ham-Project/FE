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
} from '../../styles/Details-Styles.ts';
import { useMutation } from '@tanstack/react-query';
import { createChat } from '../../api/chat.ts';
import styled, { css } from 'styled-components';
import useStore, { useErrorModalStore } from '../../store/store.ts';
import { authInstance } from '../../api/axios.ts';
import { FaMapMarkerAlt } from 'react-icons/fa';
import arrow from '/public/assets/arrow.svg';
import LikeButton from '../../components/Main/LikeButton.tsx';
import Camera from '/public/assets/Camera.svg';
import {
  Container,
  ImgBox,
  Img,
  ContentsBox,
  Contents,
  TitleBox,
  Between,
  PriceBox,
  TextBox,
  Text,
  Chat,
  Catting,
} from './Details.style.tsx';

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
  isChatButton: boolean;
  isLike: boolean;
  rentalImageList: RentalImage[];
}

function Details() {
  const navigate = useNavigate();
  const { rentalId } = useParams();
  const [item, setItem] = useState<RentalData | null>(null);
  const priceDot = (num: number) =>
    num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const { mutate } = useMutation({
    mutationFn: createChat,
    onSuccess: (response) => {
      navigate(`/comm/${response?.data}`);
      // window.location.reload();
    },
    onError: () => {
      console.log('error');
    },
  });

  const handleCreateChat = () => {
    if (localStorage.getItem('accessToken')) {
      mutate(item!.rentalId);
    } else if (localStorage.getItem('accessToken') === null || undefined) {
      navigate('/sociallogin');
    }
  };

  useEffect(() => {
    authInstance
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
  };

  const images =
    item.rentalImageList.length === 0 ? (
      <div>
        {/* 이미지가 없는 경우에 보여줄 요소 */}
        <div
          style={{
            width: '100%',
            maxHeight: '390px',
            backgroundColor: '#ececec',
            paddingTop: '150px',
            paddingBottom: '150px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {' '}
          <img src={Camera} />
        </div>
      </div>
    ) : item.rentalImageList.length === 1 ? (
      <img
        src={item.rentalImageList[0].imageUrl}
        style={{
          maxHeight: '390px',
          outline: 'none',
          objectFit: 'cover',
        }}
        alt={`Image 1`}
      />
    ) : (
      <Slider {...settings}>
        {item.rentalImageList.map((image, index) => (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            key={index}
          >
            <img
              key={index}
              src={image.imageUrl}
              alt={`Image ${index + 1}`}
              style={{
                display: 'flex',
                alignContent: 'center',
                alignItems: 'center',
                width: '100%',
                objectFit: 'cover',
                outline: 'none',
                height: '390px',
                maxHeight: '390px',
              }}
            />
          </div>
        ))}
      </Slider>
    );
  console.log(' isChatButton', item.rentalId);
  const isChatButton = item.isChatButton;

  return (
    <Container>
      <ImgBox>
        <Img>{images}</Img>
        <img
          onClick={() => {
            navigate(-1);
          }}
          src={arrow}
        />
      </ImgBox>
      <ContentsBox>
        <Contents>
          <TitleBox>
            <div style={{ display: 'flex' }}>
              <Between>
                <img src={item.profileUrl} alt="Profile" />
                <span>{item.nickname}</span>
              </Between>
              <Between>
                <FaMapMarkerAlt
                  style={{ fontSize: '12px', color: '#1689F3' }}
                />
                <span className={'district'}>{item.district}</span>
              </Between>
            </div>
            <div style={{ fontSize: '30px' }}>
              <LikeButton rentalId={item.rentalId} initialLiked={item.isLike} />
            </div>
          </TitleBox>
          <PriceBox>
            <span className={'rentalFee'}>
              대여비 {priceDot(item.deposit)}원
            </span>
            <span className={'deposit'}>
              보증금 {priceDot(item.rentalFee)}원
            </span>
          </PriceBox>
          <TextBox>
            <h5>{item.title}</h5>
          </TextBox>
          <Text>
            <pre style={{ overflowWrap: 'break-word', whiteSpace: 'pre-wrap' }}>
              {item.content}
            </pre>
          </Text>
          {localStorage.getItem('accessToken') ? (
            <Chat $active={isChatButton}>
              <button className={'chatButton'} onClick={handleCreateChat}>
                채팅하기
              </button>
            </Chat>
          ) : (
            <Catting>
              <button className={'chatButton'} onClick={handleCreateChat}>
                채팅하기
              </button>
            </Catting>
          )}
        </Contents>
      </ContentsBox>
    </Container>
  );
}

export default Details;
