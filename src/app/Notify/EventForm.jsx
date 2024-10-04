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
import useAuth from "../businessLogic/useAuth";
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

export default function EventForm({}) {
  const { getReservationsAvailableToUser } = useReservations();
  const { getUser } = useAuth();
  const [userReservations, setUserReservations] = useState([]);

  useEffect(() => {
    getReservationsAvailableToUser(getUser().id).then((response) => {
      setUserReservations(response.data.data);
    });
  }, []);

  return (
    <Formik
      validationSchema={eventSchema}
      validateOnBlur={true}
      className="section"
      initialValues={{
        name: "",
        description: "",
        reservations: [],
        activities: [],
        programs: [],
        audiences: [],
        idTipo: "",
        scope: "",
        axis: "",
        themes: [],

        //BroadcastForm
        platforms: [],
        files: [],

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
  );
}

function StepForm({ userReservations }) {
  const [activeStep, setActiveStep] = useState(0);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const { values, errors, setFieldValue, validateForm } = useFormikContext();

  const handleSectionChange = (newSectionIndex) => {
    setActiveSectionIndex(newSectionIndex);
  };

  const handleStepChange = (newActiveStep = 0) => {
    setActiveStep(newActiveStep);
  };

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
    moment(activityA.time).diff(moment(activityB.time))
  );

  return (
    <Page
      onSectionChange={handleSectionChange}
      title={"Notificar evento"}
      className={"section"}
      id={"notificar-evento"}
      activeSectionIndex={activeSectionIndex}
    >
      <StepperCustom onStepChange={handleStepChange} step={activeStep}>
        <Stack title="Datos generales" id={"datos-generales"}>
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
        <Stack title="Agenda" id={"agenda"}>
          <ScheduleForm
            selectedUserReservations={selectedUserReservations}
          ></ScheduleForm>
        </Stack>
        <Stack title="Info. demográfica" id={"info-demografica"}>
          <DemographicForm></DemographicForm>
        </Stack>
        <Stack title="Adicional" id={"adicional"}>
          <EndStep
            values={values}
            userReservations={userReservations}
            onFieldValueChange={setFieldValue}
            onSectionChange={handleSectionChange}
          ></EndStep>
        </Stack>
      </StepperCustom>

      {/*---- ADDITIONAL FORMS ----*/}

      <Slide
        direction="left"
        in={activeSectionIndex === 1}
        mountOnEnter
        unmountOnExit
      >
        <Stack className="section" id={"difusion"}>
          <BroadcastForm
            values={values}
            onFieldValueChange={setFieldValue}
          ></BroadcastForm>
        </Stack>
      </Slide>
      <Stack className="section" id={"constancias"}>
        <RecordsForm
          values={values}
          onFieldValueChange={setFieldValue}
        ></RecordsForm>
      </Stack>
      <Stack className="section" id={"requisitos-tecnicos"}>
        <DecorationForm
          values={values}
          onFieldValueChange={setFieldValue}
        ></DecorationForm>
      </Stack>
      <Stack className="section" id={"requisitos-tecnicos"}>
        <TechRequirementsForm />
      </Stack>
      <Stack className="section" id={"requisitos-tecnicos"}>
        <ExternalParticipantsForm />
      </Stack>
      <Stack className="section" id={"requisitos-tecnicos"}>
        <AdditionalForm />
      </Stack>
    </Page>
  );
}

function fuck() {}

function EndStep({ values, onSectionChange }) {
  const iconSX = { height: "1.2em !important", width: "1.2em !important" };
  const { Modal } = useModal();

  return (
    <Stack gap={2}>
      <FormLabel>
        Podemos brindarle un servicio más completo si usted configura las
        siguientes opciones adicionales.
      </FormLabel>

      <SectionButton
        onClick={() => onSectionChange(1)}
        configured={values.platforms.length > 0}
        icon={<CampaignIcon sx={iconSX} />}
        name="Difusión"
        description="Suba material promocional del evento (flyers) y la forma en que debe difundirse."
      ></SectionButton>
      <SectionButton
        onClick={() => onSectionChange(2)}
        icon={<ReceiptLongIcon sx={iconSX} />}
        configured={Boolean(values.records)}
        name="Constancias"
        description="Solicite constancias para los participantes de su evento."
      ></SectionButton>
      <SectionButton
        onClick={() => onSectionChange(3)}
        configured={values.decoration}
        icon={<AutoAwesomeIcon sx={iconSX} />}
        name="Decoración"
        description="Pida sus personificadores, banderas y demás."
      ></SectionButton>
      <SectionButton
        onClick={() => onSectionChange(4)}
        icon={<SettingsIcon sx={iconSX} />}
        configured={Boolean(
          values.technicalRequirements || values.needsLivestream
        )}
        name="Requisitos técnicos"
        description="Solicite asistencia del Centro de Cómputo (equipo de cómputo, transmisión en vivo...) "
      ></SectionButton>
      <SectionButton
        onClick={() => onSectionChange(5)}
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
        onClick={() => onSectionChange(6)}
        configured={Boolean(values.additional)}
        icon={<QuestionMarkIcon sx={iconSX} />}
        name="Requisitos adicionales"
        description="¿Nos faltó pedirle algo? Pídalo aquí."
      ></SectionButton>
      <Modal></Modal>
    </Stack>
  );
}

function WelcomePage() {
  return (
    <Page header={false}>
      <br />
      <Typography variant="h4">Bienvenidos...</Typography>
      <br />
      <Typography>
        ...al formulario de Notificación de Eventos Académicos de la Facultad de
        Estadística e Informática de la Universidad Veracruzana.
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
      <Button sx={{ maxWidth: "fit-content" }}>Continuar</Button>
    </Page>
  );
}
