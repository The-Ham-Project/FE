import { authInstance } from './axios';

interface CurrentPos {
  lon: number;
  lat: number;
}

// 회원 좌표 갱신 API
export const geolocation = async ({ lon, lat }: CurrentPos) => {
  try {
    const response = await authInstance
      .patch(`/api/v1/members/position`, {
        longitude: lon,
        latitude: lat,
      })
      .then((response) => response);
    return response;
  } catch (error) {
    return error;
  }
};
