import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Deposit, Flex, Rental } from '../../styles/Details-Styles';
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
  const { rentalId } = useParams(); // useParams를 사용하여 URL에서 rentalId를 추출
  const [item, setItem] = useState<RentalData | null>(null); // RentalData 타입으로 상태 초기화

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

  return (
    <Container>
      {item.rentalImageList && item.rentalImageList.length === 0 && (
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzwsDBA9dpNwSzYVQaI3H56yvEAWRLcqM4toib5euBUT_KDVDqqj1yZhNN80tXVnDRvbo&usqp=CAU" // 기본 이미지 경로 설정
          alt="Default"
          style={{
            maxWidth: '500px',
            maxHeight: '500px',
            width: '100%',
            height: 'auto',
          }}
        />
      )}
      {item.rentalImageList && item.rentalImageList.length > 0 && (
        <div>
          {item.rentalImageList.map((image, index) => (
            <img
              key={index}
              src={image.imageUrl}
              alt={`Image ${index + 1}`}
              style={{
                maxWidth: '500px',
                maxHeight: '500px',
                width: '100%',
                height: 'auto',
              }}
            />
          ))}
        </div>
      )}
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
