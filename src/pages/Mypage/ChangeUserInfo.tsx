// import { useState, useEffect, useCallback } from 'react';
// import styled from 'styled-components';
// import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
// import { getMyPage } from '../../api/mypage';
// import { useNavigate } from 'react-router-dom';
// import { checkDuplicateNickname, changeUserName } from '../../api/mypage';

// function ChangeUserInfo() {
//   const [nickname, setNickname] = useState('');
//   const [nicknameError, setNicknameError] = useState('');
//   const [nicknameValidityMessage, setNicknameValidityMessage] =
//     useState<string>('');
//   const [nicknameDupMessage, setNicknameDupMessage] = useState<string>('');
//   const [showNicknameInput, setShowNicknameInput] = useState(false);
//   const [initialData, setInitialData] = useState({
//     writtenNickname: '',
//   });
//   const useInput = (initialInput: any) => {
//     const [input, setInput] = useState(initialInput);
//     const onChange = useCallback((e: any) => {
//       const { name, value } = e.target;
//       setInput((input: any) => ({ ...input, [name]: value }));
//     }, []);
//     const reset = useCallback(() => setInput(initialInput), [initialInput]);
//     return [input, onChange, reset];
//   };
//   // const { data: currentNickname, isLoading: isFetchingNickname } = useQuery({
//   //   queryKey: ['getMyPage'],
//   //   queryFn: () => getMyPage(),
//   // });
//   const {
//     data,
//     isLoading: isFetchingNickname,
//     isError,
//   } = useQuery({
//     queryKey: ['getMyPage'],
//     queryFn: () => getMyPage(),
//   });
//   const [input, onChange, resetInput] = useInput({
//     writtenNickname: data?.nickname || '',
//   });
//   const navigate = useNavigate();
//   // const nicknameCheck = (nickname: string) => {
//   //   const nicknameCheck = /^[a-zA-Z0-9가-힣]{3,10}$/;
//   //   return nicknameCheck.test(nickname);
//   // };

//   // //회원정보 저장
//   // const getChangedData = () => {
//   //   const changedData = {
//   //     nickname: localStorage.getItem('nickname') || '',
//   //   };
//   //   if (
//   //     initialData.writtenNickname !== input.writtenNickname &&
//   //     input.writtenNickname
//   //   ) {
//   //     changedData.nickname = input.writtenNickname;
//   //     localStorage.setItem('nickname', changedData.nickname);
//   //   }
//   //   return changedData;
//   // };

//   const useChangeNicknameMutation = () => {
//     const mutation = useMutation<string, Error, string>({
//       mutationFn: changeUserName,
//       onSuccess: (data) => {
//         console.log('Nickname changed successfully:', data);
//       },
//       onError: (error: Error) => {
//         console.error('Error changing nickname:', error.message);
//       },
//     });
//     return mutation;
//   };

//   const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newNickname = e.target.value;
//     if (newNickname.length >= 10) {
//       setNicknameError('닉네임은 10글자 이내여야 합니다');
//     } else {
//       setNicknameError('');
//     }
//     setNickname(e.target.value);
//   };

//   // // 닉네임 유효성 검사
//   // useEffect(() => {
//   //   if (input.writtenNickname) {
//   //     setNicknameValidityMessage(
//   //       nicknameCheck(input.writtenNickname)
//   //         ? ''
//   //         : '닉네임은 특수문자 제외 3자~10자로 설정해주세요!',
//   //     );
//   //   } else {
//   //     setNicknameValidityMessage('');
//   //   }
//   //   const response = checkDuplicateNickname(input.writtenNickname);
//   //   if (!response) {
//   //     setNicknameDupMessage('이미 사용중인 닉네임이에요');
//   //   }
//   // }, [input.writtenNickname]);

//   //닉네임수정
//   const handleChangeNicknameClick = () => {
//     setShowNicknameInput(true);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // const changedData = getChangedData();

//     // if (Object.keys(changedData).length === 0) {
//     //   alert('변경 사항이 없습니다. 정보를 수정한 후에 제출해주세요.');
//     //   return;
//     // }

