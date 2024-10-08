import { useEffect, useState, useRef } from "react";
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
import { useModal } from "../components/hooks/useModal";
import ExpandableText from "../features/events/components/ExpandableText";
import ActivityViewer from "../features/events/components/ActivityViewer";
import CardReservation from "../features/reservations/components/CardReservation";

export default function EventView() {
  const [eventUV, setEventUV] = useState({});

  const { Modal, openModal, closeModal } = useModal();
  const { getEvent } = useEvents();
  const { idEvento } = useParams();
  useEffect(() => {
    getEvent(idEvento).then((response) => setEventUV(response.data.data));
  }, []);

  const fetchEvent = async () => {};

  const refs = {
    description: useRef(null),
  };

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

      <Header title={eventUV.name} padding={false}>
        <Stack>
          <Typography fontSize={18}>
            por{" "}
            <b>
              {`${eventUV.user?.names} ${eventUV.user?.paternalName} ${eventUV.user?.maternalName}`}
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
          {/*
           */}
          <CardEventSection
            title={"General"}
            event={eventUV}
            flex={2}
            maxHeight={"100%"}
          >
            <ExpandableText name="Descripción" id={"description"}>
              {eventUV.description}
            </ExpandableText>
            <Stack direction={"row"} gap={1} flexWrap={"wrap"}>
              <Typography>
                <b>Programas educativos:</b>
              </Typography>{" "}
              {eventUV.programs?.map((program, index) => (
                <ChipCustom label={program.name} />
              ))}
            </Stack>
          </CardEventSection>
          {/*
           */}
          <CardEventSection
            title={"Agenda"}
            event={eventUV}
            flex={1}
            maxHeight={"100%"}
          >
            <ActivityViewer
              name="Agenda"
              reservations={eventUV.reservations}
            ></ActivityViewer>
          </CardEventSection>
        </Stack>
        <CardEventSection title={"Logistica"} event={eventUV} flex={2}>
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
              display={eventUV.computerCenterRequirements ? "flex" : "none"}
            />
            <ChipCustom
              label={"Livestream"}
              display={eventUV.needsLivestream > 0 ? "flex" : "none"}
            />
            <ChipCustom label={`${eventUV.numParticipants} asistentes`} />
            <ChipCustom label={`${eventUV.numExternalParticipants} externos`} />
            <ChipCustom
              label={"Estacionamiento para externos"}
              display={eventUV.needsParking > 0 ? "flex" : "none"}
            />
            <ChipCustom
              label={"Fin de semana"}
              display={eventUV.needsWeekend > 0 ? "flex" : "none"}
            />
          </Stack>

          <ExpandableText
            name="Requisitos del CC"
            id={"computerCenterRequirements"}
          >
            {eventUV.computerCenterRequirements}
          </ExpandableText>
          <ExpandableText name="Decoracion" id={"decoration"}>
            {eventUV.decoration}
          </ExpandableText>

          <ExpandableText name="Presidium" id={"presidium"}>
            {eventUV.presidium}
          </ExpandableText>
          <ExpandableText name="Constancias" id={"speakers"}>
            {eventUV.speakers}
          </ExpandableText>
        </CardEventSection>

        <Stack gap={3} direction={{ md: "row", xs: "column" }}>
          <CardEventSection title={"Difusión"} event={eventUV} flex={3}>
            <Stack direction={"row"} gap={1}>
              <Typography>
                <b>Medios:</b>
              </Typography>{" "}
              <ChipCustom
                label={"Apoyo del CC"}
                display={eventUV.computerCenterRequirements ? "flex" : "none"}
              />
            </Stack>
          </CardEventSection>
          {eventUV.additional && (
            <CardEventSection title={"Adicional"} event={eventUV} flex={3}>
              <Typography>{eventUV.additional}</Typography>
            </CardEventSection>
          )}
        </Stack>
      </Stack>
      <Modal></Modal>
    </Stack>
  );

  function CardEventSection({ event, title, children, flex, maxHeight = 320 }) {
    if (!Array.isArray(children)) {
      children = [children];
    }
    const refsExpandable = children
      .filter((child) => child.type === "p")
      .map((expandable) => expandable.ref);
    const toggleExpand = () => {
      refsExpandable.map((ref) => ref.current.classList.toggle("line-clamp-4"));
    };

    const handleOpenModal = (title, content) => {
      toggleExpand();
      openModal(title, content, <Stack>buttons</Stack>, true);
    };

    return (
      <Stack
        height={"100%"}
        maxHeight={maxHeight}
        className="card"
        flex={flex}
        overflow={"hidden"}
        justifyContent={"space-between"}
      >
        <Stack
          sx={{
            padding: 2,
            height: "100%",
            maxHeight: "fit-content",
            alignItems: "start",
            justifyContent: "start",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="h5">{title}</Typography>
          <br />
          {children}
        </Stack>
      </Stack>
    );
  }
}
