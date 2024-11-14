import { useState, useEffect, cloneElement, Children } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import moment from "moment";
import Page from "../components/Page";
import ButtonResponsive from "../components/ButtonResponsive";
import CalendarCustom from "../components/CalendarCustom";
import ChipSpace from "../features/reservations/components/ChipSpace";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { ROUTE_NOTIFY } from "../stores/ROUTES";
import { useEvents } from "../features/events/businessLogic/useEvents";
import { getScheduleString } from "../util/moments";
import TabsCustom from "../components/Tabs";
import useIsMobile from "../components/hooks/useIsMobile";
import Events from "./Events";
import { useModal } from "../components/providers/ModalProvider";
import CardCalendarEvent from "../features/events/components/CardCalendarEvent";

export default function CalendarEvents() {
  const [selectedDate, setSelectedDate] = useState(moment());
  const [events, setEvents] = useState([]);
  const { getCalendarEvents } = useEvents();
  const { openModal } = useModal();

  const isMobile = useIsMobile();

  const itemsInSelectedDate = events.filter((item) =>
    moment(item.date).isSame(moment(selectedDate), "day", "[)")
  );

  const handleMonthChange = async (newDate) => {
    const momentDate = moment(newDate);
    fetchReservations(momentDate);
  };

  const fetchReservations = async (date = moment()) => {
    const dateFilter = `fecha=${moment(date).format("YYYY-MM")}`;
    getCalendarEvents(dateFilter).then((response) =>
      setEvents(response.data.data)
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
    <Link to={ROUTE_NOTIFY} style={{ height: "100%", display: "flex" }}>
      <Button disableElevation variant="contained">
        Notificar evento
      </Button>
    </Link>
  );

  function CalendarList() {
    console.log("calendar");
    return (
      <Stack
        id="calendar-list"
        position={"relative"}
        flex={0.8}
        padding={"0 10px"}
      >
        <Stack padding={"10px 0"}>
          <Typography>Eventos del</Typography>
          <Typography
            variant="h5"
            color={"black"}
            fontSize={{ md: 26, xs: 20 }}
          >
            {selectedDate.format("D [de] MMMM [de] YYYY")}{" "}
          </Typography>
        </Stack>
        <Stack>
          {itemsInSelectedDate.map((event, index) => (
            <CardCalendarEvent key={index} event={event} />
          ))}
        </Stack>
      </Stack>
    );
  }

  const asdf = (
    <Stack>
      {itemsInSelectedDate.map((event, index) => (
        <CardCalendarEvent key={index} event={event} />
      ))}
    </Stack>
  );

  const handleDateSelect = (slotInfo) => {
    console.log(moment(new Date(slotInfo.start)));
    const selectedDate = moment(new Date(slotInfo.start));
    if (isMobile) {
      openModal(
        `Eventos del ${selectedDate.format("D [de] MMMM [de] YYYY")}`,
        asdf,
        "",
        true
      );
    }
    setSelectedDate(moment(slotInfo.start));
  };

  const calendar = (
    <>
      <CalendarCustom
        forEvents
        onDateSelect={handleDateSelect}
        onMonthChange={handleMonthChange}
        items={events}
        eventWrapper={spaceWrapper}
        //actionButton={actionButton}
      ></CalendarCustom>
    </>
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
            <Stack label={"Lista"} height={"100%"}>
              <Events noPage></Events>
            </Stack>
          </TabsCustom>
        </Stack>
      </Page>
    );
  }

  return (
    <Page
      title={"Eventos"}
      disablePadding
      disableDivider={isMobile}
      showHeader={!isMobile}
    >
      <Stack
        flex={10}
        className="card"
        direction={isMobile ? "column" : "row"}
        gap={"10px"}
      >
        {calendar}
        <CalendarList />
      </Stack>
    </Page>
  );
}
