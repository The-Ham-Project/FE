import React, { useState, useEffect, useRef } from 'react';
import { FaCamera } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router';
import styled from 'styled-components';
import { instance } from '../../api/axios';
import { updatePost } from '../../api/itemAPI';
import { Container } from '../../components/layout/DefaultLayout';
import { Wrapper } from '../main/PostDetailsPage';

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
  const [rentalFee, setRentalFee] = useState<number | ''>('');
  const [deposit, setDeposit] = useState<number | ''>('');
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
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
        //  // 파일들을 blob 형태로 변환하여 저장
        //  const blobs = await Promise.all(rentalData.rentalImageList.map(async (file) => {
        //   const blobResponse = await fetch(file.url);
        //   return blobResponse.blob();
        // }));
        // setFileBlobs(blobs);
      } catch (error) {
        console.error('데이터를 불러오는 중 오류가 발생했습니다:', error);
      }
    };
    fetchData();

  }, [rentalId]);
  console.log( selectedCategory)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setSelectedFiles(files);
      setImageChanged(true); // 이미지가 변경되었음을 표시
    } else {
      setImageChanged(false); // 이미지가 변경되지 않았음을 표시
    }
  };

  const handleCancelImage = () => {
    setSelectedFiles(null); // 이미지 선택 초기화
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // input 요소 초기화
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    const imageUrlList = Files.map(file => file.imageUrl);

  console.log(imageUrlList)
    const requestDto = {
      title,
      category: selectedCategory,
      content,
      rentalFee,
      deposit,
      beforeImageUrlList: imageUrlList
    
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

  // Array.from(Files).forEach((file) => {
  //   formData.append('rentalImageList', JSON.stringify(file)); // 파일을 추가
  //   // JSON.stringify 하면 지금
  // });

 

//  Files.forEach((file) => {
//     formData.append('multipartFileList', JSON.stringify(file)); // 파일을 추가
//     // JSON.stringify 하면 지금
//   });
  
  // Files.forEach(async (file) => {
  //   try {
  //     // 백엔드에서 이미지 URL을 가져오는 요청을 보냄
  //     const response = await instance.get(`/api/v1/rentals/${rentalId}`);
  //     const rentalData = response.data;
  //     console.log(rentalData);
  //     console.log('imageUrl', rentalData.data.rentalImageList);
  
  //     // rentalImageList가 존재하는지 확인
  //     if (rentalData.data.rentalImageList) {

  //       // rentalImageList에서 파일의 imageUrl과 일치하는 이미지 객체를 찾음
  //       const imageUrl = rentalData.data.rentalImageList.find(image => image.imageUrl === file.imageUrl)?.imageUrl;
  //       console.log('rentalImageList에서 파일의 imageUrl과 일치하는 이미지 객체를 찾음', imageUrl);
  
  //       if (imageUrl) {
  //         console.log('')
  //         const blob = await imageUrl.blob();
  //         console.log(blob)
  //         formData.append('multipartFileList', blob); 
  //       } else {
  //         console.error(`파일 ${file.imageUrl}의 이미지 URL을 찾을 수 없습니다.`);
  //       }
  //     } else {
  //       console.error('rentalImageList가 없습니다.');
  //     }
  //   } catch (error) {
  //     console.error('이미지를 가져오는 중 오류 발생:', error);
  //   }
  // });
  
  
  //  // 기존 이미지 파일 추가
  //  Files.forEach(async (file) => {
  //   try {
  //     const response = await fetch(file.imageUrl);
  //     const blob = await response.blob();
  //     formData.append('multipartFileList', blob);
  //   } catch (error) {
  //     console.error('이미지를 불러오는 중 오류 발생:', error);
  //   }
  // });


  // // 기존 이미지 파일 추가
  // Files.forEach((file) => {
  //   fetch(file.imageUrl)
  //     .then(response => response.blob()) 
  //     .then(blob => {
  //       const newFormData = new FormData();
  //       newFormData.append('multipartFileList', blob, file.imageUrl); 
  //       formData.append('multipartFileList', JSON.stringify(newFormData));
  //     })
  //     .catch(error => {
  //       console.error('Error fetching image:', error);
  //     });
  // });
  
  // Files.forEach((file) => {
  //   const newFormData = new FormData();
  //   console.log(file.imageUrl)
  //   newFormData.append('multipartFileList', file.imageUrl);
  //   console.log(newFormData)
  //   formData.append('multipartFileList', JSON.stringify(newFormData));
  //   console.log(formData)
  // });
 


  try {
    await updatePost({ rentalId: rentalId, formData: formData });
    navigate('/mylist');
  } catch (error) {
    console.error('게시글 수정 오류:', error);
  }
};
  const handleValueChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<number | string>>,
  ) => {
    let value = e.target.value.replace(/\D/g, '').slice(0, 6);
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

  const handleDeleteImage = (indexToRemove: number) => {
    setFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToRemove),
    );
  };

  return (
    <>
       <Container>
        <Wrapper1>
        <div style={{display: 'flex'}}>
      <div style={{display: 'flex'}}>
        {Files.map((file, index) => (
          <div key={index}>
            <img
              src={file.imageUrl}
              alt={`Image ${index + 1}`}
              style={{ maxWidth: '100px', maxHeight: '100px' }}
            />
            <button onClick={() => handleDeleteImage(index)}>삭제</button>
          </div>
        ))}
      </div>
     
      <div>
        {selectedFiles && (
            <div style={{display: 'flex'}}>
            {Array.from(selectedFiles).map((file, index) => (
              <div key={index}>
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Image ${index + 1}`}
                  style={{ maxWidth: '100px', maxHeight: '100px' }}
                />
                <button onClick={() => handleCancelImage()}>삭제</button>
              </div>
            ))}
          </div>
        )}
      </div>
      <label style={{width: '100px',height: '100px'  ,backgroundColor: 'Highlight', display: 'inline-block' }} htmlFor="file-upload">
  <FaCamera size={24} />
</label>

<input
  id="file-upload"
  type="file"
  multiple
  accept="image/*"
  onChange={handleFileChange}
  ref={fileInputRef} 
  style={{ display: 'none', }}
  
/>

</div>
      <div>
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
      </Wrapper1>
   </Container>
    </>
  );
}

export default Edit;

const Rectangle = styled.div`
  width: 371px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1689f3;
  border-radius: 85px;
`;

const Wrapper1 = styled.div`
  height: 100vh;
  overflow-y: scroll;
  padding-bottom: 50px;
`;