//     try {
//       // if (profileImage && imageAction === 'modify') {
//       //   updatePhotoMutate(profileImage);
//       //   const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
//       //   currentUser.profileImageUrl = previewImageUrl;
//       //   localStorage.setItem('user', JSON.stringify(currentUser));
//       // } else if (imageAction === 'delete') {
//       //   // setProfileImage(null);
//       //   const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
//       //   currentUser.profileImageUrl = '';
//       //   localStorage.setItem('user', JSON.stringify(currentUser));
//       // }
//       await changeUserName(nickname);
//       resetInput();
//       alert('회원 정보가 성공적으로 업데이트 되었습니다.');
//       navigate('/mypage');
//     } catch (error) {
//       console.error('Update error:', error);
//       alert('회원 정보 업데이트에 실패했습니다.');
//     }
//   };

//   // const queryClient = useQueryClient();

//   const submitNickname = () => {
//     mutation.mutate(nickname, {
//       onSuccess: () => {
//         // queryClient.invalidateQueries({ queryKey: ['rankings'] });
//         navigate('/mypage');
//       },
//     });
//   };

//   const mutation = useChangeNicknameMutation();

//   // const isLoading = mutation.status === 'pending';

//   if (Error instanceof Error) {
//     console.error('닉네임을 가져오지 못했습니다 : ', Error.message);
//   }

//   const placeholder = isFetchingNickname
//     ? 'Loading...'
//     : data?.data.nickname || '새로운 닉네임을 입력하세요';

//   return (
//     <>
//       <Header>
//         <Title>닉네임 변경</Title>
//       </Header>
//       <PageContainer>
//         <Description>
//           <h1>변경하실 닉네임을 입력해주세요</h1>
//         </Description>
//         <Input
//           type="text"
//           value={nickname}
//           onChange={handleNicknameChange}
//           placeholder={placeholder}
//         />
//         <ButtonWrapper>
//           <SubmitButton onClick={submitNickname} disabled={isFetchingNickname}>
//             {isFetchingNickname ? '변경 중...' : '확인'}
//           </SubmitButton>
//           {/* <SubmitButton onClick={submitNickname} disabled={isFetchingNickname}>
//             {isFetchingNickname ? '변경 중...' : '확인'}
//           </SubmitButton> */}
//         </ButtonWrapper>
//         {nicknameError && <TextOver>{nicknameError}</TextOver>}
//         {!showNicknameInput && (
//           <Row
//             style={{
//               width: '290px',
//               justifyContent: 'space-between',
//               paddingRight: '13px',
//             }}
//           >
//             <InnerSpan>{data?.data.nickname}</InnerSpan>
//             <Button onClick={handleChangeNicknameClick}>닉네임 변경</Button>
//           </Row>
//         )}
//         {showNicknameInput && (
//           <>
//             <Col style={{ width: '300px', position: 'relative' }}>
//               <AuthInput
//                 type="text"
//                 name="writtenNickname"
//                 value={input.writtenNickname}
//                 onChange={onChange}
//               />
//               <WarnSpan
//                 style={{
//                   position: 'absolute',
//                   right: '-15px',
//                   top: '10px',
//                 }}
//               >
//                 {nicknameDupMessage}
//               </WarnSpan>
//               <WarnSpan>{nicknameValidityMessage}</WarnSpan>
//             </Col>
//             <Button onClick={handleSubmit}>수정완료</Button>
//           </>
//         )}
//       </PageContainer>
//     </>
//   );
// }

// export default ChangeUserInfo;

// const TextOver = styled.p``;

// const PageContainer = styled.div``;

// const Title = styled.p``;

// const Header = styled.div`
//   .backButton {
//     cursor: pointer;
//   }
// `;

// const Description = styled.div`
//   h1 {
//   }
// `;

// const Input = styled.input`
//   box-shadow: h1 {

//   }
// `;

// const ButtonWrapper = styled.button``;

// const SubmitButton = styled.button`
//   background: ${(props) => (props.disabled ? '#ccc' : '#EEEEEE')};

//   cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};

//   &:hover {
//     background: ${(props) => (props.disabled ? '#ccc' : '#E88439')};
//     color: ${(props) => (props.disabled ? '#ccc' : '#fff')};
//   }
// `;

// const Row = styled.div``;
// const InnerSpan = styled.span``;
// const Col = styled.div``;
// const AuthInput = styled.input``;
// const WarnSpan = styled.span``;
// const Button = styled.span``;
