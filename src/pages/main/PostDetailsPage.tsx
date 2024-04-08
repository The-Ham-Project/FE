import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dropzone from 'react-dropzone-uploader';
import 'react-dropzone-uploader/dist/styles.css'; // 기본 스타일 가져오기
import './Dropzonestyles.css';

import { authInstance } from '../../api/axios';

// 카테고리 타입 정의
type Category =
  | 'ELECTRONIC'
  | 'HOUSEHOLD'
  | 'KITCHEN'
  | 'CLOSET'
  | 'BOOK'
  | 'COSMETICS'
  | 'PLACE'
  | 'OTHER';

// 카테고리에 대한 이름 정의
const categories: Record<Category, string> = {
  ELECTRONIC: '전자제품',
  HOUSEHOLD: '가정용품',
  KITCHEN: '주방용품',
  CLOSET: '의류/신발',
  BOOK: '도서',
  COSMETICS: '화장품',
  PLACE: '장소',
  OTHER: '기타',
};

function PostDetailsPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState(''); // 게시글 제목 상태
  const [content, setContent] = useState(''); // 게시글 내용 상태
  const [rentalFee, setRentalFee] = useState(''); // 대여비 상태
  const [deposit, setDeposit] = useState(''); // 보증금 상태
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
selectedFiles.forEach(file => {
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
      <div>
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
          inputContent="이미지를 업로드하세요"
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
          inputWithFilesContent={(files) => `${files.length} +`}
        />
      </div>

      <div>물품의 카테고리를 선택해주세요.</div>
      <div>
        <div>
          {Object.entries(categories).map(([key, value]) => (
            <button
              key={key}
              onClick={() => handleCategoryClick(key as Category)}
              style={{
                backgroundColor:
                  selectedCategory === key ? 'lightblue' : 'white',
                border: '1px solid black',
                margin: '5px',
                padding: '5px 10px',
                cursor: 'pointer',
              }}
            >
              {value}
            </button>
          ))}
        </div>
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
          onChange={(e) => setRentalFee(e.target.value)}
        />
      </div>
      <div>보증금</div>
      <div>
        <input
          type="text"
          placeholder="보증금을 입력해주세요"
          value={deposit}
          onChange={(e) => setDeposit(e.target.value)}
        />
      </div>

      <button onClick={handleButtonClick}>게시글 작성</button>
    </>
  );
}

export default PostDetailsPage;
