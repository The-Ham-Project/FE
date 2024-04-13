import { useState, useEffect } from 'react';
import { FaCamera } from 'react-icons/fa';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router';
// import { editItemPut } from '../../api/itemAPI';
import styled from 'styled-components';
import Dropzone from 'react-dropzone-uploader';

import { instance, authInstance } from '../../api/axios';
import PostDetailsPage from '../main/PostDetailsPage';
import { updatePost, fetchPost } from '../../api/itemAPI';

export interface UpdatedItem {
  rentalId: number;
  title: string;
  category: string;
  contents: string;
  price: number;
}

interface RentalImage {
  imageUrl: string;
  createdAt: string;
}

// 카테고리 타입 정의
type Category =
  | 'ELECTRONIC'
  | 'HOUSEHOLD'
  | 'KITCHEN'
  | 'CLOSET'
  | 'BOOK'
  | 'PLACE'
  | 'OTHER';

// 카테고리에 대한 이름 정의
const categories: Record<Category, string> = {
  ELECTRONIC: '가전제품',
  HOUSEHOLD: '가구용품',
  KITCHEN: '주방용품',
  CLOSET: '의류',
  BOOK: '책',
  PLACE: '장소',
  OTHER: '기타',
};
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
function Edit() {
  const [title, setTitle] = useState<string>(''); // 게시글 제목 상태
  const [content, setContent] = useState<string>(''); // 게시글 내용 상태
  const [rentalFee, setRentalFee] = useState<number>();
  const [deposit, setDeposit] = useState<number>(); // 보증금 상태
  // const [rentalId, setRentalId] = useState<number>(); // 보증금 상태
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]); // 선택한 파일 상태 (배열)
  const [selectedCategory, setSelectedCategory] = useState(); // 선택한 카테고리 상태
  const [item, setItem] = useState<RentalData | null>(null);
  // const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState({
    title: '',
    content: '',
  });

  const { rentalId } = useParams();
  // const { rentalId } = useParams<{ rentalId: any }>();
  // console.log(rentalId);

  // const queryClient = useQueryClient();
  const navigate = useNavigate();
  // const { isLoading, isError, data, error } = useQuery({
  //   queryKey: ['data', rentalId],
  //   queryFn: () => fetchPost(rentalId),
  // });
  const page = 1; // 페이지당 아이템 수
  // const selectedCategory = 'ALL'; // 선택된 카테고리

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['rentals', rentalId],
    queryFn: async () => {
      const response = await instance.get(`/api/v1/rentals/${rentalId}`);
      console.log('API 호출 후 데이터:', response.data);
      console.log(response.data.data);
      console.log(response.data.data.title);
      return response.data.data;
    },
  });

  const editMutation = useMutation({
    mutationFn: async (updatedItem: any) => {
      await editItemPut({ rentalId: Number(rentalId), updatedItem });
    },
    onSuccess: (res) => {
      console.log('res', res);
      navigate('/mylist');
    },
    onError: (error) => {
      console.log('error', error);
    },
  });

  // 카테고리 클릭 시 상태 업데이트 함수
  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category);
  };

  // FormData 객체 생성
  const formData = new FormData();
  // 게시 버튼 클릭 시 실행되는 함수
  const handleButtonClick = () => {
    if (!title) {
      alert('제목을 작성해주세요');
      return;
    }
    if (!selectedCategory) {
      alert('카테고리를 선택해주세요.');
      return;
    }

    // requestDto 객체 생성
    const requestDto = {
      title: title,
      category: selectedCategory,
      content: content,
      rentalFee: rentalFee,
      deposit: deposit,
    };

    // requestDto 객체를 JSON 문자열로 변환하여 FormData에 추가
    formData.append('requestDto', JSON.stringify(requestDto));

    // 파일들을 FormData에 추가
    selectedFiles.forEach((file) => {
      formData.append('multipartFileList', file);
    });

    // 서버에 데이터 전송
    authInstance
      .put('https://api.openmpy.com/api/v1/rentals', formData)
      .then((response) => {
        console.log('서버 응답:', response.data);
        alert('게시글을 성공적으로 수정했습니다.');
        navigate('/');
      })
      .catch((error) => {
        console.error('에러 발생:', error);
        alert('게시글 수정에 실패했습니다');
      });
  };

  // const getProduct = async () => {
  //   setIsLoading(true);
  //   try {
  //     const response = await authInstance.get(
  //       `https://api.openmpy.com/api/v1/rentals/${rentalId}`,
  //     );
  //     setProduct({
  //       title: response.data.name,
  //       content: response.data.quantity,
  //     });
  //     setIsLoading(false);
  //   } catch (error) {
  //     setIsLoading(false);
  //   }
  // };
  const updateProduct = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await authInstance.put(
        `https://api.openmpy.com/api/v1/rentals/${rentalId}`,
        product,
      );
      navigate('/details/:rentalId');
    } catch (error) {
      setIsLoading(false);
    }
  };
  const queryClient = useQueryClient();
  const updatePostMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rentalId'] });
      navigate('/');
    },
    onError: (error) => {
      console.log('error', error);
    },
  });

  const handleSubmit = (updatedPost) => {
    updatePostMutation.mutate({ rentalId, ...updatedPost });
  };

  useEffect(() => {
    if (data) {
      console.log('데이터꼬우우', data);
      console.log('이미지 꼬우', data.rentalImageList);
      console.log('이미지 꼬우', ...data.rentalImageList);
      console.log('카테고리 꼬우', data.category);
      setTitle(data.title);
      setContent(data.content);
      setSelectedFiles(data.rentalImageList);
      setSelectedCategory(data.category);
    }
  }, [data]);

  if (isLoading) return 'loading...';
  if (isError) return `Error: ${error.message}`;
  return (
    <>
      {/* <PostDetailsPage initialValue={data} /> */}
      {/* <form onSubmit={updateProduct}> */}
      <div>
    {selectedFiles.map((file, index) => (
   <img key={index} src={image.imageUrl} alt={`Image ${index}`} />
    ))}
  </div>
      <CustomDropzone>
        <Dropzone
          onChangeStatus={(meta, status) => {
            if (status === 'done') {
              setSelectedFiles((prevFiles) => [...prevFiles, meta.file]);
            } else if (status === 'removed') {
              setSelectedFiles((prevFiles) =>
                prevFiles.filter((file) => file !== meta.file),
              );
            }
          }}
          inputContent={<FaCamera size={24} color="#B1B1B1" />}
          accept="image/*"
          multiple={true}
          initialFiles={data.rentalImage}
          classNames={{
            dropzone: 'dropzone',
            dropzoneActive: 'dz-drag-hover',
            inputLabel: 'needsclick',
            inputLabelWithFiles: 'needsclick',
            preview: 'custom-preview',
            previewImage: 'custom-preview-image',
            submitButton: 'custom-submit-button',
            submitButtonContainer: 'custom-submit-button-container',
          }}
          inputWithFilesContent={(files) => `${files.length}/3`}
          maxFiles={3}
        />
      </CustomDropzone>

      <div>
        <Image>
          {Object.entries(categories).map(([key, value]) => (
            <button
              key={key}
              onClick={() => handleCategoryClick(key as Category)}
              style={{
                backgroundColor: selectedCategory === key ? '' : '#F5F5F5',
                color: selectedCategory === key ? '' : 'black',
                cursor: 'pointer',
                width: '80px',
                height: '30px',
                fontSize: '14px',
              }}
            >
              <Imagine>{value}</Imagine>
            </button>
          ))}
        </Image>
      </div>
      <div>제목</div>
      <div>
        <input
          type="text"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          defaultValue={data.title}
        />
      </div>

      <div>내용</div>
      <div>
        <textarea
          style={{ resize: 'none' }}
          rows={10}
          cols={50}
          placeholder="게시글의 내용을 작성해주세요.부적절한 단어 사용 혹은 금지 물품을 작성할 경우 이용이 제한될 수 있습니다.원활한 쉐어를 위해 내용을 상세하게 작성해주세요."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          defaultValue={data.content}
        />
      </div>
      <div>대여비</div>
      <div>
        <input
          type="text"
          placeholder="대여비를 입력해주세요"
          value={rentalFee}
          onChange={(e) => setRentalFee(parseInt(e.target.value))}
          defaultValue={data.rentalFee}
        />
      </div>
      <div>보증금</div>
      <div>
        <input
          type="text"
          placeholder="보증금을 입력해주세요"
          value={deposit}
          onChange={(e) => setDeposit(parseInt(e.target.value))}
          // onChange={(e) => setProduct({...product, deposit: e.target.value})}
          defaultValue={data.deposit}
        />
      </div>

      <Rectangle>
        <Text onClick={handleButtonClick}>게시글 수정</Text>
      </Rectangle>
      {/* </form> */}
    </>
  );
}
export default Edit;

// 스타일드 컴포넌트를 사용하여 Dropzone 스타일 적용
const CustomDropzone = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: flex-start;
  gap: 69px;
`;

// const Container = styled.div`
//   display: inline-flex;
//   justify-content: center;
//   align-items: flex-start;
//   gap: 69px;
// `;

// const ItemContainer = styled.div`
//   position: relative;
// `;

const Image = styled.div`
  width: 360px;
`;

// const Counter = styled.div`
//   left: 10.5px;
//   top: 218px;
//   text-align: center;
//   color: #b1b1b1;
//   font-size: 36px;
//   font-family: 'Inter';
//   font-weight: 400;
//   word-wrap: break-word;
// `;

// const Group = styled.div`
//   width: 84.2px;
//   height: 112.32px;
//   position: absolute;
//   left: 105.06px;
//   top: 84px;
// `;

const Imagine = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 8px;
  word-break: break-all;
  padding: 10px;
`;

const Rectangle = styled.div`
  width: 371px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1689f3;
  border-radius: 85px;
`;

const Text = styled.button`
  text-align: center;
  color: white;
  font-size: 20px;
`;
