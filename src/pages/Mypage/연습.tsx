import { useState, useEffect } from 'react';
import { FaCamera } from 'react-icons/fa';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router';
import { editItemPut } from '../../api/itemAPI';
import styled from 'styled-components';
import Dropzone from 'react-dropzone-uploader';
import ELECTRONIC from '../../../public/assets/ELECTRONIC.svg';
import HOUSEHOLD from '../../../public/assets/HOUSEHOLD.svg';
import KITCHEN from '../../../public/assets/KITCHEN.svg';
import CLOSET from '../../../public/assets/CLOSET.svg';
import BOOK from '../../../public/assets/BOOK.svg';
import PLACE from '../../../public/assets/PLACE.svg';
import OTHER from '../../../public/assets/OTHER.svg';
import { authInstance } from '../../api/axios';

function Edit(): JSX.Element {
  const { rentalId } = useParams(); //

  const navigate = useNavigate();
  // 비동기
  const { data } = useQuery({
    queryKey: ['postDetail', rentalId],
    queryFn: async () => await getMeetingDetail(Number(rentalId)),
  });

  const [stackName, setStackName] = useState<string[]>([]);
  const [info, setInfo] = useState<EditMeetingReq>({
    meetingName: data?.meetingName,
    budget: data?.budget,
    contents: data?.contents,
    totalCount: data?.totalCount,
    locationAddress: data?.locationAddress,
    locationLat: data?.locationLat,
    locationLng: data?.locationLng,
    regionFirstName: '',
    regionSecondName: '',
    skillIds: [],
    careerIds: [],
  });

  useEffect(() => {
    setInfo({
      meetingName: data?.meetingName,
      budget: data?.budget,
      contents: data?.contents,
      totalCount: data?.totalCount,
      locationAddress: data?.locationAddress,
      locationLat: data?.locationLat,
      locationLng: data?.locationLng,
      regionFirstName: '',
      regionSecondName: '',
      skillIds: [],
      careerIds: [],
    });
  }, [data]);

  const editMutation = useMutation({
    mutationFn: async () => {
      await editMeeting(Number(meetingId), info);
    },
    onSuccess: () => {},
    onError: (err) => {
      console.log(err);
    },
  });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInfo((prevState) => ({
      ...prevState,
      meetingName: e.target.value,
    }));
  };
  const handleContentChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setInfo((prevState) => ({
      ...prevState,
      contents: e.target.value,
    }));
  };

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const budgetValue: number = parseInt(e.target.value, 10);
    setInfo((prevState) => ({
      ...prevState,
      budget: budgetValue,
    }));
  };

  const handleMemCountUpClick = (): void => {
    setInfo((prevState) => ({
      ...prevState,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      totalCount: prevState.totalCount! + 1,
    }));
  };

  const handleMemCountDownClick = (): void => {
    setInfo((prevState) => ({
      ...prevState,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      totalCount: prevState.totalCount! - 1,
    }));
  };

  const handleTechStackClick = (
    selectedStacks: number[],
    selectedStacksName?: string[],
  ): void => {
    setInfo((prevState) => ({
      ...prevState,
      skillIds: selectedStacks,
    }));

    selectedStacksName != null && setStackName(selectedStacksName);
  };

  const handleCareerClick = (careerId: number): void => {
    setInfo((prev) => {
      if (prev.careerIds.includes(careerId)) {
        return {
          ...prev,
          careerIds: prev.careerIds.filter((item) => item !== careerId),
        };
      }
      return {
        ...prev,
        careerIds: [...prev.careerIds, careerId],
      };
    });
  };

  const handleMeetingModifySubmit = (): void => {
    editMutation.mutate();
  };

  return (
    <WholeContainer>
      <InfoHeader>
        <button
          type="button"
          onClick={() => {
            navi(-1);
          }}
        >
          &#60;
        </button>
        <h2>모임 생성하기</h2>
      </InfoHeader>
      <RegisterTitle>
        <h1>
          <span>모임을</span>
          <span>소개해 주세요!</span>
        </h1>
        <span>흩어져 있던 개발자들을 불러 봐요</span>
      </RegisterTitle>
      <div>
        <InfoContainer>
          <InfoTitle>모임 이름을 정해 주세요</InfoTitle>
          <InputBox>
            <label htmlFor="nameInput">한 줄로 작성해 주세요</label>
            <input
              type="text"
              id="nameInput"
              placeholder="ex) 같이 리액트 공부해요"
              value={info.meetingName}
              onChange={handleNameChange}
            />
          </InputBox>
        </InfoContainer>
        <InfoContainer>
          <InfoTitle>모임 내용을 작성해 주세요</InfoTitle>
          <InputBox>
            <label htmlFor="contentInput">설명해 주세요</label>
            <input
              type="text"
              id="contentInput"
              placeholder="ex) 뭐할래?"
              value={info.contents}
              onChange={handleContentChange}
            />
          </InputBox>
        </InfoContainer>
        {/* 날짜, 시간 선택 */}
        <InfoContainer>
          <InfoTitle>언제 만날까요?</InfoTitle>
          <InputBox>
            <span>모임 날짜</span>
          </InputBox>
        </InfoContainer>
        {/* 위치 찾기 */}
        <InfoContainer>
          <InfoTitle>어디서 만날까요?</InfoTitle>
          <FindLocation
            info={info}
            setInfo={setInfo}
            locationAddress={info.locationAddress}
          />
        </InfoContainer>
        <InfoContainer>
          <InfoTitle>몇 명이서 모일까요?</InfoTitle>
          <span>본인을 포함한 최소 인원을 설정해 주세요</span>
          <MemberCount>
            <MemberCountBtn type="button" onClick={handleMemCountDownClick}>
              -
            </MemberCountBtn>
            <div>{info.totalCount}</div>
            <MemberCountBtn type="button" onClick={handleMemCountUpClick}>
              +
            </MemberCountBtn>
          </MemberCount>
        </InfoContainer>
        <AccountContainer>
          <div>
            <h3>참가비가 필요한가요?</h3>
            <span>부담스럽지 않은 금액이 좋아요</span>
          </div>
          <PriceBox>
            <input
              type="number"
              id="price"
              placeholder="ex) 3,000"
              value={info.budget}
              onChange={handleBudgetChange}
            />
            <label htmlFor="price">원</label>
          </PriceBox>
        </AccountContainer>
        <InfoContainer>
          <InfoTitle>모임에 필요한 기술 스택을 알려 주세요</InfoTitle>
          <TechStack
            selectedFilters={info.skillIds}
            handleSelectedFilters={handleTechStackClick}
          />
          {stackName.map((name) => (
            <p key={name}>{name}</p>
          ))}
        </InfoContainer>
        <InfoContainer>
          <InfoTitle>경력을 알려 주세요</InfoTitle>
          <CareerContainer>
            {careerData.map((career: Career) => (
              <button
                type="button"
                key={career.careerId}
                onClick={() => {
                  handleCareerClick(career.careerId);
                }}
              >
                {career.careerName}
              </button>
            ))}
          </CareerContainer>
        </InfoContainer>
      </div>
      <CommonButton size="large" handleClick={handleMeetingModifySubmit}>
        수정하기
      </CommonButton>
    </WholeContainer>
  );
}

export default Edit;
