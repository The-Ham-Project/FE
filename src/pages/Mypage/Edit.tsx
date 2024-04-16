import React, { useState, useEffect } from 'react';
import { FaCamera } from 'react-icons/fa';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router';
import styled from 'styled-components';
import Dropzone from 'react-dropzone-uploader';
import { instance } from '../../api/axios';
import { updatePost } from '../../api/itemAPI';

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
  HOUSEHOLD: '생활용품',
  KITCHEN: '주방용품',
  CLOSET: '의류',
  BOOK: '책',
  PLACE: '장소',
  OTHER: '기타',
};

interface RentalImage {
  imageUrl: string;
  createdAt: string;
}

interface RentalData {
  rentalId: number;
  nickname: string;
  profileUrl: string;
  category: Category;
  title: string;
  content: string;
  rentalFee: number;
  deposit: number;
  latitude: number;
  longitude: number;
  rentalImageList: any;
}

function Edit() {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [rentalFee, setRentalFee] = useState<number | ''>('');
  const [deposit, setDeposit] = useState<number | ''>('');

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [Files, setFiles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>();
  const { rentalId } = useParams();

  const navigate = useNavigate();
  console.log('이미지', Files);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get(`/api/v1/rentals/${rentalId}`);
        const rentalData = response.data.data;
        setTitle(rentalData.title);
        setContent(rentalData.content);
        setRentalFee(rentalData.rentalFee);
        setDeposit(rentalData.deposit);
        setFiles(rentalData.rentalImageList);
        setSelectedCategory(rentalData.category);
        // const { data }
      } catch (error) {
        console.error('데이터를 불러오는 중 오류가 발생했습니다:', error);
      }
    };

    fetchData();
  }, [rentalId]);

  console.log('카테고리', selectedCategory);
  console.log();
  // const queryClient = useQueryClient();
  // const updatePostMutation = useMutation({
  //   mutationFn: updatePost,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ['rentalId'] });
  //     navigate('/mylist');
  //   },
  //   onError: (error) => {
  //     console.log('error', error);
  //   },
  // });

  const handleSubmit = async () => {
    const formData = new FormData();

    const requestDto = {
      title,
      category: selectedCategory,
      content,
      rentalFee,
      deposit,
    };

    formData.append('requestDto', JSON.stringify(requestDto));

    // 새 이미지가 선택되었는지 확인합니다.
    const hasNewImages = selectedFiles.length > 0;

    // 새 이미지가 선택된 경우, 폼 데이터에 추가합니다.
    if (hasNewImages) {
      console.log('새 이미지가 선택되었습니다.');
      selectedFiles.forEach((file) => {
        console.log('추가할 파일:', file);
        formData.append('multipartFileList', file);
      });
    } else {
      // 새 이미지가 선택되지 않은 경우, 기존 이미지를 폼 데이터에 추가합니다.
      console.log('새 이미지가 선택되지 않았습니다. 기존 이미지를 사용합니다.');
      formData.append('rentalImageList', JSON.stringify(Files));
    }
    // const isAlreadySelected = selectedFiles.some(
    //   (file) => file.name === meta.file.name,
    // );
    // if (isAlreadySelected) {setFiles(rentalImageList);}
    // Array.from(selectedFiles).forEach((myImg) => formData.append('selectedFiles', myImg));
    console.log(selectedFiles);
    try {
      await updatePost({ rentalId: rentalId, formData: formData });
      navigate('/mylist');
    } catch (error) {
      console.error('게시글 수정 오류:', error);
      // 필요에 따라 오류 처리 로직을 추가할 수 있습니다.
    }
    // updatePostMutation.mutate({ rentalId, ...updatedPost });
  };

  // const handleSubmit = (updatedPost) => {
  //   updatePostMutation.mutate({ rentalId, ...updatedPost });
  // };

  const handleValueChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<number | string>>,
  ) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    const numericValue: number | '' = value === '' ? '' : +value;
    const formattedValue: number | string =
      numericValue === '' ? '' : numericValue.toLocaleString();
    setter(formattedValue);
  };

  const handleRentalFeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleValueChange(e, setRentalFee);
  };

  const handleDepositChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleValueChange(e, setDeposit);
  };

  useEffect(() => {
    handleSubmit();
  }, [Files, selectedFiles]);
  return (
    <>
      <CustomDropzone>
        <Dropzone
          onChangeStatus={(meta, status) => {
            if (status === 'done') {
              const isAlreadySelected = selectedFiles.some(
                (file) => file.name === meta.file.name,
              );

              if (!isAlreadySelected) {
                setSelectedFiles([...selectedFiles, meta.file]);
                console.log('setSelectedFiles', setSelectedFiles);
              }
            } else if (status === 'removed') {
              setSelectedFiles((prevFiles) =>
                prevFiles.filter((file) => file !== meta.file),
              );
            } else {
              setSelectedFiles((prevFiles) => prevFiles);
              console.log('setSelectedFiles', setSelectedFiles);
            }
          }}
          // data={data}
          inputContent={
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                marginTop: '-35px',
                gap: '2px',
              }}
            >
              {Files.map((image, index) => (
                <img
                  key={index}
                  src={image.imageUrl}
                  alt={`Image ${index + 1}`}
                  style={{ maxWidth: '100px', maxHeight: '100px' }}
                />
              ))}
            </div>
          }
          accept="image/*"
          multiple={true}
          initialFiles={[]}
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
        {Object.entries(categories).map(([key, value]) => (
          <button
            key={key}
            onClick={() => setSelectedCategory(key as Category)}
            style={{
              backgroundColor:
                String(selectedCategory) === String(key) ||
                String(selectedCategory) === String(value)
                  ? '#258bff'
                  : '#F5F5F5',
              color: selectedCategory === String(key) ? 'white' : 'black',
              cursor: 'pointer',
              width: '80px',
              height: '30px',
              fontSize: '14px',
              fontWeight: selectedCategory === String(key) ? 'bold' : 'normal', // 선택된 카테고리는 볼드체로 표시
            }}
          >
            {value}
          </button>
        ))}
      </div>

      <div>제목</div>
      <input
        type="text"
        placeholder="제목을 입력하세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div>내용</div>
      <textarea
        style={{ resize: 'none' }}
        rows={10}
        cols={50}
        placeholder="게시글의 내용을 작성해주세요."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <div>대여비</div>
      <input
        type="text"
        placeholder="대여비를 입력해주세요"
        value={rentalFee}
        onChange={handleRentalFeeChange}
      />

      <div>보증금</div>
      <input
        type="text"
        placeholder="보증금을 입력해주세요"
        value={deposit}
        onChange={handleDepositChange}
      />

      <Rectangle>
        <button onClick={handleSubmit}>게시글 수정</button>
      </Rectangle>
    </>
  );
}

export default Edit;

const CustomDropzone = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: flex-start;
  gap: 69px;
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
