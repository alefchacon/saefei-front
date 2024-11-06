import { useState, useEffect, cloneElement, Children } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import moment from "moment";
import Page from "../components/Page";
import Header from "../components/Header";
import CalendarCustom from "../components/CalendarCustom";
import events from "../stores/events";
import { useReservations } from "../features/reservations/businessLogic/useReservations";
import ChipSpace from "../features/reservations/components/ChipSpace";
import SPACES from "../stores/SPACES";
import IconButton from "@mui/material/IconButton";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import Collapse from "@mui/material/Collapse";
import ChipReservation from "../features/reservations/components/ChipReservation";
import ListItemButton from "@mui/material/ListItemButton";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { ROUTE_NOTIFY } from "../stores/ROUTES";
import { useEvents } from "../features/events/businessLogic/useEvents";
import { getScheduleString } from "../util/moments";
function ReservationGroup({ space = {}, reservations = [] }) {
  const [show, setShow] = useState(true);

  const toggleShow = () => setShow(!show);

  const sx = {
    direction: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
  };

  return (
    <Stack>
      <ListItemButton
        sx={sx}
        onClick={toggleShow}
        disableRipple={reservations.length < 1}
      >
        <ChipSpace space={space} />{" "}
        {reservations.length > 0 && (
          <ExpandCircleDownIcon></ExpandCircleDownIcon>
        )}
      </ListItemButton>
      <Divider></Divider>
      <Stack padding={1}>
        {reservations.length === 0 ? (
          <Typography textAlign={"center"} sx={{ opacity: 0.5 }}>
            Nadie ha reservado este espacio
          </Typography>
        ) : (
          <Collapse in={show}>
            <Stack gap={1} padding={"0 20px"}>
              {reservations.map((reservation, index) => (
                <ChipReservation
                  existingReservation={reservation}
                  key={index}
                />
              ))}
            </Stack>
          </Collapse>
        )}
      </Stack>
    </Stack>
  );
}

export default function CalendarEvents() {
  const [selectedDate, setSelectedDate] = useState(moment());
  const [events, setEvents] = useState([]);
  const { getCalendarEvents } = useEvents();
  const handleDateSelect = (slotInfo) => {
    setSelectedDate(moment(slotInfo.start));
  };

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
      <Button
        disableElevation
        onClick={() => console.log("asdf")}
        variant="contained"
      >
        Notificar evento
      </Button>
    </Link>
  );

  function CardCalendarEvent({ event }) {
    return (
      <ListItemButton disableGutters>
        <Stack
          direction={"row"}
          gap={"20px"}
          borderLeft={"10px solid var(--blue)"}
          padding={"10px 10px 10px 30px"}
        >
          <Typography width={"100px"}>{getScheduleString(event)}</Typography>
          <Stack flex={2}>
            <Typography variant="h6">{event?.name}</Typography>
            <ChipSpace space={event?.space}></ChipSpace>
          </Stack>
        </Stack>
      </ListItemButton>
    );
  }

  return (
    <Page title={"Eventos"} disablePadding>
      <Stack flex={10} className="page" direction={"row"} gap={"10px"}>
        <br />
        <CalendarCustom
          forEvents
          onDateSelect={handleDateSelect}
          onMonthChange={handleMonthChange}
          items={events}
          eventWrapper={spaceWrapper}
          actionButton={actionButton}
        ></CalendarCustom>
        <Stack
          id="event-list"
          className=""
          position={"relative"}
          flex={0.8}
          display={{ md: "flex", xs: "none" }}
          padding={"0 10px"}
        >
          <Stack padding={"10px 0"}>
            <Typography>Eventos del</Typography>
            <Typography
              variant="h5"
              color={"black"}
              fontSize={{ md: 26, xs: 20 }}
            >
              {selectedDate.format("DD/MM/YYYY")}
            </Typography>
          </Stack>
          <Stack gap={"10px"}>
            {itemsInSelectedDate.map((event, index) => (
              <CardCalendarEvent event={event} />
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Page>
  );
}
