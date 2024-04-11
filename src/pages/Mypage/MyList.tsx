import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import styled from 'styled-components';
import { authInstance } from '../../api/axios';
import donotcrythehamzzang from '../../../public/assets/donotcrythehamzzang.svg';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

interface Rental {
  rentalId: number;
  profileUrl: string;
  title: string;
  content: string;
  rentalFee: number;
  deposit: number;
  firstThumbnailUrl: string;
}

function MyList() {

  const navigate = useNavigate();
  const deleteMutation = useMutation<any, any, number>({
    mutationFn: (itemId) => removeItemPost(itemId),
    onSuccess: (res) => {
      console.log('res', res);
      navigate('/');
    },
    onError: (error) => {
      console.log('error', error);
    },
  });

  const page = 1; // 페이지당 아이템 수
  const selectedCategory = 'ALL'; // 선택된 카테고리

  function removeItemPost(rentalId: number): Promise<any> {
    throw new Error('Function not implemented.');
  }
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['rentals', { page }],
    queryFn: async () => {
      const response = await authInstance.get(
        'https://api.openmpy.com/api/v1/rentals/my/posts',
        {
          params: {
            page,
          },
        },
      );
      console.log(response.data.data);
      return response.data.data;
    },
  });
  if (isLoading) {
    return <div>로딩 중...</div>;
  }
  if (isError) {
    return (
      <ErrorPage>
        <img src={donotcrythehamzzang} />
        <MSG>
          페이지를 찾을 수 없습니다. <br />
          <br />
          잠시후 다시 시도해주세요.
        </MSG>
      </ErrorPage>
    );
  }
  return (
    <div>
      <h1>My Page</h1>
      {/* {isLoading ? (
        <p>Loading...</p>
      ) : */}
      {!data || data.length === 0 ? (
        <p>No rentals found.</p>
      ) : (
        <>
          {data.map((data) => (
            <>
              <Link
                to={`/Details/${data.rentalId}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div key={data.rentalId}>
                  <h2>{data.title}</h2>
                  <p>{data.content}</p>
                  <p>Rental Fee: {data.rentalFee}</p>
                  <p>Deposit: {data.deposit}</p>
                  <img src={data.firstThumbnailUrl} alt="Rental Thumbnail" />
                </div>
              </Link>
              <Custom>
                <Link to={`/Details/${data.rentalId}/edit`}>수정</Link>
              </Custom>
            </>
          ))}
        </>
      )}
    </div>
  );
}

export default MyList;

const ErrorPage = styled.div`
  @media screen and (max-width: 430px) {
    /* Group 1394 */

    position: absolute;
    width: 141.1px;
    height: 193.64px;
    left: 125.29px;
    top: 280.25px;
  }
`;

const MSG = styled.div`
  @media screen and (max-width: 430px) {
    /* 페이지를 찾을 수 없습니다. 잠시 후 다시 시도해주세요. */
    position: absolute;
    width: 230px;
    height: 56px;
    left: calc(50% - 230px / 2);
    top: calc(50% + 56px / 2 + 113.25px);
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 22px;
    text-align: center;
    color: #505050;
  }
`;
const Custom = styled.div`
  @media screen and (max-width: 430px) {
  }
`;
