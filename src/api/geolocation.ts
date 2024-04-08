// 회원 좌표 갱신 API
export const patchFundingModify = async (id, data) => {
  try {
    const response = await instance.patch(`/api/funding/${id}/update`, data);

    if (response.status === 200) {
      successToast(response.data.message);
      return response.data;
    }
  } catch (error) {
    if (error.response && error.response.status === 400) {
      warnToast(error.response.data.message);
    }
  }
};
