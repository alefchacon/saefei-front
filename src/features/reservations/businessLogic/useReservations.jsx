import { useState, useEffect } from "react";
import moment from "moment";
import useApi from "../../../dataAccess/useApi";
import STATUS from "../../../stores/STATUS";
export const useReservations = () => {
  const [apiWrapper] = useApi();

  const getReservationsBySpaceDate = async (idEspacio = 0, date = moment()) => {
    const response = await apiWrapper.get(
      `reservaciones?idEspacio[eq]=${idEspacio}&fecha[eq]=${date.format(
        "YYYY-MM-DD"
      )}&idEstado[eq]=${STATUS.ACCEPTED}`
    );
    const reservations = response.data.data;
    const momentReservations = reservations.map((reservation) => {
      reservation.start = moment(reservation.start, "HH:mm");
      reservation.end = moment(reservation.end, "HH:mm");
      return reservation;
    });
    return momentReservations;
  };

  const addReservation = async (values) => {};

  return { getReservationsBySpaceDate };
};
