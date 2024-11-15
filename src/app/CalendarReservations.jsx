import { useState, useEffect, cloneElement, Children } from "react";
import Stack from "@mui/material/Stack";
import moment from "moment";
import Page from "../components/Page";
import CalendarCustom from "../components/calendar/CalendarCustom";
import { useReservations } from "../features/reservations/businessLogic/useReservations";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { ROUTE_RESERVE } from "../stores/ROUTES";
import useIsMobile from "../components/hooks/useIsMobile";
import DayViewWrapper from "../components/calendar/DayViewWrapper";
import DayView from "../components/calendar/DayView";
import { useModal } from "../components/providers/ModalProvider";

export default function CalendarReservations() {
  const [selectedDate, setSelectedDate] = useState(moment());
  const [reservations, setReservations] = useState([]);
  const { getReservationsByMonth } = useReservations();
  const isMobile = useIsMobile();
  const { openModal } = useModal();

  const handleMonthChange = async (newDate) => {
    const momentDate = moment(newDate);
    fetchReservations(momentDate);
  };

  const fetchReservations = async (date = moment()) => {
    getReservationsByMonth(date).then((response) =>
      setReservations(response.data.data)
    );
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const spaceWrapper = ({ children }) => {
    return cloneElement(Children.only(children), {
      style: {
        backgroundColor: "var(--blue)",
        borderRadius: "100px",
        fontFamily: "roboto condensed",
        padding: "0 10px",
        fontWeight: "500",
      },
    });
  };

  const actionButton = (
    <Link to={ROUTE_RESERVE} style={{ height: "100%", display: "flex" }}>
      <Button
        disableElevation
        onClick={() => console.log("asdf")}
        variant="contained"
      >
        Reservar espacios
      </Button>
    </Link>
  );

  const handleDateSelect = (dateString) => {
    const selectedDate = moment(new Date(dateString));
    if (isMobile) {
      openModal(
        `Reservaciones del ${selectedDate.format("D [de] MMMM [de] YYYY")}`,
        <DayView
          items={reservations}
          selectedDate={selectedDate}
          forEvents={false}
        />,
        "",
        true
      );
    }
    setSelectedDate(moment(dateString));
  };

  return (
    <Page title={"Reservaciones"} disablePadding showHeader={!isMobile}>
      <Stack flex={10} className={isMobile ? `` : "card"} direction={"row"}>
        <CalendarCustom
          forEvents={false}
          onDateSelect={handleDateSelect}
          onMonthChange={handleMonthChange}
          items={reservations}
          eventWrapper={spaceWrapper}
          actionButton={actionButton}
        ></CalendarCustom>
        {!isMobile && (
          <DayViewWrapper
            forEvents={false}
            selectedDate={selectedDate}
            items={reservations}
          >
            <DayView
              forEvents={false}
              selectedDate={selectedDate}
              items={reservations}
            />
          </DayViewWrapper>
        )}
      </Stack>
    </Page>
  );
}
