import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dropzone from 'react-dropzone-uploader';
import 'react-dropzone-uploader/dist/styles.css'; // 기본 스타일 가져오기
import './Dropzonestyles.css';
import { FaCamera } from 'react-icons/fa';
import { authInstance } from '../../api/axios';
import styled from 'styled-components';


import ALL from '../../../public/assets/ALL.png';
import ELECTRONIC from '../../../public/assets/ELECTRONIC.png';
import HOUSEHOLD from '../../../public/assets/HOUSEHOLD.png';
import KITCHEN from '../../../public/assets/KITCHEN.png';
import CLOSET from '../../../public/assets/CLOSET.png';
import BOOK from '../../../public/assets/BOOK.png';
import PLACE from '../../../public/assets/PLACE.png';
import OTHER from '../../../public/assets/OTHER.png';

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
const categories: Record<Category, any> = {
  ELECTRONIC:   <img src={ELECTRONIC}  />,
  HOUSEHOLD: <img src={HOUSEHOLD}  />,
  KITCHEN: <img src={KITCHEN}  />,
  CLOSET: <img src={CLOSET}  />,
  BOOK: <img src={BOOK}  />,
  PLACE: <img src={PLACE}  />,
  OTHER: <img src={OTHER}  />,
};

function PostDetailsPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState(''); // 게시글 제목 상태
  const [content, setContent] = useState(''); // 게시글 내용 상태
  const [rentalFee, setRentalFee] = useState<number>();
  const [deposit, setDeposit] = useState<number>(); // 보증금 상태
  const [selectedCategory, setSelectedCategory] = useState<Category>(); // 선택한 카테고리 상태
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]); // 선택한 파일 상태 (배열)

  console.log('이미지', selectedFiles);
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

  return (
    <>
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
                backgroundColor:
                  selectedCategory === key ? 'lightblue' : 'white',
             
                cursor: 'pointer',
                width: '90px',
                borderRadius: '50%',
           
                
              }}
            >
              <Imagine>
              {value}
              {key}
              </Imagine>
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
        />
      </div>
      <div>대여비</div>
      <div>
        <input
          type="text"
          placeholder="대여비를 입력해주세요"
          value={rentalFee}
          onChange={(e) => setRentalFee(parseInt(e.target.value))}
        />
      </div>
      <div>보증금</div>
      <div>
        <input
          type="text"
          placeholder="보증금을 입력해주세요"
          value={deposit}
          onChange={(e) => setDeposit(parseInt(e.target.value))}
        />
      </div>



      <Rectangle>
      <Text onClick={handleButtonClick}>게시글 작성</Text>
      </Rectangle >

      
    </>
  );
}

export default PostDetailsPage;

// 스타일드 컴포넌트를 사용하여 Dropzone 스타일 적용
const CustomDropzone = styled.div`
  width: 1037px;
  height: 150px;
  display: inline-flex;
  justify-content: center;
  align-items: flex-start;
  gap: 69px;
`;

const Container = styled.div`
  width: 1037px;
  height: 300px;
  display: inline-flex;
  justify-content: center;
  align-items: flex-start;
  gap: 69px;
`;

const ItemContainer = styled.div`
  position: relative;
  width: 300px;
  height: 120px;
  
`;

const Image = styled.div`
  width: 360px;
 
`;

const Counter = styled.div`
  width: 283.81px;
  height: 46.56px;
  position: absolute;
  left: 10.50px;
  top: 218px;
  transform: rotate(0.62deg);
  transform-origin: 0 0;
  text-align: center;
  color: #B1B1B1;
  font-size: 36px;
  font-family: 'Inter';
  font-weight: 400;
  word-wrap: break-word;
`;

const Group = styled.div`
  width: 84.20px;
  height: 112.32px;
  position: absolute;
  left: 105.06px;
  top: 84px;
`;

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
  background: #1689F3;
  border-radius: 85px;
`;

const Text = styled.button`
  text-align: center;
  color: white;
  font-size: 20px;



`;

