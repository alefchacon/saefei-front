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
import TabsCustom from "../components/Tabs";
import downloadAsZip from "../util/downloadAsZip";
import Page from "../components/Page";
import TextField from "@mui/material/TextField";
//MOVE THIS TO SOME KIND OF ENV FILE!! >:D
const FILE_URL = "http://localhost:8000/api/file/";

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

  const handleDownloadAsZip = () => {
    downloadAsZip(
      eventUV.publicity,
      `SAE_publicidad_${eventUV.name.split(" ").join("-")}`
    );
  };

  const showReplyModal = () => {
    openModal("Responder notificación", <div>safd</div>, "", true, "", true);
  };

  return (
    <Stack gap={2}>
      <Page
        disablePadding
        title={
          <Stack
            direction={"row"}
            width={"100%"}
            justifyContent={"space-between"}
          >
            <Stack width={"100%"}>
              {eventUV.name}
              <Stack gap={"20px"}>
                <Typography fontSize={18}>
                  por{" "}
                  <b>
                    {`${eventUV.user?.names} ${eventUV.user?.paternalName} ${eventUV.user?.maternalName}`}
                  </b>
                </Typography>

                <ExpandableText id={"description"} modalTitle="Descripción">
                  {eventUV.description}
                </ExpandableText>
                <Stack direction={"row"} gap={3}>
                  <Button startIcon={<ReplyIcon />} onClick={showReplyModal}>
                    Responder notificación
                  </Button>
                  <Button startIcon={<CampaignIcon />}>Notificar medios</Button>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        }
      >
        <Stack gap={3} id={"principal"}>
          <Stack gap={3} direction={{ md: "row", xs: "column" }}>
            {/*
             */}
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
                <ChipCustom
                  label={`${eventUV.numExternalParticipants} externos`}
                />
                <ChipCustom
                  label={"Estacionamiento para externos"}
                  display={eventUV.needsParking > 0 ? "flex" : "none"}
                />
                <ChipCustom
                  label={"Fin de semana"}
                  display={eventUV.needsWeekend > 0 ? "flex" : "none"}
                />
              </Stack>
              <br />
              <Stack gap={"10px"}>
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
              <br />
              {eventUV.chronogram && (
                <Button>
                  <a
                    href={FILE_URL.concat(eventUV.chronogram.file)}
                    target="_blank"
                  >
                    Descargar cronograma
                  </a>
                </Button>
              )}
            </CardEventSection>
          </Stack>

          <Stack gap={3} direction={{ md: "row", xs: "column" }}>
            <CardEventSection title={"Difusión"} event={eventUV} flex={3}>
              <Stack direction={"row"} gap={1} flexWrap={"wrap"}>
                <Typography>
                  <b>Medios:</b>
                </Typography>{" "}
                {eventUV.media?.split(",").map((medium, index) => (
                  <ChipCustom label={medium} key={index} />
                ))}
              </Stack>
              <br />
              {eventUV.publicity?.length > 0 && (
                <Button onClick={handleDownloadAsZip}>
                  Descargar material promocional
                </Button>
              )}
            </CardEventSection>
            {eventUV.additional && (
              <CardEventSection title={"Adicional"} event={eventUV} flex={3}>
                <ExpandableText
                  modalTitle="Adicional"
                  id={"additional"}
                  maxLines={4}
                >
                  {eventUV.additional}
                </ExpandableText>
              </CardEventSection>
            )}
          </Stack>
        </Stack>
        <Stack id="principal2">sadf</Stack>
      </Page>

      <Stack className="card" padding={"40px"} gap={"20px"}>
        <Typography variant="h5" fontWeight={500}>
          Respuesta
        </Typography>
        <TextField multiline rows={10} variant="filled"></TextField>
        <Stack className="button-row">
          <Button variant="contained">Responder notificación</Button>
        </Stack>
      </Stack>

      <Modal></Modal>
    </Stack>
  );

  function CardEventSection({
    event,
    title,
    children,
    flex,
    maxHeight = "100%",
  }) {
    if (!Array.isArray(children)) {
      children = [children];
    }
    const refsExpandable = children
      .filter((child) => child?.type === "p")
      .map((expandable) => expandable.ref);
    const toggleExpand = () => {
      refsExpandable.map((ref) => ref.current.classList.toggle("line-clamp-4"));
    };

    return (
      <Stack
        height={"100%"}
        maxHeight={maxHeight}
        className="card shadow"
        flex={flex}
        overflow={"hidden"}
        justifyContent={"space-between"}
        bgcolor={"white"}
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
          <Typography variant="h5" fontWeight={500}>
            {title}
          </Typography>
          <br />
          {children}
        </Stack>
      </Stack>
    );
  }
}
