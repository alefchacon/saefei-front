import { useEffect, useState, useRef } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ChipCustom from "../components/Chip";
import ChipTabs from "../components/ChipTabs";
import { useEvents } from "../features/events/businessLogic/useEvents";
import { useParams } from "react-router-dom";
import { useModal } from "../components/hooks/useModal";
import ExpandableText from "../features/events/components/ExpandableText";
import ActivityViewer from "../features/events/components/ActivityViewer";
import CardReservation from "../features/reservations/components/CardReservation";
import TabsCustom from "../components/Tabs";
import downloadAsZip from "../util/downloadAsZip";
import Page from "../components/Page";
import TextField from "@mui/material/TextField";
//MOVE THIS TO SOME KIND OF ENV FILE!! >:D
import FILE_URL from "../stores/fileUrl";
import useIsMobile from "../components/hooks/useIsMobile";
import ButtonResponsive from "../components/ButtonResponsive";
import { SCROLL_UP } from "../stores/scrollDirections";
import Collapse from "@mui/material/Collapse";
import FabResponsive from "../components/FabResponsive";
import ReplyForm from "../features/notices/components/ReplyForm";
import * as MEDIA_NOTICES from "../stores/mediaNotices";
import { Program } from "../features/reservations/domain/program";
import CardEventSection from "../features/events/components/CardEventSection";
import useAuth from "../features/auth/businessLogic/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import { ROUTE_EDIT } from "../stores/routes";
import SendIcon from "@mui/icons-material/Send";
export default function EventView({ defaultEventUV, onReply, disableLoading }) {
  const isMobile = useIsMobile();
  const { getUser } = useAuth();
  const user = getUser();
  const navigate = useNavigate();
  const location = useLocation();

  const { Modal, openModal, closeModal } = useModal();
  const { getEvent, eventUV, updateEvent, uploadFile } = useEvents();
  const { idEvento } = useParams();

  useEffect(() => {
    if (idEvento) {
      getEvent(idEvento);
    }
    if (defaultEventUV) {
      getEvent(defaultEventUV.id);
    }
    if (isMobile) {
      closeModal();
    }
  }, [defaultEventUV]);

  const handleDownloadAsZip = () => {
    downloadAsZip(
      eventUV.publicity,
      `SEA_publicidad_${eventUV.name.split(" ").join("-")}`
    );
  };

  const showReplyModal = () => {
    openModal(
      "Responder notificación",
      <ResponsePanel></ResponsePanel>,
      "",
      true,
      "",
      false
    );
  };

  const handleUpdatedEvent = (updatedEvent) => {
    //setEventUV(updatedEvent);
    if (onReply) {
      onReply(updatedEvent);
    }
  };

  const userCanEdit = user?.isCoordinator || eventUV.idUsuario === user?.id;

  function ResponsePanel() {
    return (
      <Stack className="card" padding={"0px"} gap={"20px"}>
        <TabsCustom>
          {userCanEdit && (
            <Stack label="Respuesta al organizador">
              <ReplyForm
                editable={user?.isCoordinator}
                submitButton={user?.isCoordinator}
                eventUV={eventUV}
                onSuccess={handleUpdatedEvent}
              ></ReplyForm>
            </Stack>
          )}

          {user?.isCoordinator && (
            <Stack label="Notificación a medios">
              <br />
              <ChipTabs>
                <Stack label="Página institucional" value={0}>
                  <MediaNoticeForm
                    key={"institutional-page"}
                    id={"institutional-page"}
                    mediaNotice={MEDIA_NOTICES.MEDIA_NOTICE_INSTITUTIONAL_PAGE}
                  ></MediaNoticeForm>
                </Stack>
                <Stack label="Correo institucional" value={1}>
                  <MediaNoticeForm
                    key={"institutional-email"}
                    id={"institutional-email"}
                    mediaNotice={MEDIA_NOTICES.MEDIA_NOTICE_INSTITUTIONAL_EMAIL}
                  ></MediaNoticeForm>
                </Stack>
                <Stack label="Redes sociales">
                  <MediaNoticeForm
                    key={"social-media"}
                    id={"social-media"}
                    mediaNotice={MEDIA_NOTICES.MEDIA_NOTICE_SOCIAL_MEDIA}
                  ></MediaNoticeForm>
                </Stack>
                <Stack label="Comunicación UV">
                  <MediaNoticeForm
                    key={"comunication-uv"}
                    id={"comunication-uv"}
                    mediaNotice={MEDIA_NOTICES.MEDIA_NOTICE_COMUNICATION_UV}
                  ></MediaNoticeForm>
                </Stack>
                <Stack label="Radio UV">
                  <MediaNoticeForm
                    key={"radio-uv"}
                    id={"radio-uv"}
                    mediaNotice={MEDIA_NOTICES.MEDIA_NOTICE_RADIO_UV}
                  ></MediaNoticeForm>
                </Stack>
              </ChipTabs>
            </Stack>
          )}
        </TabsCustom>
      </Stack>
    );
  }

  const navigateToEdit = () => {
    navigate(`${location.pathname}${ROUTE_EDIT}`, {
      state: { eventUVToUpdate: eventUV },
    });
  };

  return (
    <>
      <Page
        showHeader
        disableLoading={!isMobile}
        disablePadding
        title={
          <Stack direction={"row"} width={"100%"} justifyContent={"start"}>
            <Stack width={"100%"}>
              {eventUV?.name}
              <Stack direction={"column"}>
                <Typography fontSize={15}>
                  por <b>{`${eventUV?.user?.fullname}`}</b>
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        }
      >
        <Stack
          gap={"8px"}
          id={"principal"}
          position={"relative"}
          paddingBottom={{ md: "", xs: "200px" }}
        >
          {defaultEventUV?.name}
          <Stack direction={"row"} flexWrap={"wrap"} gap={"px"}>
            {eventUV?.programs?.map((program, index) => {
              const programModel = new Program(program);
              return (
                <ChipCustom
                  label={programModel.initials}
                  title={programModel.name}
                ></ChipCustom>
              );
            })}
          </Stack>
          <ExpandableText id={"description"} modalTitle="Descripción">
            {eventUV?.description}
          </ExpandableText>
          <Stack gap={"5px"} direction={{ md: "row", xs: "column" }}>
            {/*
             */}

            {userCanEdit && (
              <CardEventSection
                editable={userCanEdit}
                title={"Logística"}
                eventUV={eventUV}
                onUpdate={updateEvent}
                fieldKeys={[
                  "requisitosCentroComputo",
                  "decoracion",
                  "presidium",
                  "constancias",
                  "numParticipantes",
                  "numParticipantesExternos",
                  "requiereFinDeSemana",
                  "requiereTransmisionEnVivo",
                ]}
                flex={2}
              >
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
                    display={
                      eventUV?.computerCenterRequirements ? "flex" : "none"
                    }
                  />
                  <ChipCustom
                    label={"Livestream"}
                    display={eventUV?.needsLivestream > 0 ? "flex" : "none"}
                  />
                  <ChipCustom
                    label={`${eventUV?.numParticipants} asistentes`}
                  />
                  <ChipCustom
                    label={`${eventUV?.numParticipantsExternal} externos`}
                  />
                  <ChipCustom
                    label={"Estacionamiento para externos"}
                    display={eventUV?.needsParking > 0 ? "flex" : "none"}
                  />
                  <ChipCustom
                    label={"Fin de semana"}
                    display={eventUV?.needsWeekend > 0 ? "flex" : "none"}
                  />
                </Stack>
                <br />
                <Stack gap={"10px"}>
                  <ExpandableText
                    name="Requisitos del CC"
                    id={"computerCenterRequirements"}
                  >
                    {eventUV?.computerCenterRequirements}
                  </ExpandableText>
                  <ExpandableText name="Decoracion" id={"decoration"}>
                    {eventUV?.decoration}
                  </ExpandableText>

                  <ExpandableText name="Presidium" id={"presidium"}>
                    {eventUV?.presidium}
                  </ExpandableText>
                  <ExpandableText name="Constancias" id={"records"}>
                    {eventUV?.records}
                  </ExpandableText>
                </Stack>
              </CardEventSection>
            )}
            {/*
             */}
            <CardEventSection
              title={"Agenda"}
              eventUV={eventUV}
              flex={1}
              maxHeight={"100%"}
              editable={userCanEdit}
              onUpdate={updateEvent}
              onUploadFile={uploadFile}
              secondaryAction={
                Boolean(eventUV?.chronogram) ? (
                  <a
                    href={FILE_URL.concat(eventUV?.chronogram.file)}
                    //target="_blank"
                  >
                    <Button onClick={handleDownloadAsZip}>
                      Descargar cronograma
                    </Button>
                  </a>
                ) : (
                  <Button onClick={handleDownloadAsZip} disabled>
                    Sin cronograma
                  </Button>
                )
              }
            >
              <ActivityViewer
                name="Agenda"
                reservations={eventUV?.reservations}
                editable={userCanEdit}
                forCoordinator={user?.isCoordinator}
              ></ActivityViewer>
              <br />
            </CardEventSection>
          </Stack>
          <Stack gap={"5px"} direction={{ md: "row", xs: "column" }}>
            <CardEventSection
              title={"Difusión"}
              eventUV={eventUV}
              flex={3}
              editable={userCanEdit}
              onUpdate={updateEvent}
              onUploadFile={uploadFile}
              secondaryAction={
                eventUV?.publicity?.length > 0 ? (
                  <Button onClick={handleDownloadAsZip}>
                    Descargar material ({eventUV?.publicity?.length})
                  </Button>
                ) : (
                  <Button onClick={handleDownloadAsZip} disabled>
                    Sin material publicitario
                  </Button>
                )
              }
            >
              {userCanEdit && (
                <Stack direction={"row"} gap={1} flexWrap={"wrap"}>
                  <Typography>
                    <b>Medios:</b>
                  </Typography>{" "}
                  {eventUV?.media?.map((medium, index) => (
                    <ChipCustom label={medium} key={index} />
                  ))}
                </Stack>
              )}
              <br />
            </CardEventSection>
            {eventUV?.additional && userCanEdit && (
              <CardEventSection
                eventUV={eventUV}
                title={"Adicional"}
                fieldKeys={["adicional"]}
                event={eventUV}
                flex={3}
                editable={userCanEdit}
                onUpdate={updateEvent}
              >
                <ExpandableText
                  modalTitle="Adicional"
                  id={"additional"}
                  maxLines={4}
                >
                  {eventUV?.additional}
                </ExpandableText>
              </CardEventSection>
            )}
          </Stack>
          {user?.isCoordinator && (
            <FabResponsive
              label="responder notificación"
              variant="extended"
              onClick={showReplyModal}
            >
              <Stack
                direction={"row"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={"10px"}
              >
                <SendIcon></SendIcon>
                Responder
              </Stack>
            </FabResponsive>
          )}
          {!isMobile && <ResponsePanel></ResponsePanel>}
        </Stack>
      </Page>

      <Modal></Modal>
    </>
  );

  function MediaNoticeForm({ mediaNotice, id }) {
    return (
      <Stack gap={"20px"}>
        <TextField
          id={`${id}-email`}
          variant="filled"
          defaultValue={mediaNotice.email}
          label={"Para"}
          sx={{ maxWidth: "300px" }}
        ></TextField>
        <TextField
          id={`${id}-notice`}
          defaultValue={mediaNotice.notice}
          multiline
          rows={10}
          variant="filled"
        ></TextField>
        <Stack className="button-row">
          <ButtonResponsive>Notificar</ButtonResponsive>
        </Stack>
      </Stack>
    );
  }
}
