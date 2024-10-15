import { useState, useEffect, useCallback } from "react";
import moment from "moment";
import useApi from "../../../dataAccess/useApi";
import STATUS from "../../../stores/STATUS";
import EventSerializer from "../domain/eventSerializer";
export const useEvents = () => {
  const [apiWrapper] = useApi();

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

  return {
    getEvent,
    storeEvent,
    updateEvent,
  };
};
