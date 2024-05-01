import { FC, useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { TiHeartOutline, TiHeartFullOutline } from 'react-icons/ti';
import { authInstance } from '../../api/axios.ts';

interface LikeButtonProps {
  rentalId: number;
  initialLiked: boolean;
}

const LikeButton: FC<LikeButtonProps> = ({ rentalId, initialLiked }) => {
  const [liked, setLiked] = useState<boolean>(initialLiked);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [animate, setAnimate] = useState<boolean>(false);

  // 초기 좋아요 상태와 좋아요 수를 설정합니다.
  useEffect(() => {
    console.log('초기 좋아요수:', initialLiked);
    setLiked(initialLiked);
    fetchLikeCount();
  }, [initialLiked, rentalId]);

  // 좋아요 수를 가져오는 함수
  const fetchLikeCount = async () => {
    try {
      const response = await authInstance.get(`/api/v1/rentals/likes/${rentalId}`);
      setLikeCount(response.data.data.likeCount);
      console.log('Like 카운트 업데이트:', response.data.data);
    } catch (error) {
      console.error('Error fetching like count:', error);
    }
  };

  // 좋아요 등록 또는 취소하는 함수
  const handleLikeClick = async () => {
    try {
      if (liked) {
        await authInstance.delete(`/api/v1/rentals/likes/${rentalId}`);
        setLiked(false);
        setLikeCount((prevCount) => prevCount - 1);
        console.log('Like cancelled');
      } else {
        await authInstance.post(`/api/v1/rentals/likes/${rentalId}`);
        setLiked(true);
        setLikeCount((prevCount) => prevCount + 1);
        console.log('Like added');
      }
      setAnimate(true); // 애니메이션 트리거
    } catch (error) {
      console.error('좋아로 에러:', error);
    }
  };

  return (
    <div onClick={handleLikeClick}>
     
      <div>
        {liked ? (
          <AnimatedHeart animate={animate} />
        ) : (
          <TiHeartOutline style={{ color: 'rgb(206, 206, 206)' , margin: '5px'}} />
        )}
      </div>
    </div>
  );
};

const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

interface AnimatedHeartProps {
  animate: boolean;
}

const AnimatedHeart = styled(TiHeartFullOutline)<AnimatedHeartProps>`
margin: 5px;
  color: #ff3d3d;
  animation: ${({ animate }) => (animate ? pulseAnimation : 'none')} 0.9s linear;
`;

export default LikeButton;
