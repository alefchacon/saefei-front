import { useState, useCallback, useRef } from "react";
import useApi from "../../../dataAccess/useApi";
export default function useNotices() {
  const [notices, setNotices] = useState({
    coordinatorNotices: [],
    administratorNotices: [],
  });
  const [noticeAmount, setNoticeAmount] = useState(0);
  const [apiWrapper] = useApi();
  const getNoticeCount = useCallback(async () => {
    apiWrapper.get("avisos?soloCantidad=true").then((response) => {
      setNoticeAmount(response.data.noticeAmount);
    });
  });
  const getNotices = useCallback(async () => {
    const response = await apiWrapper.get(`avisos?`);
    setNotices(response.data.data);
  });
  const markAsRead = useCallback(async (noticeToMark) => {
    noticeToMark.visto = 1;
    const response = await apiWrapper.put(
      `avisos/${noticeToMark.id}/`,
      noticeToMark
    );

    if (response.status !== 200) {
      throw new Error("Error al actualizar el aviso");
    }

    /*
    notices is made up of multiple arrays, one for each type of notice.
    before removing the read notice, first we have to find the array
    where that notice is

    `Object.entries` iterates over an object's attributes pairs as key:value. 
    So arrayKeyValue becomes an array with [key, value]. 
    Suppose the noticeToMark is in notices.coordinatorNotices,
    then arrayKeyValue will be ["coordinatorNotices", [...]]
    */
    const arrayKeyValue = Object.entries(notices).find(([arrayName, array]) =>
      array.some((notice) => notice.id === noticeToMark.id)
    );

    const noticeArrayToFilter = arrayKeyValue[1];
    const arraySansRead = noticeArrayToFilter.filter(
      (notice) => notice.id !== noticeToMark.id
    );

    const noticeArrayName = arrayKeyValue[0];
    setNotices((prev) => ({
      ...prev,
      [noticeArrayName]: arraySansRead,
    }));
  });

  return { getNoticeCount, notices, noticeAmount, getNotices, markAsRead };
}
