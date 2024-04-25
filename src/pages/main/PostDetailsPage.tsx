import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dropzone from 'react-dropzone-uploader';
import 'react-dropzone-uploader/dist/styles.css'; // 기본 스타일 가져오기
import './Dropzonestyles.css';
import { FaCamera } from 'react-icons/fa';
import { authInstance } from '../../api/axios';
import styled from 'styled-components';

// import ALL from '../../../public/assets/ALL.svg';
import Camera from '/public/assets/Camera.svg';
import HOUSEHOLD from '../../../public/assets/HOUSEHOLD.svg';
import KITCHEN from '../../../public/assets/KITCHEN.svg';
import CLOSET from '../../../public/assets/CLOSET.svg';
import BOOK from '../../../public/assets/BOOK.svg';
import PLACE from '../../../public/assets/PLACE.svg';
import OTHER from '../../../public/assets/OTHER.svg';
import Navbar from '../../components/layout/Navbar';

import { IoIosArrowBack } from 'react-icons/io';
import { MenuBox } from '../Mypage/Mypage';
import { Container } from '../../components/layout/DefaultLayout';
import Header from '../../components/layout/Header';
import PostDetailsPageModal from '../../components/modal/PostDetailsPageModal';

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
  HOUSEHOLD: '생활용품',
  KITCHEN: '주방용품',
  CLOSET: '의류',
  ELECTRONIC: '전자제품',
  BOOK: '도서',
  PLACE: '장소',
  OTHER: '기타',
};

function PostDetailsPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState(''); // 게시글 제목 상태
  const [content, setContent] = useState(''); // 게시글 내용 상태
  const [rentalFee, setRentalFee] = useState<number>(0);
  const [deposit, setDeposit] = useState<number>(0); // 보증금 상태
  const [selectedCategory, setSelectedCategory] = useState<Category>(); // 선택한 카테고리 상태
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]); // 선택한 파일 상태 (배열)
  const [missingRequiredInput, setMissingRequiredInput] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const titleInputRef = useRef<HTMLInputElement | null>(null);
  const depositInputRef = useRef<HTMLInputElement | null>(null);
  const rentalFeeInputRef = useRef<HTMLInputElement | null>(null);
  const contentInputRef = useRef<HTMLTextAreaElement | null>(null);
  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

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

  // 카테고리 클릭 시 상태 업데이트 함수
  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category);
  };

  // FormData 객체 생성
  const formData = new FormData();
  const closeModal = () => {
    setShowModal(false);
  };
  // 게시 버튼 클릭 시 실행되는 함수
  const handleButtonClick = () => {
    if (!selectedCategory) {
      setShowModal(true);
      return;
    }
    if (!title) {
      setMissingRequiredInput(true);
      titleInputRef.current?.focus();
      return;
    } else if (!content) {
      setMissingRequiredInput(true);
      contentInputRef.current?.focus();
      return;
    } else if (!rentalFee) {
      setMissingRequiredInput(true);
      rentalFeeInputRef.current?.focus();
      return;
    } else if (!deposit) {
      setMissingRequiredInput(true);
      depositInputRef.current?.focus();
      return;
    }

    // 쉼표 제거 함수
    const removeComma = (value: string | undefined) => {
      return value ? value.replace(/,/g, '') : '';
    };
    const formattedRentalFee = removeComma(rentalFee?.toLocaleString());
    const formattedDeposit = removeComma(deposit?.toLocaleString());

    // requestDto 객체 생성
    const requestDto = {
      title: title,
      category: selectedCategory,
      content: content,
      rentalFee: formattedRentalFee,
      deposit: formattedDeposit,
    };

    // requestDto 객체를 JSON 문자열로 변환하여 FormData에 추가
    formData.append('requestDto', JSON.stringify(requestDto));

    // 파일들을 FormData에 추가
    selectedFiles.forEach((file) => {
      formData.append('multipartFileList', file);
    });

    // 서버에 데이터 전송
    authInstance
      .post('https://api.openmpy.com/api/v1/rentals', formData)
      .then((response) => {
        console.log('서버 응답:', response.data);
        alert('게시글을 성공적으로 추가했습니다.');
        navigate('/');
      })
      .catch((error) => {
        console.error('에러 발생:', error);
        alert('게시글 생성에 실패했습니다');
      });
  };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   onSubmit(post);
  //   setPost({
  //     title: '',
  //     body: '',
  //   });
  // };
  const handleBackClick = () => navigate(-1);
  return (
    <>
      {showModal && <PostDetailsPageModal onClose={closeModal} />}
      <Container>
        <Header text="글 작성" />

        <Wrapper>
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
              inputContent={
                <>
                  <img src={Camera} style={{ margin: '20px' }} />
                  <div style={{ color: '#B1B1B1', fontWeight: '200' }}>
                    (선택)0/3
                  </div>
                </>
              }
              accept="image/*"
              multiple={true}
              classNames={{
                dropzone: 'dropzone',
                dropzoneActive: 'dz-drag-hover',
                inputLabel: 'needsclick2',
                inputLabelWithFiles: 'needsclick',
                preview: 'custom-preview',
                previewImage: 'custom-preview-image',
                submitButton: 'custom-submit-button',
                submitButtonContainer: 'custom-submit-button-container',
              }}
              inputWithFilesContent={(files) => (
                <>
                  <div style={{ display: 'flex', flexDirection: 'column', color: '#969696'}}>
                  <img src={Camera} style={{ margin: '16px 20px 10px 20px' }} />
                    {`(선택)${files.length}/3`}
                  </div>
                </>
              )}
              maxFiles={3}
            />
          </CustomDropzone>
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
                  <Button
                    key={key}
                    onClick={() => handleCategoryClick(key as Category)}
                    style={{
                      backgroundColor:
                        selectedCategory === key ? '' : '#F5F5F5',
                      color: selectedCategory === key ? '#F5F5F5' : '#000000',
                      fontWeight: '10',
                      cursor: 'pointer',
                      width: '80px',
                      height: '30px',
                      fontSize: '14px',
                    }}
                  >
                    <Imagine>{value}</Imagine>
                  </Button>
                ))}
              </Image>
            </div>
            <div
              style={{
                marginBottom: '50px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              <div>
                <div style={{ marginBottom: '8px' }}>제목</div>
                <div>
                  <StyledInput
                    type="text"
                    placeholder="제목을 입력하세요."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    $missingTitle={missingRequiredInput && !title}
                    ref={titleInputRef}
                  />
                </div>
              </div>
              <div>

              <div style={{marginBottom:'8px'}}>내용</div>
                <div style={{width: '100%'}}>

                  <StyledTextarea
                    placeholder={`원활한 쉐어를 위해 내용을 상세하게 작성해주세요.
부적절한 단어 사용 혹은 금지 물품을 작성할 경우 이용이 제한될 수 있습니다.
`}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    $missingContent={missingRequiredInput && !content}
                    ref={contentInputRef}
                  />
                </div>
              </div>

              <div>
                <div style={{ marginBottom: '8px' }}>대여비</div>
                <div>
                  <StyledInput
                    type="text"
                    placeholder="대여비를 입력해주세요."
                    value={rentalFee || ''}
                    onChange={handleRentalFeeChange}
                    $missingRentalFee={missingRequiredInput && !rentalFee}
                    ref={rentalFeeInputRef}
                  />
                </div>
              </div>

              <div>
                <div style={{ marginBottom: '8px' }}>보증금</div>
                <div>
                  <StyledInput
                    type="text"
                    placeholder="보증금을 입력해주세요."
                    value={deposit || ''}
                    onChange={handleDepositChange}
                    $missingDeposit={missingRequiredInput && !deposit}
                    ref={depositInputRef}
                  />
                </div>
              </div>
            </div>
          </Group>
          <Rectangle>
            <Text onClick={handleButtonClick}>작성 완료</Text>
          </Rectangle>
        </Wrapper>
      </Container>
    </>
  );
}

