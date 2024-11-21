import { useState, useEffect, cloneElement, Children } from "react";
import Stack from "@mui/material/Stack";
import moment from "moment";
import Page from "../components/Page";
import CalendarCustom from "../components/calendar/CalendarCustom";
import { useReservations } from "../features/reservations/businessLogic/useReservations";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { ROUTE_RESERVE } from "../stores/routes";
import useIsMobile from "../components/hooks/useIsMobile";
import DayViewWrapper from "../components/calendar/DayViewWrapper";
import DayView from "../components/calendar/DayView";
import { useModal } from "../components/providers/ModalProvider";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import FabResponsive from "../components/FabResponsive";
import {
  getSpaceColorBySpaceName,
  SPACE_COLORS,
} from "../stores/spaceProperties";
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

  const test = {
    backgroundColor: "red",
    color: "green",
  };

  const spaceWrapper = ({ children }) => {
    const spaceName = children.props.children.props.children;
    return cloneElement(Children.only(children), {
      style: {
        ...getSpaceColorBySpaceName(spaceName),
        borderRadius: "100px",
        fontFamily: "roboto condensed",
        padding: "0 10px",
        fontWeight: "500",
        fontSize: "12px",
      },
    });
  };

  const actionButton = (
    <Link to={ROUTE_RESERVE} style={{ height: "100%", display: "flex" }}>
      {isMobile ? (
        <FabResponsive label="responder notificación" variant="extended">
          <Stack
            direction={"row"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={"10px"}
          >
            <AddLocationIcon></AddLocationIcon>
            Reservar espacio
          </Stack>
        </FabResponsive>
      ) : (
        <Button disableElevation variant="contained">
          Reservar espacio
        </Button>
      )}
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
