import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useEvents } from "../features/events/businessLogic/useEvents";
import { useParams } from "react-router-dom";
import { useModal } from "../components/hooks/useModal";
import TabsCustom from "../components/Tabs";
import Page from "../components/Page";
import TextField from "@mui/material/TextField";
import useIsMobile from "../components/hooks/useIsMobile";
import ButtonResponsive from "../components/ButtonResponsive";
import useAuth from "../features/auth/businessLogic/useAuth";
import { useLocation, Navigate } from "react-router-dom";
import GeneralForm from "./Notify/StepForms/GeneralForm";
import RecordsForm from "./Notify/OptionalForms/RecordsForm";
import TechRequirementsForm from "./Notify/OptionalForms/TechRequirementsForm";
import PresidiumForm from "./Notify/OptionalForms/PresidiumForm";
import DecorationForm from "./Notify/OptionalForms/DecorationForm";
import BroadcastForm from "./Notify/OptionalForms/BroadcastForm";
import AdditionalForm from "./Notify/OptionalForms/AdditionalForm";
import { Formik, Form } from "formik";
import { ROUTE_CALENDAR_EVENTS } from "../stores/ROUTES";

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
            showHeader
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