export default PostDetailsPage;

// 스타일드 컴포넌트를 사용하여 Dropzone 스타일 적용
const CustomDropzone = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: flex-start;
  gap: 69px;
`;

export const Wrapper = styled.div`
  padding: 40px 20px 0px 20px;
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
    display: none;
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
interface StyledInputProps {
  $missing?: boolean;
  $missingTitle?: boolean;
  $missingRentalFee?: boolean;
  $missingDeposit?: boolean;
}

const StyledInput = styled.input.attrs<StyledInputProps>((props) => ({
  style: {
    borderColor:
      props.$missingTitle || props.$missingRentalFee || props.$missingDeposit
        ? 'red'
        : 'rgba(22, 137, 243, 1)',
    outlineColor:
      props.$missingTitle || props.$missingRentalFee || props.$missingDeposit
        ? 'rgba(255, 0, 0, 0.5)'
        : 'rgba(22, 137, 243, 1)',
  },
}))<StyledInputProps>`
  color: black;

  &::placeholder {
    color: ${({ $missingTitle, $missingRentalFee, $missingDeposit }) =>
      $missingTitle || $missingRentalFee || $missingDeposit
        ? 'rgba(255, 0, 0, 0.5)'
        : 'rgba(135, 135, 135, 1)'};
  }
`;

interface StyledTextareaProps {
  $missingContent?: boolean;
}

const StyledTextarea = styled.textarea.attrs<StyledTextareaProps>((props) => ({
  style: {
    borderColor: props.$missingContent
      ? 'rgba(255, 0, 0, 0.5)'
      : 'rgba(22, 137, 243, 1)',
    outlineColor: props.$missingContent
      ? 'rgba(255, 0, 0, 0.5)'
      : 'rgba(22, 137, 243, 1)',
    resize: 'none',
  },
}))<StyledTextareaProps>`
  color: black;

  &::placeholder {
    color: ${({ $missingContent }) =>
      $missingContent ? 'rgba(255, 0, 0, 0.5)' : 'rgba(135, 135, 135, 1)'};
  }
`;

export const Image = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 50px;
  @media screen and (max-width: 430px) {
    height: 60px;
    max-width: 500px;
    width: 100%;
    margin: 0px;

  }
  margin-bottom: 50px;
  @media screen and (max-width: 430px) {
    height: 60px;
    max-width: 500px;
    width: 100%;
    margin: 0px;
    margin-bottom: 50px;
    gap: 5px;

  }
`;

const Button = styled.button``;

const Group = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
`;

export const Imagine = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  justify-content: center; /* 텍스트를 버튼 세로 가운데 정렬합니다. */
  align-items: center; /* 텍스트를 버튼 가로 가운데 정렬합니다. */
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

const Text = styled.button`
  text-align: center;
  color: white;
`;
