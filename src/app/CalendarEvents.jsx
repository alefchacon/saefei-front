import { useState, useEffect, cloneElement, Children } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import moment from "moment";
import Page from "../components/Page";
import CalendarCustom from "../components/calendar/CalendarCustom";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { ROUTE_NOTIFY } from "../stores/routes";
import { useEvents } from "../features/events/businessLogic/useEvents";
import TabsCustom from "../components/Tabs";
import useIsMobile from "../components/hooks/useIsMobile";
import Events from "./Events";
import { useModal } from "../components/providers/ModalProvider";
import CardCalendarEvent from "../features/events/components/CardCalendarEvent";
import DayViewWrapper from "../components/calendar/DayViewWrapper";
import DayView from "../components/calendar/DayView";
import FabResponsive from "../components/FabResponsive";
import AddAlertIcon from "@mui/icons-material/AddAlert";
import useMockEvents from "../mockBackend/useMockEvents";
export default function CalendarEvents() {
  const [selectedDate, setSelectedDate] = useState(moment());
  const [events, setEvents] = useState([]);
  const { getCalendarEvents } = useEvents();
  const { mockGetCalendarEvents } = useMockEvents();
  const { openModal } = useModal();

  const isMobile = useIsMobile();

  const handleMonthChange = async (newDate) => {
    const momentDate = moment(newDate);
    fetchEvents(momentDate);
  };

  const fetchEvents = async (date = moment()) => {
    const dateFilter = `fecha=${moment(date).format("YYYY-MM")}`;
    /*
    getCalendarEvents(dateFilter).then((response) =>
      setEvents(response.data.data)
    );
    */

    setEvents(await mockGetCalendarEvents());
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const eventWrapper = ({ children }) => {
    return cloneElement(Children.only(children), {
      style: {
        backgroundColor: "var(--selected)",
        color: "var(--blue)",
        borderRadius: "100px",
        fontFamily: "roboto condensed",
        padding: "0 10px",
        fontWeight: "500",
      },
    });
  };

  const actionButton = (
    <Link to={ROUTE_NOTIFY} style={{ height: "100%", display: "flex" }}>
      {isMobile ? (
        <FabResponsive label="responder notificación" variant="extended">
          <Stack
            direction={"row"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={"10px"}
          >
            <AddAlertIcon></AddAlertIcon>
            Notificar evento
          </Stack>
        </FabResponsive>
      ) : (
        <Button disableElevation variant="contained">
          Notificar evento
        </Button>
      )}
    </Link>
  );

  const handleDateSelect = (dateString, items) => {
    const selectedDate = moment(new Date(dateString));
    if (isMobile) {
      openModal(
        `Eventos del ${selectedDate.format("D [de] MMMM [de] YYYY")}`,
        <DayView items={events} selectedDate={selectedDate} forEvents />,
        "",
        true
      );
    }
    setSelectedDate(moment(dateString));
  };

  const calendar = (
    <CalendarCustom
      forEvents
      onDateSelect={handleDateSelect}
      onMonthChange={handleMonthChange}
      items={events}
      eventWrapper={eventWrapper}
      actionButton={actionButton}
    ></CalendarCustom>
  );

  if (isMobile) {
    return (
      <Page
        title={"Eventos"}
        disablePadding
        disableDivider={isMobile}
        showHeader={!isMobile}
      >
        <Stack
          flex={10}
          className="page"
          direction={isMobile ? "column" : "row"}
          gap={"10px"}
        >
          <TabsCustom>
            <Stack label={"Calendario"} height={"100%"}>
              {calendar}
            </Stack>
            <Stack label={"Buscar eventos"} height={"100%"}>
              <Events noPage></Events>
            </Stack>
          </TabsCustom>
        </Stack>
      </Page>
    );
  }

  return (
    <Page title={"Eventos"} disablePadding showHeader={!isMobile}>
      <Stack direction={"row"} gap={"20px"} height={"100%"} flex={5}>
        <Stack
          flex={10}
          className={isMobile ? `` : "card"}
          direction={"row"}
          height={"100%"}
        >
          {calendar}
        </Stack>

        <Stack className="card" height={"100%"} flex={2} minWidth={"400px"}>
          <DayViewWrapper selectedDate={selectedDate} items={events}>
            <DayView forEvents selectedDate={selectedDate} items={events} />
          </DayViewWrapper>
        </Stack>
      </Stack>
    </Page>
  );
}
