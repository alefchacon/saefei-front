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
import ReplyIcon from "@mui/icons-material/Reply";
import { useParams } from "react-router-dom";
import ChipSpace from "../features/reservations/components/ChipSpace";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CampaignIcon from "@mui/icons-material/Campaign";
import moment from "moment";

import CardReservation from "../features/reservations/components/CardReservation";

export default function EventView() {
  const [UVEvent, setUVEvent] = useState({});
  const { getEvent } = useEvents();
  const { idEvento } = useParams();
  useEffect(() => {
    getEvent(idEvento).then((response) => setUVEvent(response.data.data));
  }, []);

  const fetchEvent = async () => {};

  return (
    <Stack
      position={"relative"}
      direction={"column"}
      gap={0}
      height={"fit-content"}
    >
      {/*
      <Stack
        className="page"
        position={"fixed"}
        bottom={0}
        right={50}
        width={800}
        height={500}
        zIndex={100}
      >
        asdf
      </Stack>
      */}

      <Header title={UVEvent.name} padding={false}>
        <Stack>
          <Typography fontSize={18}>
            por{" "}
            <b>
              {`${UVEvent.user?.names} ${UVEvent.user?.paternalName} ${UVEvent.user?.maternalName}`}
            </b>
          </Typography>
          <Stack direction={"row"} gap={3}>
            <Button startIcon={<ReplyIcon />}>Responder notificación</Button>
            <Button startIcon={<CampaignIcon />}>Notificar medios</Button>
          </Stack>
        </Stack>
      </Header>
      <br />
      <Stack gap={3}>
        <Stack gap={3} direction={{ md: "row", xs: "column" }}>
          <CardEventSection title={"General"} event={UVEvent} flex={3}>
            <Typography variant="paragraph" fontSize={16}>
              <b>Descripción:</b> {UVEvent.description}
            </Typography>
            <Stack direction={"row"} gap={1}>
              <Typography>
                <b>Programas educativos:</b>
              </Typography>{" "}
              {UVEvent.programs?.map((program, index) => (
                <ChipCustom label={program.name} />
              ))}
            </Stack>
          </CardEventSection>
          <CardEventSection title={"Agenda"} event={UVEvent} flex={1}>
            <Stack gap={3}>
              {UVEvent.reservations?.map((reservation, index) => (
                <CardReservation reservation={reservation}></CardReservation>
              ))}
            </Stack>
          </CardEventSection>
        </Stack>
        <CardEventSection title={"Logistica"} event={UVEvent} flex={3}>
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
        </CardEventSection>

        <Stack gap={3} direction={"row"}>
          <CardEventSection title={"Difusión"} event={UVEvent} flex={3}>
            <Stack direction={"row"} gap={1}>
              <Typography>
                <b>Medios:</b>
              </Typography>{" "}
              <ChipCustom
                label={"Apoyo del CC"}
                display={UVEvent.computerCenterRequirements ? "flex" : "none"}
              />
            </Stack>
          </CardEventSection>
          {UVEvent.additional && (
            <CardEventSection title={"Adicional"} event={UVEvent} flex={3}>
              <Typography>{UVEvent.additional}</Typography>
            </CardEventSection>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
}

function CardEventSection({ event, title, children, flex, maxHeight = 320 }) {
  return (
    <Stack
      height={"100%"}
      maxHeight={maxHeight}
      className="page"
      flex={flex}
      overflow={"hidden"}
    >
      <CardActionArea
        sx={{
          padding: 2,
          height: "100%",
          alignItems: "start",
          justifyContent: "start",
          display: "flex",
          flexDirection: "column",
        }}
      >
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
