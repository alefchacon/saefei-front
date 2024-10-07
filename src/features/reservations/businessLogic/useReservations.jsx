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

  const getReservationsByMonth = async (date = moment()) => {
    return apiWrapper.get(`reservaciones?
      anio[eq]=${date.format("YYYY")}
      &mes[eq]=${date.format("MM")}
      &idEstado[gte]=${STATUS.ACCEPTED}
      &idEstado[lte]=${STATUS.EVALUATED}`);
  };

  const getReservationsAvailableToUser = async (idUsuario = 0) => {
    return apiWrapper.get(`reservaciones?
      idUsuario[eq]=${idUsuario}
      &idEstado[eq]=${STATUS.ACCEPTED}`);
  };

  const addReservation = async (values) => {
    const body = {
      motivo: values.motive,
      fecha: moment(values.date).format("YYYY-MM-DD"),
      inicio: moment(values.start).format("HH:mm"),
      fin: moment(values.end).format("HH:mm"),
      idUsuario: 1,
      idEspacio: values.idEspacio,
    };
    const response = await apiWrapper.post("reservaciones", body);
    return response;
  };

  return {
    getReservationsBySpaceDate,
    addReservation,
    getReservationsByMonth,
    getReservationsAvailableToUser,
  };
};
