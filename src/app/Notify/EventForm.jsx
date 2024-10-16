import { useEffect, useState, useRef } from "react";
import { Formik, useFormikContext } from "formik";
import { v4 as uuidv4, validate } from "uuid";
import moment from "moment";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";
import HailIcon from "@mui/icons-material/Hail";
import Slide from "@mui/material/Slide";

import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import SettingsIcon from "@mui/icons-material/Settings";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CampaignIcon from "@mui/icons-material/Campaign";

import StepperCustom from "../../components/Stepper";
import Page from "../../components/Page";
import SectionButton from "../../components/SectionButton";
import { useReservations } from "../../features/reservations/businessLogic/useReservations";
import useAuth from "../../features/auth/businessLogic/useAuth";
import { useModal } from "../../components/hooks/useModal";
import { eventSchema } from "../../features/events/validation/eventSchema";

import GeneralForm from "./StepForms/GeneralForm";
import ScheduleForm from "./StepForms/ScheduleForm";
import DemographicForm from "./StepForms/DemographicForm";

import BroadcastForm from "./OptionalForms/BroadcastForm";
import RecordsForm from "./OptionalForms/RecordsForm";
import DecorationForm from "./OptionalForms/DecorationForm";
import TechRequirementsForm from "./OptionalForms/TechRequirementsForm";
import ExternalParticipantsForm from "./OptionalForms/ExternalParticipantsForm";
import AdditionalForm from "./OptionalForms/AdditionalForm";
import { sortAsc } from "../../util/moments";
import { useEvents } from "../../features/events/businessLogic/useEvents";
import { useLoading } from "../../components/providers/LoadingProvider";
import EventFormSkeleton from "./StepForms/EventFormSkeleton";
import DomainIcon from "@mui/icons-material/Domain";
import { Routes, Route } from "react-router-dom";

export default function EventForm({}) {
  const { getReservationsAvailableToUser } = useReservations();
  const { getUser } = useAuth();
  const { storeEvent } = useEvents();
  const user = getUser();
  const { loading } = useLoading();
  const [userReservations, setUserReservations] = useState([]);
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    getReservationsAvailableToUser(getUser().id).then((response) => {
      setUserReservations(response.data.data);
    });
  }, []);

  const handleSubmit = (values, actions) => {
    storeEvent(values);
  };

  return (
    <>
      <Formik
        onSubmit={handleSubmit}
        validationSchema={eventSchema}
        validateOnBlur={true}
        className="section"
        initialValues={{
          idUsuario: user.id,
          name: "",
          description: "",
          numParticipants: "",
          reservations: [],
          activities: [],
          chronogram: "",
          programs: [],
          audiences: [],
          idTipo: "",
          scope: "",
          axis: "",
          themes: [],

          //BroadcastForm
          media: [],
          publicity: [],

          //RecordsForm
          records: "",

          //DecorationForm
          decoration: "",

          //TechRequirementsForm
          technicalRequirements: "",
          needsLivestream: "",

          //ExternalParticipantsForm
          numParticipantsExternal: 0,
          needsParking: "",
          needsWeekend: "",

          //Additional
          additional: "",
        }}
      >
        <StepForm userReservations={userReservations} />
      </Formik>
    </>
  );
}
import { useNavigate, useLocation } from "react-router-dom";
import { ROUTE_RESERVE } from "../../stores/ROUTES";

