import { useState, useCallback, useRef } from "react";
import useApi from "../../../dataAccess/useApi";
export default function useNotices() {
  const [notices, setNotices] = useState([]);
  const [noticeAmount, setNoticeAmount] = useState(0);
  const [apiWrapper] = useApi();
  const isLoadingRef = useRef(false);

  /*
  Meta is an object sent by Laravel to let the frontend know
  about the current state of the pagination
  
  The contents of the object vary from endpoint to endpoint, so
  you should always be on the lookout for changes in your 
  Network browser dev tool. 
  */
  const [meta, setMeta] = useState({
    current_page: 0,
    last_page: null,
  });

  const getNoticeCount = useCallback(async () => {
    apiWrapper.get("avisos?soloCantidad=true").then((response) => {
      setNoticeAmount(response.data.noticeAmount);
    });
  });
  const getNotices = useCallback(async () => {
    if (meta.current_page === meta.last_page || isLoadingRef.current) {
      return;
    }

    isLoadingRef.current = true;

    const nextPage = meta.current_page + 1;
    const response = await apiWrapper.get(`avisos?page=${nextPage}`);
    const newNotices = response.data.data;
    if (meta.current_page === 0) {
      setNotices(newNotices);
    } else {
      setNotices((prev) => [...prev, ...newNotices]);
    }
    setMeta(response.data.meta);
    isLoadingRef.current = false;
  });

  return { getNoticeCount, notices, noticeAmount, getNotices };
}
