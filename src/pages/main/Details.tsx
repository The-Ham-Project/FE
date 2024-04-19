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
import styled, { css } from 'styled-components';
import { FaCamera } from 'react-icons/fa';
import useStore, { useErrorModalStore } from '../../store/store.ts';
import { authInstance } from '../../api/axios.ts';
import { FaMapMarkerAlt } from 'react-icons/fa';
import arrow from '/public/assets/arrow.svg';

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
  rentalImageList: RentalImage[];
}

function Details() {
  const navigate = useNavigate();
  const { rentalId } = useParams();
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  const [item, setItem] = useState<RentalData | null>(null);
  const priceDot = (num: number) =>
    num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const { mutate } = useMutation({
    mutationFn: createChat,
    onSuccess: (response) => {
      navigate(`/comm/${response?.data}`);
    },
    onError: () => {
      console.log('error');
    },
  });
  console.log('로긍ㄴ햇니', isLoggedIn);
  const handleCreateChat = () => {
    if (isLoggedIn === true && item) {
      mutate({ sellerNickname: item!.nickname, rentalId: item!.rentalId });
    } else {
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
      <img
        src={item.rentalImageList[0].imageUrl}
        style={{
          width: '100%',
          height: '100%',
        }}
        alt={`Image 1`}
      />
    ) : (
      <Slider {...settings}>
        {item.rentalImageList.map((image, index) => (
          <div key={index}>
            <img src={image.imageUrl} alt={`Image ${index + 1}`} />
          </div>
        ))}
      </Slider>
    );
  console.log(' isChatButton', item.isChatButton);
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
            <Between>
              <img src={item.profileUrl} alt="Profile" />
              <span>{item.nickname}</span>
            </Between>
            <Between>
              <FaMapMarkerAlt style={{ fontSize: '12px', color: '#1689F3' }} />
              <span className={'district'}>{item.district}</span>
            </Between>
          </TitleBox>
          <PriceBox>
            <span className={'rentalFee'}>
              대여비 {priceDot(item.rentalFee)}원
            </span>
            <span className={'deposit'}>보증금 {priceDot(item.deposit)}원</span>
          </PriceBox>
          <TextBox>
            <h5>{item.title}</h5>
          </TextBox>
          <Text>
            <span>{item.content}</span>
          </Text>
          {isLoggedIn ? (
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

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ImgBox = styled.div`
  width: 100%;
  height: 47%;
  position: relative;
  > img {
    height: 18px;
    width: 20px;
    z-index: 1000;
    position: absolute;
    top: 22px;
    left: 20px;
    cursor: pointer;
  }
`;

export const Img = styled.div`
  width: 100%;
  height: 100%;
`;

export const ContentsBox = styled.div`
  width: 100%;
  height: 53%;
  padding: 0 20px;
  > img {
    width: 100%;
    height: 100%;
  }
`;

export const Contents = styled.div`
  width: 100%;
  height: 100%;
`;

export const TitleBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 82px;
  position: relative;

  &:after {
    content: '';
    border-bottom: 1px solid #d1d1d1;
    position: absolute;
    bottom: 0;
    width: 100%;
    left: 0;
  }
`;
export const Between = styled.div`
  display: flex;
  align-items: center;
  > img {
    border-radius: 100%;
    width: 32px;
    height: 32px;
    margin-right: 8px;
  }
  > span {
    font-size: 20px;
  }
  > .district {
    color: #606060;
    font-size: 15px;
    margin-left: 6px;
  }
`;

export const PriceBox = styled.div`
  height: 69px;
  display: flex;
  align-items: center;
  position: relative;
  > .rentalFee {
    color: #1689f3;
    font-size: 19px;
    margin-right: 12px;
  }
  .deposit {
    color: #808080;
    font-size: 14px;
  }

  &:after {
    content: '';
    border-bottom: 1px solid #d1d1d1;
    position: absolute;
    bottom: 0;
    width: 100%;
    left: 0;
  }
`;

export const TextBox = styled.div`
  margin: 25px 0 25px 0;
  display: flex;
  align-items: center;
  > h5 {
    font-size: 25px;
  }
`;

const Text = styled.div`
  margin-bottom: 46px;
  width: 100%;
  > span {
    font-size: 16px;
  }
`;

const Chat = styled.div<{ $active: boolean }>(
  ({ $active }) => css`
    height: 170px;
    display: ${$active ? 'flex' : 'none'};

    .chatButton {
      display: ${$active ? 'flex' : 'none'};
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 52px;
      background-color: #1689f3;
      border-radius: 31.14px;
      color: white;
      font-size: 15.45px;
      font-family: 'Pretendard';
      font-weight: 500;
      text-align: center;
      border: none;
      cursor: pointer;
    }
  `,
);

const Catting = styled.div`
  height: 170px;

  .chatButton {
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 52px;
    background-color: #1689f3;
    border-radius: 31.14px;
    color: white;
    font-size: 15.45px;
    font-family: 'Pretendard';
    font-weight: 500;
    text-align: center;
    border: none;
    cursor: pointer;
  }
`;
