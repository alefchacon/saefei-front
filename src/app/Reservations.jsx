import { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import moment from "moment";
import Page from "../components/Page";
import Header from "../components/Header";
import CalendarReservations from "../features/reservations/components/CalendarReservations";
import events from "../stores/events";
import { useReservations } from "../features/reservations/businessLogic/useReservations";
import ChipSpace from "../features/reservations/components/ChipSpace";
import SPACES from "../stores/SPACES";
import IconButton from "@mui/material/IconButton";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import Collapse from "@mui/material/Collapse";
import ChipReservation from "../features/reservations/components/ChipReservation";
import ListItemButton from "@mui/material/ListItemButton";
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

export default function Reservations() {
  const [selectedDate, setSelectedDate] = useState(moment());
  const [reservations, setReservations] = useState([]);
  const { getReservationsByMonth } = useReservations();
  const handleDateSelect = (slotInfo) => {
    setSelectedDate(moment(slotInfo.start));
  };

  const itemsInSelectedDate = reservations.filter((item) =>
    moment(item.date).isSame(moment(selectedDate), "day", "[)")
  );

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

  return (
    <Page title={"Reservaciones"} disablePadding>
      <Stack flex={2} className="page" direction={"row"}>
        <br />
        <CalendarReservations
          forEvents={false}
          onDateSelect={handleDateSelect}
          onMonthChange={handleMonthChange}
          items={reservations}
        ></CalendarReservations>
        <Stack
          id="reservation-list"
          className="page"
          position={"relative"}
          flex={1}
          display={{ md: "flex", xs: "none" }}
        >
          <Stack padding={"20px"}>
            <Typography>Reservaciones del</Typography>
            <Typography
              variant="h5"
              color={"black"}
              fontSize={{ md: 26, xs: 20 }}
            >
              {selectedDate.format("DD/MM/YYYY")}
            </Typography>
          </Stack>
          <Stack gap={3}>
            {SPACES.map((space, index) => (
              <ReservationGroup
                space={space}
                reservations={itemsInSelectedDate.filter(
                  (item) => item.space.id === space.id
                )}
              ></ReservationGroup>
            ))}
          </Stack>
          {/*
        {itemsInSelectedDate.map((item, index) => (
          <Stack key={index}>{item.title}</Stack>
          ))}
          */}
        </Stack>
      </Stack>
    </Page>
  );
}
