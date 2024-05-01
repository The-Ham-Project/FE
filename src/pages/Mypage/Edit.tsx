import React, { useState, useEffect, useRef } from 'react';
import { FaCamera } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router';
import styled from 'styled-components';
import { instance } from '../../api/axios';
import { updatePost } from '../../api/itemAPI';
import { Container } from '../../components/layout/DefaultLayout';
import { Imagine, Wrapper } from '../main/PostDetailsPage';
import Header from '../../components/layout/Header';
import Camera from '/public/assets/Camera.svg';

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

function Edit() {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [rentalFee, setRentalFee] = useState<number>(0);
  const [deposit, setDeposit] = useState<number>(0);
  const [selectedFiles, setSelectedFiles] = useState<File[] | null>(null);

  const [Files, setFiles] = useState<RentalImage[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>();
  const [imageChanged, setImageChanged] = useState<boolean>(false); // Track if images changed
  const [fileBlobs, setFileBlobs] = useState([]);
  const { rentalId } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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
      } catch (error) {
        console.error('데이터를 불러오는 중 오류가 발생했습니다:', error);
      }
    };
    fetchData();
  }, [rentalId]);
  console.log(selectedCategory);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // 기존의 선택된 파일 목록에 새로운 이미지를 추가하여 업데이트
      setSelectedFiles((prevFiles: File[] | null) => {
        // 새로운 이미지를 포함한 새로운 파일 목록을 생성
        const updatedFiles = Array.from(files);
        // 이전에 선택된 이미지도 추가
        if (prevFiles) {
          updatedFiles.push(...Array.from(prevFiles));
        }
        return updatedFiles;
      });
      setImageChanged(true); // 이미지가 변경되었음을 표시
    } else {
      // 이미지가 변경되지 않았음을 표시
      setImageChanged(false);
    }
  };

  const handleCancelImage = (index) => {
    setSelectedFiles((prevFiles) => {
      const updatedFiles = prevFiles.filter((_, i) => i !== index); // 선택된 이미지 중 해당 인덱스를 제외한 이미지만 유지
      return updatedFiles;
    });
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    const imageUrlList = Files.map((file) => file.imageUrl);

    const removeComma = (value: string | undefined) => {
      return value ? value.replace(/,/g, '') : '';
    };
    const formattedRentalFee = removeComma(rentalFee?.toLocaleString());
    const formattedDeposit = removeComma(deposit?.toLocaleString());

    console.log(imageUrlList);
    const requestDto = {
      title,
      category: selectedCategory,
      content,
      rentalFee: formattedRentalFee,
      deposit: formattedDeposit,
      beforeImageUrlList: imageUrlList,
    };

    const multipartFileList = { Files: imageUrlList };

    formData.append('requestDto', JSON.stringify(requestDto));
    formData.append('multipartFileList', JSON.stringify(multipartFileList));

    // multipartFileList에 파일 추가
    if (selectedFiles) {
      Array.from(selectedFiles).forEach((file) => {
        formData.append('multipartFileList', file);
      });
    }

    try {
      await updatePost({ rentalId: rentalId, formData: formData });
      navigate('/mylist');
    } catch (error) {
      console.error('게시글 수정 오류:', error);
    }
  };

  // 입력 필드에 쉼표를 추가하는 함수
  const formatNumber = (value: number | ''): string => {
    if (value === '') return '';
    return new Intl.NumberFormat().format(value);
  };

  const handleRentalFeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleValueChange(e, setRentalFee);
  };

  const handleDepositChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleValueChange(e, setDeposit);
  };

  const handleValueChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<number | string>>,
  ) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6); // 숫자만 남기고 최대 길이 제한
    const numericValue: number | '' = value === '' ? '' : +value; // 숫자로 변환
    const formattedValue: number | string =
      numericValue === '' ? '' : numericValue.toLocaleString(); // 쉼표 추가
    setter(formattedValue); // 상태 업데이트
  };

  const handleDeleteImage = (indexToRemove: number) => {
    setFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToRemove),
    );
  };

  return (
    <>
      <Container>
        <Header text={'글 수정'} />
        <Wrapper1>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              marginTop: '50px',
              position: 'relative',
            }}
          >
            <div style={{ display: 'flex' }}>
              {Files.map((file, index) => (
                <div key={index}>
                  <img
                    src={file.imageUrl}
                    alt={`Image ${index + 1}`}
                    style={{
                      width: '100px',
                      height: '100px',
                      marginRight: '10px',
                    }}
                  />
                  <Button onClick={() => handleDeleteImage(index)}>x</Button>
                </div>
              ))}
            </div>

            <div>
              {selectedFiles && (
                <div style={{ display: 'flex' }}>
                  {Array.from(selectedFiles).map((file, index) => (
                    <div
                      key={selectedFiles.length - index - 1}
                      style={{
                        width: '100px',
                        height: '100px',
                        marginRight: '10px',
                      }}
                    >
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Image ${index + 1}`}
                        style={{ width: '100px', height: '100px' }}
                      />
                      <Button
                        onClick={() =>
                          handleCancelImage(selectedFiles.length - index - 1)
                        }
                      >
                        x
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <label
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '7px',
                backgroundColor: '#F5F5F5',
                display:
                  Files.length + (selectedFiles ? selectedFiles.length : 0) < 3
                    ? 'flex'
                    : 'none',
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
              }}
              htmlFor="file-upload"
            >
              <img src={Camera} alt={Camera} />
            </label>

            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              ref={fileInputRef}
              style={{
                display:
                  Files.length + (selectedFiles ? selectedFiles.length : 0) < 3
                    ? 'none'
                    : 'none',
              }}
            />
          </div>
          <div
            style={{
              marginTop: '20px',
              width: '300px',
              height: '17px',
              fontStyle: 'normal',
              fontWeight: '900',
              fontSize: '14px',
              lineHeight: '17px',
            }}
          >
            {' '}
            물품의 카테고리를 선택해주세요.
          </div>
          <Group>
            <div>
              <Image>
                {Object.entries(categories).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedCategory(key as Category)}
                    style={{
                      backgroundColor:
                        String(selectedCategory) === String(key) ||
                        String(selectedCategory) === value
                          ? '#258bff'
                          : '#F5F5F5',
                      color: selectedCategory === key ? 'white' : 'black',
                      cursor: 'pointer',
                      width: '80px',
                      height: '30px',
                      fontSize: '14px',
                      fontWeight: selectedCategory === key ? 'bold' : 'normal',
                    }}
                  >
                    <Imagine> {value}</Imagine>
                  </button>
                ))}
              </Image>
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
              style={{ resize: 'none', padding: '10px' }}
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
              value={rentalFee || ''}
              onChange={handleRentalFeeChange}
            />
            <div>보증금</div>
            <input
              type="text"
              placeholder="보증금을 입력해주세요"
              value={deposit || ''}
              onChange={handleDepositChange}
            />
          </Group>
          <Rectangle>
            <Text onClick={handleSubmit}>게시글 수정</Text>
          </Rectangle>
        </Wrapper1>
      </Container>
    </>
  );
}

export default Edit;

const Text = styled.button`
  width: 100%;
  text-align: center;
  color: white;
`;

const Rectangle = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1689f3;
  border-radius: 85px;
`;

const Wrapper1 = styled.div`
  padding: 40px 13px 0px 20px;
  gap: 30px;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  overflow: overlay;
  position: relative;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  padding-bottom: 120px;
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background: rgba(0, 0, 0, 0);
  }

  &::-webkit-scrollbar-track {
    /* 스크롤바 트랙 스타일링 */
  }
  &:hover {
    &::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.2);
    }
  }
`;

const Group = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
`;

export const Image = styled.div`
  width: 350px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 50px;
  @media screen and (max-width: 430px) {
    height: 60px;
    width: 100%;
    margin: 0px;
    padding: 0 20px;
  }
`;
export const Button = styled.div`
  position: absolute;
  width: 10px;
  top: 0px;
  z-index: 10000;
  color: grey;
  cursor: pointer;
  &:hover {
    color: red; /* 호버 시 텍스트 색상 변경 */
  }
`;
