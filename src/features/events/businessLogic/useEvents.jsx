import { useState, useEffect, useCallback, useRef } from "react";
import moment from "moment";
import useApi from "../../../dataAccess/useApi";
import STATUS from "../../../stores/STATUS";
import EventSerializer from "../domain/eventSerializer";
export const useEvents = () => {
  const [events, setEvents] = useState([]);
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

  const getEvent = useCallback(async (idEvent = 0) => {
    const response = await apiWrapper.get(`eventos/${idEvent}`);
    return response;
  });

  const storeEvent = useCallback(async (eventUV) => {
    const data = new EventSerializer(eventUV);
    const formData = new FormData();

    const { publicidad } = data;
    for (let i = 0; i < publicidad.length; i++) {
      formData.append(`publicidad[${i}]`, publicidad[i]);
    }
    delete data.publicidad;

    const { cronograma } = data;
    for (let i = 0; i < cronograma.length; i++) {
      formData.append(`cronograma[${i}]`, cronograma[i]);
    }
    delete data.cronograma;

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append("idEstado", 1);

    const response = await apiWrapper.post(`eventos`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  });

  const updateEvent = useCallback(async (eventUV) => {
    console.log(eventUV);
    const response = await apiWrapper.put(
      `eventos/${eventUV.id}`,
      new EventSerializer(eventUV)
    );
    return response;
  });

  const getEvents = async (filters, newSearch = false) => {
    const cantGetNewEvents =
      (!newSearch && meta.current_page === meta.last_page) ||
      isLoadingRef.current;

    if (cantGetNewEvents) {
      return;
    }

    const nextPage = newSearch ? 1 : meta.current_page + 1;
    const query = `eventos?page=${nextPage}&${filters.join("&")}`;
    const response = await apiWrapper.get(query);
    const newEvents = response.data.data;
    if (meta.current_page === 0 || newSearch) {
      setEvents(newEvents);
    } else {
      setEvents((prev) => [...prev, ...newEvents]);
    }
    setMeta(response.data.meta);
    isLoadingRef.current = false;
  };

  return {
    events,
    getEvent,
    storeEvent,
    updateEvent,
    getEvents,
  };
};