function StepForm({ userReservations }) {
  const [activeSectionId, setActiveSectionId] = useState(
    userReservations.length > 0 ? "welcome" : "no-reservations"
  );
  const navigate = useNavigate();
  const location = useLocation();
  const { values, errors, setFieldValue, validateForm, submitForm } =
    useFormikContext();

  const handleSectionChange = (newSectionId) => {
    setActiveSectionId(newSectionId);
    //navigate(`?paso=${newSectionId}`);
  };

  const handleStepChange = (newCurrentStep = 0) => {
    navigate(`?paso=${newCurrentStep}`);
  };

  const currentStep = parseInt(
    new URLSearchParams(location.search).get("paso") || "1",
    10
  );

  const selectedUserReservations = userReservations.filter((reservation) =>
    values.reservations.includes(reservation.id)
  );

  useEffect(() => {
    let defaultActivities = [];
    for (let i = 0; i < selectedUserReservations.length; i++) {
      const startActivity = values.activities.find(
        (activity) =>
          activity.idReservacion === selectedUserReservations[i].id &&
          activity.start
      );
      const endActivity = values.activities.find(
        (activity) =>
          activity.idReservacion === selectedUserReservations[i].id &&
          activity.end
      );

      if (!Boolean(startActivity)) {
        const newActivity = {
          idFrontend: uuidv4(),
          idReservacion: selectedUserReservations[i].id,
          name: "Inicio",
          time: moment(selectedUserReservations[i].start, "HH:mm:ss").add(
            30,
            "minutes"
          ),
          start: true,
        };
        defaultActivities.push(newActivity);
      }
      if (!Boolean(endActivity)) {
        const newActivity = {
          idFrontend: uuidv4(),
          idReservacion: selectedUserReservations[i].id,
          name: "Fin",
          time: moment(selectedUserReservations[i].end, "HH:mm:ss").subtract(
            30,
            "minutes"
          ),
          end: true,
        };
        defaultActivities.push(newActivity);
      }
    }
    setFieldValue("activities", [...values.activities, ...defaultActivities]);
  }, [values.reservations]);

  values.activities.sort((activityA, activityB) =>
    sortAsc(activityA.time, activityB.time)
  );

  const handleReturnToMandatory = () => {
    handleStepChange(3);
  };

  return (
    <Page
      onSectionChange={handleSectionChange}
      className={"section"}
      id={"notificar-evento"}
      activeSectionId={activeSectionId}
      skeleton={<EventFormSkeleton />}
      header={activeSectionId !== 0}
      onGoBack={currentStep > 3 && handleReturnToMandatory}
    >
      {userReservations.length < 1 ? (
        <NoReservationsPage id={"no-reservations"} />
      ) : (
        <WelcomePage
          id={"welcome"}
          onSectionChange={() => handleSectionChange("principal")}
        />
      )}
      <StepperCustom
        id={"principal"}
        title="Notificar evento"
        onStepChange={handleStepChange}
        currentStep={currentStep}
        endButton={
          <Button
            disableElevation
            variant="contained"
            type="submit"
            onClick={submitForm}
          >
            Notificar evento
          </Button>
        }
      >
        {/*
        ----MANDATORY-STEPS----------------------------
        These are the steps the user *must* for the notification to be valid.
        */}
        <Stack
          title="Datos generales"
          id={"datos-generales"}
          className="step"
          /*
            StepperCustom uses these to validate whether a step has errors.
            Check StepperCustom.handleStepChange()
          */
          fields={["name", "description", "reservations"]}
        >
          <Button
            onClick={() => {
              validateForm();
              console.log(values);
              console.log(errors);
            }}
          >
            testin
          </Button>
          <GeneralForm userReservations={userReservations}></GeneralForm>
        </Stack>
        <Stack className="step" title="Agenda" id={"agenda"}>
          <ScheduleForm
            selectedUserReservations={selectedUserReservations}
          ></ScheduleForm>
        </Stack>
        <Stack
          className="step"
          title="Info. demográfica"
          id={"info-demografica"}
          fields={[
            "programs",
            "audiences",
            "idTipo",
            "scope",
            "axis",
            "themes",
          ]}
        >
          <DemographicForm></DemographicForm>
        </Stack>
        <Stack className="step" title="Adicional" id={"adicional"}>
          <EndStep
            values={values}
            userReservations={userReservations}
            onFieldValueChange={setFieldValue}
            onStepChange={handleStepChange}
          ></EndStep>
        </Stack>
        {/*
        ----OPTIONAL-STEPS----------------------------
        */}
        <Stack
          optional // add this if you don't want the step to show in the stepper's "header"
          className="step-optional" // add this for some sick ass bottom padding
          id={"difusion"}
          title={"Difusión"}
        >
          <BroadcastForm></BroadcastForm>
        </Stack>
        <Stack
          optional
          className="step-optional"
          id={"constancias"}
          title={"Constancias"}
        >
          <RecordsForm
            values={values}
            onFieldValueChange={setFieldValue}
          ></RecordsForm>
        </Stack>
        <Stack
          optional
          className="step-optional"
          id={"decoracion"}
          title={"Decoración"}
        >
          <DecorationForm
            values={values}
            onFieldValueChange={setFieldValue}
          ></DecorationForm>
        </Stack>
        <Stack
          optional
          className="step-optional"
          id={"requisitos-tecnicos"}
          title={"Requisitos técnicos"}
        >
          <TechRequirementsForm />
        </Stack>
        <Stack
          optional
          className="step-optional"
          id={"participantes-externos"}
          title={"Participantes externos"}
        >
          <ExternalParticipantsForm />
        </Stack>
        <Stack
          optional
          className="step-optional"
          id={"adicional"}
          title={"Adicional"}
        >
          <AdditionalForm />
        </Stack>
      </StepperCustom>
      {/*---- ADDITIONAL FORMS ----*/}
    </Page>
  );
}

