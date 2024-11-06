import { useEffect, useState, useRef } from "react";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ChipCustom from "../components/Chip";
import Header from "../components/Header";
import ChipTabs from "../components/ChipTabs";
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
import useIsMobile from "../components/hooks/useIsMobile";
import ButtonResponsive from "../components/ButtonResponsive";
import { SCROLL_UP } from "../stores/SCROLL_DIRECTIONS";
import Collapse from "@mui/material/Collapse";
import FabResponsive from "../components/FabResponsive";
import ReplyForm from "../features/notices/components/ReplyForm";
import * as MEDIA_NOTICES from "../stores/MEDIA_NOTICES";
import { Program } from "../features/reservations/domain/program";
import CardEventSection from "../features/events/components/CardEventSection";
import useAuth from "../features/auth/businessLogic/useAuth";
import { useLocation, Navigate } from "react-router-dom";
import GeneralForm from "./Notify/StepForms/GeneralForm";
import ScheduleForm from "./Notify/StepForms/ScheduleForm";
import RecordsForm from "./Notify/OptionalForms/RecordsForm";
import TechRequirementsForm from "./Notify/OptionalForms/TechRequirementsForm";
import PresidiumForm from "./Notify/OptionalForms/PresidiumForm";
import ExternalParticipantsForm from "./Notify/OptionalForms/ExternalParticipantsForm";
import DecorationForm from "./Notify/OptionalForms/DecorationForm";
import BroadcastForm from "./Notify/OptionalForms/BroadcastForm";
import AdditionalForm from "./Notify/OptionalForms/AdditionalForm";
import { Formik, Form } from "formik";
import { ROUTE_CALENDAR_EVENTS } from "../stores/ROUTES";
import { validate } from "uuid";
import { eventSchema } from "../features/events/validation/eventSchema";

export default function EventUpdateForm({ defaultEventUV, onReply }) {
  const isMobile = useIsMobile();
  const { getUser } = useAuth();
  const user = getUser();
  const { Modal, openModal, closeModal } = useModal();
  const { updateEvent, getEvent } = useEvents();
  const { idEvento } = useParams();

  const location = useLocation();
  let { eventUVToUpdate } = location.state || {};
  eventUVToUpdate.activitites = eventUVToUpdate.reservations.map(
    (reservation) => console.log(reservation.activities)
  );
  const handleUpdatedEvent = (updatedEvent) => {
    setEventUV(updatedEvent);
    if (onReply) {
      onReply(updatedEvent);
    }
  };

  const handleUpdateEvent = async (values) => {
    const response = await updateEvent(values);
  };

  const userCanEdit =
    user.isCoordinator || eventUVToUpdate.idUsuario === user.id;

  if (!userCanEdit) {
    return (
      <Navigate to={ROUTE_CALENDAR_EVENTS} state={{ from: location }} replace />
    );
  }

  return (
    <>
      <Formik initialValues={eventUVToUpdate}>
        {({ values }) => (
          <Page
            disableLoading={!isMobile}
            title={
              <Stack direction={"row"} width={"100%"} justifyContent={"start"}>
                <Stack width={"100%"}>
                  {eventUVToUpdate?.name}
                  <Stack gap={"20px"}>
                    <Typography fontSize={18}>
                      por{" "}
                      <b>
                        {`${eventUVToUpdate?.user?.names} ${eventUVToUpdate?.user?.paternalName} ${eventUVToUpdate?.user?.maternalName}`}
                      </b>
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            }
          >
            {eventUVToUpdate.id}
            <Form>
              <Stack gap={3} id={"principal"} position={"relative"}>
                <TabsCustom>
                  <Stack label={"General"}>
                    <GeneralForm></GeneralForm>
                  </Stack>

                  <Stack label={"Logística"} gap={"var(--field-gap)"}>
                    <Stack>
                      <Typography variant="h5">Requisitos técnicos</Typography>
                      <TechRequirementsForm></TechRequirementsForm>
                    </Stack>
                    <Stack>
                      <Typography variant="h5">Decoración</Typography>
                      <DecorationForm></DecorationForm>
                    </Stack>
                    <Stack>
                      <Typography variant="h5">Presidium</Typography>
                      <PresidiumForm></PresidiumForm>
                    </Stack>
                    <Stack>
                      <Typography variant="h5">Constancias</Typography>
                      <RecordsForm></RecordsForm>
                    </Stack>
                  </Stack>
                  <Stack label={"Difusión"}>
                    <BroadcastForm></BroadcastForm>
                  </Stack>
                  <Stack label={"Adicional"}>
                    <AdditionalForm></AdditionalForm>
                  </Stack>
                </TabsCustom>
              </Stack>
            </Form>
            <Stack className="base-padding">
              <ButtonResponsive onClick={() => handleUpdateEvent(values)}>
                Guardar
              </ButtonResponsive>
            </Stack>
          </Page>
        )}
      </Formik>

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
