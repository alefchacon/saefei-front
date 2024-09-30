import { useState, useEffect } from "react";
import moment from "moment";
import useApi from "../../../dataAccess/useApi";
import STATUS from "../../../stores/STATUS";
export const useEvents = () => {
  const [apiWrapper] = useApi();

  const getEvent = async (idEvent = 0) => {
    const response = await apiWrapper.get(`eventos/${idEvent}`);
    return response;
  };

  return {
    getEvent,
  };
};
