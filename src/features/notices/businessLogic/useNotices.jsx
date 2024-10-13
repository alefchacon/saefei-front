import { useState, useCallback } from "react";
import useAuth from "../../auth/businessLogic/useAuth";
import useApi from "../../../dataAccess/useApi";
export default function useNotices() {
  const [notices, setNotices] = useState();
  const [noticeAmount, setNoticeAmount] = useState(0);
  const [apiWrapper] = useApi();

  const getNoticeCount = useCallback(async () => {
    apiWrapper.get("avisos?soloCantidad=true").then((response) => {
      setNoticeAmount(response.data.noticeAmount);
    });
  });

  return { getNoticeCount, notices, noticeAmount };
}

/*
formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
*/
