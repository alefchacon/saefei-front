import { apiClient } from "../../../dataAccess/api";
const getNotices = async () => {
  const response = await apiClient.get(`avisos?`);
  return response;
};

export default getNotices;