function Fuck() {}

function EndStep({ values, onStepChange }) {
  const iconSX = { height: "1.2em !important", width: "1.2em !important" };
  const { Modal } = useModal();

  return (
    <Stack gap={2}>
      <Routes>
        <Route path="/notificar/asdf" element={<div>xD no mames</div>}></Route>
      </Routes>
      <FormLabel>
        Podemos brindarle un servicio más completo si usted configura las
        siguientes opciones adicionales.
      </FormLabel>

      <SectionButton
        onClick={() => onStepChange(4)}
        configured={values.media.length > 0 || values.publicity.length > 0}
        icon={<CampaignIcon sx={iconSX} />}
        name="Difusión"
        description="Suba material promocional del evento (flyers) y la forma en que debe difundirse."
      ></SectionButton>
      <SectionButton
        onClick={() => onStepChange(5)}
        icon={<ReceiptLongIcon sx={iconSX} />}
        configured={Boolean(values.records)}
        name="Constancias"
        description="Solicite constancias para los participantes de su evento."
      ></SectionButton>
      <SectionButton
        onClick={() => onStepChange(6)}
        configured={values.decoration}
        icon={<AutoAwesomeIcon sx={iconSX} />}
        name="Decoración"
        description="Pida sus personificadores, banderas y demás."
      ></SectionButton>
      <SectionButton
        onClick={() => onStepChange(7)}
        icon={<SettingsIcon sx={iconSX} />}
        configured={Boolean(
          values.technicalRequirements || values.needsLivestream
        )}
        name="Requisitos técnicos"
        description="Solicite asistencia del Centro de Cómputo (equipo de cómputo, transmisión en vivo...) "
      ></SectionButton>
      <SectionButton
        onClick={() => onStepChange(8)}
        configured={Boolean(
          values.numParticipantsExternal > 0 ||
            values.needsParking ||
            values.needsWeekend
        )}
        icon={<HailIcon sx={iconSX} />}
        name="Público externo"
        description="¿Asistirán personas ajenas a la FEI? Cuéntenos aquí."
      ></SectionButton>
      <SectionButton
        onClick={() => onStepChange(9)}
        configured={Boolean(values.additional)}
        icon={<QuestionMarkIcon sx={iconSX} />}
        name="Requisitos adicionales"
        description="¿Nos faltó pedirle algo? Pídalo aquí."
      ></SectionButton>
      <Modal></Modal>
    </Stack>
  );
}

function NoReservationsPage() {
  const navigate = useNavigate();

  return (
    <>
      <br />
      <Typography variant="h4">No ha reservado espacios</Typography>
      <br />
      <Typography>
        Para notificar su evento, debe contar con reservaciones aprobadas por la
        administración de la facultad.
      </Typography>
      <br />
      <br />
      <Button
        sx={{ maxWidth: "fit-content" }}
        startIcon={<DomainIcon />}
        onClick={() => navigate(ROUTE_RESERVE)}
      >
        Reservar un espacio
      </Button>
    </>
  );
}

function WelcomePage({ onSectionChange }) {
  return (
    <>
      <br />
      <Typography variant="h4">Bienvenido</Typography>
      <br />
      <Typography>
        Este es el formulario de Notificación de Eventos Académicos de la
        Facultad de Estadística e Informática de la Universidad Veracruzana.
        <br />
        <br />
        Este formulario ha sido diseñado para facilitar el proceso de
        notificación y coordinación de eventos académicos dentro de nuestra
        facultad. A través de este formulario, los organizadores pueden
        notificar a la facultad sobre un evento que deseé llevar a cabo y
        solicitar los recursos necesarios para su realización. 
        <br />
        <br />
        Si usted es el organizador, por favor, complete la notificación con la
        información requerida de manera precisa y detallada. Le pedimos enviar
        su notificación, en la medida de lo posible, con{" "}
        <b>al menos 2 semanas de antelación</b> a la fecha de inicio programada
        para su evento. Una vez que haya enviado la notificación, la
        Coordinación de Eventos Académicos revisará su notificación y se
        comunicará con usted para confirmar los detalles y brindar el apoyo
        necesario.
      </Typography>
      <br />
      <br />
      <Button sx={{ maxWidth: "fit-content" }} onClick={onSectionChange}>
        Continuar
      </Button>
    </>
  );
}
