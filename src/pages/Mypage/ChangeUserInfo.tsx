import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { getMyPage } from '../../api/mypage';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/layout/Header';
import { changeUserName } from '../../api/mypage';
import { checkDuplicateNickname } from '../../api/mypage';
import { ImCamera } from 'react-icons/im';
import gogo from '../../../public/assets/gogo.svg';

interface RentalImage {
  file: string;
  profileUrl: string;
  createdAt: string;
}

function ChangeUserInfo() {
  const [nickname, setNickname] = useState('');
  const [nicknameError, setNicknameError] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[] | null>(null);
  const [imageChanged, setImageChanged] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [nicknameValidityMessage, setNicknameValidityMessage] =
    useState<string>('');
  const [nicknameDupMessage, setNicknameDupMessage] = useState<string>('');

  const navigate = useNavigate();

  const { data, isLoading: isFetchingNickname } = useQuery({
    queryKey: ['getMyPage'],
    queryFn: () => getMyPage(),
  });

  const placeholder = isFetchingNickname
    ? 'Loading...'
    : data?.data.nickname || '새로운 닉네임을 입력하세요';

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNickname = e.target.value;
    if (newNickname.length >= 15) {
      setNicknameError('닉네임은 15글자 이내여야 합니다');
    } else {
      setNicknameError('');
    }
    setNickname(e.target.value);
  };

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

  // 닉네임 유효성 검사
  useEffect(() => {
    if (nickname) {
      const nicknameCheck = (nickname: string) => {
        const nicknameCheck = /^[a-zA-Z0-9가-힣]{3,10}$/;
        console.log(placeholder);
        console.log(nickname);
        return nicknameCheck.test(nickname);
      };
      setNicknameValidityMessage(
        nicknameCheck(nickname)
          ? ''
          : '닉네임은 특수문자 제외 3자~10자 입니다.',
      );
    } else {
      setNicknameValidityMessage('');
    }
    const response = checkDuplicateNickname(nickname);
    if (!response) {
      setNicknameDupMessage('이미 사용중인 닉네임이에요');
    }
  }, [nickname]);

  const submitNickname = async () => {
    const formData = new FormData();
    const requestDto = {
      nickname,
    };

    formData.append('requestDto', JSON.stringify(requestDto));

    // profileImage 파일 추가
    if (selectedFiles) {
      Array.from(selectedFiles).forEach((selectedFiles) => {
        formData.append('profileImage', selectedFiles);
      });
      console.log('selectedFiles', selectedFiles);
    }

    try {
      await changeUserName({ nickname: requestDto, formData: formData });
      navigate('/mypage');
    } catch (error) {
      console.error('정보 수정 오류:', error);
    }
  };

  if (Error instanceof Error) {
    console.error('닉네임을 가져오지 못했습니다 : ', Error.message);
  }

  return (
    <Wrapper>
      <Header text="프로필 수정" />
      <PageContainer>
        <div>
          <Profile>
            {selectedFiles && (
              <Picture
              // style={{ display: 'flex' }}
              >
                {Array.from(selectedFiles).map((file, index) => (
                  <div key={selectedFiles.length - index - 1}>
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Image ${index + 1}`}
                      style={{
                        width: '130px',
                        height: '130px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                ))}
              </Picture>
            )}
            <label
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '7px',
                display:
                  (selectedFiles ? selectedFiles.length : 0) < 1
                    ? 'flex'
                    : 'none',
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
              }}
              htmlFor="file-upload"
            >
              <img
                src={data?.data.profileUrl}
                style={{
                  width: '130px',
                  height: '130px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                }}
              />
            </label>
            <label htmlFor="file-upload">
              <ProfileImageIcon>
                <ImCamera />
              </ProfileImageIcon>
            </label>
          </Profile>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            ref={fileInputRef}
            style={{
              display:
                (selectedFiles ? selectedFiles.length : 0) < 3
                  ? 'none'
                  : 'none',
            }}
          />
        </div>
        <InputWrapper>
          <Input
            type="text"
            value={nickname}
            onChange={handleNicknameChange}
            placeholder={placeholder}
            style={{ width: '265.54px' }}
          />
          <WarnSpan>{nicknameDupMessage}</WarnSpan>
          <WarnSpan>{nicknameValidityMessage}</WarnSpan>
        </InputWrapper>
        {nicknameError && <TextOver>{nicknameError}</TextOver>}
        <MyLocation>
          <MSG>
            내 위치
            <ChangeMyLocation
              onClick={() => {
                navigate('/thxkakaomap');
              }}
            >
              변경하기 &nbsp;
              <img
                src={gogo}
                style={{
                  maxWidth: '10px',
                  maxHeight: '10px',
                }}
              />
            </ChangeMyLocation>
          </MSG>
          <District>{data?.data.district}</District>
        </MyLocation>
        <ButtonWrapper>
          <SubmitButton onClick={submitNickname}>내 정보 수정하기</SubmitButton>
        </ButtonWrapper>
      </PageContainer>
    </Wrapper>
  );
}

export default ChangeUserInfo;

const TextOver = styled.p``;

const PageContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Wrapper = styled.div`
  background-color: white;
  height: 100%;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Input = styled.input`
  margin-top: 50px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const SubmitButton = styled.button`
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  display: flex;
  width: 265.54px;
  height: 40px;
  justify-content: center;
  align-items: center;
`;
const MyLocation = styled.div`
  margin: 50px;
`;
const MSG = styled.div`
  display: flex;
  gap: 150px;
  margin-bottom: 15px;
`;
const ChangeMyLocation = styled.span`
  cursor: pointer;
`;
const District = styled.div`
  border-top: 1px solid #d1cece;
  padding-top: 15px;
`;

const Profile = styled.div`
  gap: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* margin: 0 0 0 15%; */
  margin-top: 200px;
  @media screen and (max-width: 430px) {
  }
`;
const ProfileImageIcon = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 50px;
  bottom: 40px;
  width: 40px;
  height: 40px;
  background-color: #3d3d3de6;
  color: white;
  opacity: 50%;
  border-radius: 50%;
  cursor: pointer;
  @media screen and (max-width: 430px) {
  }
`;

const Picture = styled.div`
  display: flex;
  width: 130px;
  height: 130px;
  border-radius: 50%;
  flex-direction: row;
  align-content: center;
  justify-content: center;
  align-items: center;
  width: 130px;
  height: 130px;
  border-radius: 50%;
  cursor: pointer;
  @media screen and (max-width: 430px) {
    /* margin-left: 40px; */
  }
`;

const WarnSpan = styled.div`
  color: red;
  font-size: 0.7rem;
`;
