import { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ChipCustom from "../components/Chip";
import Header from "../components/Header";

import { useEvents } from "../features/events/businessLogic/useEvents";

import { useParams } from "react-router-dom";
import ChipSpace from "../features/reservations/components/ChipSpace";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import moment from "moment";
function CardReservation({ reservation }) {
  return (
    <Stack gap={1} direction={"column"}>
      <ChipSpace space={reservation.space}></ChipSpace>
      <Stack direction={"row"} gap={5}>
        <Stack direction={"row"} gap={1}>
          <EventIcon></EventIcon>
          <Typography>
            {moment(reservation.space.date).format("DD/MM/YYYY")}
          </Typography>
        </Stack>
        <Stack direction={"row"} gap={1}>
          <AccessTimeIcon></AccessTimeIcon>
          <Typography color="error">WIP</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default function EventView() {
  const [UVEvent, setUVEvent] = useState({});
  const { getEvent } = useEvents();
  const { idEvento } = useParams();
  useEffect(() => {
    getEvent(idEvento).then((response) => setUVEvent(response.data.data));
  }, []);

  const fetchEvent = async () => {};

  return (
    <Stack direction={"column"} gap={2} height={"fit-content"}>
      <Header title={UVEvent.name} padding={false}>
        <Stack>
          <Typography fontSize={18}>
            por{" "}
            <b>
              {`${UVEvent.user?.names} ${UVEvent.user?.paternalName} ${UVEvent.user?.maternalName}`}
            </b>
          </Typography>
        </Stack>
      </Header>

      <CardEvent title={"General"} event={UVEvent} flex={3}>
        <Typography variant="paragraph" fontSize={16}>
          <b>Descripción:</b> {UVEvent.description}
        </Typography>
      </CardEvent>
      <CardEvent title={"Agenda"} event={UVEvent} flex={3}>
        <Stack gap={3}>
          {UVEvent.reservations?.map((reservation, index) => (
            <CardReservation reservation={reservation}></CardReservation>
          ))}
        </Stack>
      </CardEvent>
      <CardEvent title={"Logistica"} event={UVEvent} flex={3}>
        <Stack
          direction={"row"}
          flexWrap={"wrap"}
          gap={1}
          alignItems={"center"}
        >
          <Typography>
            <b>Requiere:</b>
          </Typography>{" "}
          <ChipCustom
            label={"Apoyo del CC"}
            display={UVEvent.computerCenterRequirements ? "flex" : "none"}
          />
          <ChipCustom
            label={"Livestream"}
            display={UVEvent.needsLivestream > 0 ? "flex" : "none"}
          />
          <ChipCustom label={`${UVEvent.numParticipants} asistentes`} />
          <ChipCustom label={`${UVEvent.numExternalParticipants} externos`} />
          <ChipCustom
            label={"Estacionamiento para externos"}
            display={UVEvent.needsParking > 0 ? "flex" : "none"}
          />
          <ChipCustom
            label={"Fin de semana"}
            display={UVEvent.needsWeekend > 0 ? "flex" : "none"}
          />
        </Stack>
        <Typography>
          <b>Requisitos del CC: </b>
          {UVEvent.computerCenterRequirements}
        </Typography>
        <Typography>
          <b>Decoracion: </b>
          {UVEvent.decoration}
        </Typography>
        <Typography>
          <b>Presidium: </b>
          {UVEvent.presidium}
        </Typography>
        <Typography>
          <b>Constancias: </b>
          {UVEvent.speakers}
        </Typography>
      </CardEvent>
    </Stack>
  );
}

function CardEvent({ event, title, children, flex }) {
  return (
    <Stack height={"100%"} className="page" flex={flex}>
      <CardActionArea sx={{ padding: 2 }}>
        <Typography variant="h5">{title}</Typography>
        <br />
        <Stack elevation={0} className="" gap={2}>
          {children}
        </Stack>
      </CardActionArea>
      <CardActions sx={{ height: "fit-content", bgcolor: "white" }}>
        <Button>Ver más</Button>
        <Button>Editar</Button>
      </CardActions>
    </Stack>
  );
}
