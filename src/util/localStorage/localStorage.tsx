// jwt 로컬스토리지 관련 함수
// 객체 키 리스폰 보고 알잘딱깔센 수정하기
// import jwt_decode, { jwtDecode } from 'jwt-decode';

export const saveTokensToLocalStorage = (token: string) => {
  localStorage.setItem('accessToken', token);
};

export const removeTokensFromLocalStorage = () => {
  localStorage.removeItem('accessToken');
  // localStorage.removeItem('smoothieRefresh');
};
// => 백엔드에서 유효성 검사를 진행한다면 로그아웃 api 콜을 별도로 프론트엔드에서 작성해줘야 할 것
