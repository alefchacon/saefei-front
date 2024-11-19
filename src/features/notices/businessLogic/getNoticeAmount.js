import { apiClient } from "../../../dataAccess/api";

const getNoticeAmount = async () => {
  const response = await apiClient.get("avisos?soloCantidad=true");
  return response.data.noticeAmount + response.data.noticeAmountStaff;
};

export default getNoticeAmount;