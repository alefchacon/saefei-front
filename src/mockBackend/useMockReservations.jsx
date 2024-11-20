import useMockLoading from "./mockLoading";
import reservations from "./stores/reservations";
import moment from "moment";
import calendarEvents from "./stores/calendarEvents";
import userReservations from "./stores/userREservations";

export default function useMockReservations() {
  const mockLoading = useMockLoading();

  const mockGetReservations = async () => {
    await mockLoading();

    return reservations;
  };

  const mockGetReservationsAvailableToUser = async () => {
    return userReservations;
  };

  const mockGetReservationsBySpaceDate = async (
    idEspacio = 1,
    date = moment()
  ) => {
    const reservationsForSelectedSpaceAndDate = calendarEvents.flatMap(
      (event) => {
        const reservations = event.reservations.filter(
          (reservation) =>
            reservation.space.id == idEspacio &&
            moment(reservation.date, "YYYY-MM-DD").isSame(date, "day")
        );

        reservations.map((reservation) => {
          reservation.start = moment(reservation.start, "HH:mm:ss");
          reservation.end = moment(reservation.end, "HH:mm:ss");
          return reservation;
        });

        return reservations;
      }
    );
    return reservationsForSelectedSpaceAndDate;
  };

  return {
    mockGetReservations,
    mockGetReservationsBySpaceDate,
    mockGetReservationsAvailableToUser,
  };
}
