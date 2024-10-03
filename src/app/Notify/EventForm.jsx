import { useEffect, useState, useRef } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import StepperCustom from "../../components/Stepper";

import CampaignIcon from "@mui/icons-material/Campaign";
import Page from "../../components/Page";
import TextField from "@mui/material/TextField";
import moment from "moment";
import { TimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useReservations } from "../../features/reservations/businessLogic/useReservations";
import useAuth from "../businessLogic/useAuth";
import CardReservation from "../../features/reservations/components/CardReservation";
import CheckList from "../../components/CheckList";
import Divider from "@mui/material/Divider";
import { getHHssString } from "../../util/times";
import { useModal } from "../../components/hooks/useModal";
import SectionButton from "../../components/SectionButton";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import SettingsIcon from "@mui/icons-material/Settings";
import HailIcon from "@mui/icons-material/Hail";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import RadioList from "../../components/RadioList";
import AccordionCustom from "../../components/Accordion";
import { useNavigate } from "react-router-dom";
import UploadButton from "../../components/UploadButton";
import Slide from "@mui/material/Slide";
import * as ROUTE from "../../stores/ROUTES";
import BroadcastForm from "./OptionalForms/BroadcastForm";
import CardActivity from "../../features/events/components/CardActivity";
import OptionalSection from "../../components/OptionalSection";
import { Formik, Form } from "formik";
import TechRequirementsForm from "./OptionalForms/TechRequirementsForm";
import ExternalParticipantsForm from "./OptionalForms/ExternalParticipantsForm";
import AdditionalForm from "./OptionalForms/AdditionalForm";
import { useFormikContext } from "formik";
import { v4 as uuidv4 } from "uuid";

import ScheduleForm from "./StepForms/ScheduleForm";

export default function EventForm({}) {
  const { getReservationsAvailableToUser } = useReservations();
  const { getUser } = useAuth();

  const [activeStep, setActiveStep] = useState(0);
  const [userReservations, setUserReservations] = useState([]);
  const [selectedUserReservations, setSelectedUserReservations] = useState([]);

  useEffect(() => {
    getReservationsAvailableToUser(getUser().id).then((response) => {
      setUserReservations(response.data.data);
    });
  }, []);

  const handleSectionChange = (newSectionIndex) => {
    setActiveSectionIndex(newSectionIndex);
  };

  return (
    <Formik
      className="section"
      initialValues={{
        name: "",
        reservations: [],
        activities: [],
        platforms: ["Página Web Institucional de la Facultad"],
      }}
    >
      {({ values, errors, setFieldValue, handleChange, touched }) => (
        <StepForm
          values={values}
          setFieldValue={setFieldValue}
          userReservations={userReservations}
        />
      )}
    </Formik>
  );
}

function StepForm({
  values,
  errors,
  setFieldValue,
  handleChange,
  touched,
  userReservations,
}) {
  const [activeStep, setActiveStep] = useState(0);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);

  const handleSectionChange = (newSectionIndex) => {
    setActiveSectionIndex(newSectionIndex);
  };
  const handleStepChange = (newActiveStep = 0) => {
    setActiveStep(newActiveStep);
  };

  const selectedUserReservations = userReservations.filter((reservation) =>
    values.reservations.includes(reservation.id)
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
          <Button onClick={() => console.log(values)}>testin</Button>
          <GeneralForm
            values={values}
            userReservations={userReservations}
            onFieldValueChange={setFieldValue}
          ></GeneralForm>
        </Stack>
        <Stack title="Agenda" id={"agenda"}>
          <ScheduleForm
            values={values}
            userReservations={userReservations}
            selectedUserReservations={selectedUserReservations}
            onFieldValueChange={setFieldValue}
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
      <Stack className="section" id={"requisitos-tecnicos"}>
        <BroadcastForm
          values={values}
          onFieldValueChange={setFieldValue}
        ></BroadcastForm>
      </Stack>
      <Stack className="section" id={"requisitos-tecnicos"}>
        <TechRequirementsForm
          values={values}
          onFieldValueChange={setFieldValue}
        ></TechRequirementsForm>
      </Stack>
      <Stack className="section" id={"requisitos-tecnicos"}>
        <ExternalParticipantsForm
          values={values}
          onFieldValueChange={setFieldValue}
        ></ExternalParticipantsForm>
      </Stack>
      <Stack className="section" id={"requisitos-tecnicos"}>
        <AdditionalForm
          values={values}
          onFieldValueChange={setFieldValue}
        ></AdditionalForm>
      </Stack>
    </Page>
  );
}

function fuck() {}

function EndStep({
  values,
  userReservations,
  onFieldValueChange,
  onSelectUserReservations,
  onSectionChange,
}) {
  const iconSX = { height: "1.2em !important", width: "1.2em !important" };
  const navigate = useNavigate();
  const { closeModal, openModal, Modal } = useModal();
  const [showUpload, setShowUpload] = useState(false);
  const [section, setSection] = useState("");

  const openBroadcastModal = () => {
    openModal(
      "Difusión",
      <Stack gap={"var(--field-gap)"}>
        <Stack>
          <CheckList
            label={
              "Seleccione los medios donde se requiere hacer difusión del evento"
            }
          >
            <Typography value={"Página Web Institucional de la Facultad"}>
              Página Web Institucional de la Facultad
            </Typography>
            <Typography value={"Correo Institucional de la Facultad"}>
              Correo Institucional de la Facultad
            </Typography>
            <Typography
              value={"Redes sociales (Facebook, Instagram, Twitter/X)"}
            >
              Redes sociales (Facebook, Instagram, Twitter/X)
            </Typography>
            <Typography value={"Comunicación UV"}>Comunicación UV</Typography>
            <Typography value={"Radio UV"}>Radio UV</Typography>
          </CheckList>
          <TextField variant="standard" label="Otra(s)"></TextField>
        </Stack>
        <RadioList
          label={"¿Se proporcionará material promocional?"}
          onChange={(e) => setShowUpload(e.target.value)}
        >
          <Typography value={true}>Sí</Typography>
          <Typography value={false}>
            No (En caso de no contar con un diseño específico, se empleará un
            diseño básico preestablecido por la facultad)
          </Typography>
        </RadioList>
        {showUpload && (
          <Stack>
            <FormLabel>
              Por favor, proporcione los recursos que se van a publicar.
            </FormLabel>
            <UploadButton></UploadButton>
          </Stack>
        )}
      </Stack>,
      <Stack>
        <Button variant="contained">YEahhhhhh</Button>
      </Stack>,
      true
    );
  };

  return (
    <Stack gap={2}>
      <FormLabel>
        Podemos brindarle un servicio más completo si usted configura las
        siguientes opciones adicionales.
      </FormLabel>

      <SectionButton
        onClick={() => onSectionChange(1)}
        icon={<CampaignIcon sx={iconSX} />}
        name="Difusión"
        description="Suba material promocional del evento (flyers) y la forma en que debe difundirse."
      ></SectionButton>
      <SectionButton
        onClick={() => onSectionChange(2)}
        icon={<ReceiptLongIcon sx={iconSX} />}
        name="Constancias"
        description="Solicite constancias para los participantes de su evento."
      ></SectionButton>
      <SectionButton
        onClick={() => onSectionChange(3)}
        icon={<SettingsIcon sx={iconSX} />}
        name="Requisitos técnicos"
        description="Solicite asistencia del Centro de Cómputo (equipo de cómputo, transmisión en vivo...) "
      ></SectionButton>
      <SectionButton
        onClick={() => onSectionChange(4)}
        icon={<HailIcon sx={iconSX} />}
        name="Participantes externos"
        description="¿Requiere asistencia para participantes ajenos a la FEI? Cuéntenos aquí."
      ></SectionButton>
      <SectionButton
        onClick={() => onSectionChange(5)}
        icon={<QuestionMarkIcon sx={iconSX} />}
        name="Requisitos adicionales"
        description="¿Nos faltó pedirle algo? Pídalo aquí."
      ></SectionButton>
      <Modal></Modal>
    </Stack>
  );
}

function Sections() {
  return (
    <Stack gap={2}>
      <FormLabel>
        Podemos brindarle un servicio más completo si usted configura las
        siguientes opciones adicionales.
      </FormLabel>
      <SectionButton
        onClick={openBroadcastModal}
        icon={<CampaignIcon sx={iconSX} />}
        name="Difusión"
        description="Suba material promocional del evento (flyers) y la forma en que debe difundirse."
      ></SectionButton>
      <SectionButton
        icon={<ReceiptLongIcon sx={iconSX} />}
        name="Constancias"
        description="Solicite constancias para los participantes de su evento."
      ></SectionButton>
      <SectionButton
        icon={<SettingsIcon sx={iconSX} />}
        name="Requisitos técnicos"
        description="Solicite asistencia del Centro de Cómputo (equipo de cómputo, transmisión en vivo...) "
      ></SectionButton>
      <SectionButton
        icon={<HailIcon sx={iconSX} />}
        name="Participantes externos"
        description="¿Requiere asistencia para participantes ajenos a la FEI? Cuéntenos aquí."
      ></SectionButton>
      <SectionButton
        icon={<QuestionMarkIcon sx={iconSX} />}
        name="Requisitos adicionales"
        description="¿Nos faltó pedirle algo? Pídalo aquí."
      ></SectionButton>
      <Modal></Modal>
    </Stack>
  );
}

function DemographicForm({
  values,
  userReservations,
  onFieldValueChange,
  onSelectUserReservations,
}) {
  return (
    <Stack gap={"var(--field-gap)"}>
      <FormLabel>
        Para garantizar que su evento alcance su máximo potencial y cuente con
        el respaldo adecuado, le solicitamos algunos detalles adicionales sobre
        la audiencia y los temas de su evento. Esta información nos permitirá
        alinear mejor los recursos y los esfuerzos de divulgación, asegurando la
        atención y asistencia adecuadas para el éxito de su evento.
      </FormLabel>

      <CheckList label={"Programas educativos"} selectAll>
        <Typography value={1}>
          Doctorado en Ciencias de la Computación
        </Typography>
        <Typography value={2}>
          Especialización en Métodos Estadísticos
        </Typography>
        <Typography value={3}>
          Estadística - Ingeniería en Ciencia de Datos
        </Typography>
        <Typography value={4}>Ingeniería de Software</Typography>
        <Typography value={5}>Maestría en Gestión de Calidad</Typography>
        <Typography value={6}>
          Maestría en Sistemas Interactivos Centrados en el Usuario
        </Typography>
        <Typography value={7}>
          Redes y Servicios de Cómputo - Ingeniería en Civerseguridad e
          Infrastructura de Cómputo
        </Typography>
        <Typography value={8}>
          Tecnologías Computacionales - Ingeniería en Sistemas y Tecnologías de
          la Información
        </Typography>
      </CheckList>

      <CheckList label={"Audiencias"} selectAll>
        <Typography value={"Estudiantes"}>Estudiantes</Typography>
        <Typography value={"Académicos"}>Académicos</Typography>
        <Typography value={"Personal administrativo"}>
          Personal administrativo
        </Typography>
        <Typography value={"Público en general"}>Público en general</Typography>
      </CheckList>

      <RadioList label={"Tipo de evento"} id={"radio-list-event-type"}>
        <Typography value={"Académico"}>Académico</Typography>
        <Typography value={"Cultural"}>Cultural</Typography>
        <Typography value={"Deportivo"}>Deportivo</Typography>
        <Typography value={"Mixto"}>Mixto</Typography>
      </RadioList>
      <RadioList label={"Ámbito"} id={"radio-list-scope"}>
        <Typography value={"Local/Regional"}>Local/Regional</Typography>
        <Typography value={"Estatal"}>Estatal</Typography>
        <Typography value={"Nacional"}>Nacional</Typography>
        <Typography value={"Internacional"}>Internacional</Typography>
      </RadioList>

      <RadioList
        label={"Éje del Programa de Trabajo al que impacta"}
        id={"radio-list-axis"}
      >
        <Typography value={"Derechos Humanos"}>Derechos Humanos</Typography>
        <Typography value={"Sustentabilidad"}>Sustentabilidad</Typography>
        <Typography value={"Docencia e innovación académica"}>
          Docencia e innovación académica
        </Typography>
        <Typography value={"Investigación e innovación"}>
          Investigación e innovación
        </Typography>
        <Typography
          value={"Difusión de la cultura y extensión de los servicios"}
        >
          Difusión de la cultura y extensión de los servicios
        </Typography>
      </RadioList>

      <CheckList label={"Temáticas principales (mínimo 1, máximo 3)"} max={3}>
        <Typography value={"Biodiversidad e integridad ecosistémica"}>
          Biodiversidad e integridad ecosistémica
        </Typography>
        <Typography value={"Calidad ambiental y gestión de campus"}>
          Calidad ambiental y gestión de campus
        </Typography>
        <Typography
          value={
            "Cultura de paz/Erradicación de la violencia/Integridad académica"
          }
        >
          Cultura de paz/Erradicación de la violencia/Integridad académica{" "}
        </Typography>
        <Typography value={"Difusión de la oferta educativa"}>
          Difusión de la oferta educativa
        </Typography>
        <Typography value={"Derechos humanos"}>Derechos humanos</Typography>
        <Typography value={"Disciplinar"}>Disciplinar</Typography>
        <Typography value={"Estilos de vida y patrones de consumo"}>
          Estilos de vida y patrones de consumo
        </Typography>
        <Typography value={"Equidad de género y diversidad sexual"}>
          Equidad de género y diversidad sexual
        </Typography>
        <Typography value={"Interculturalidad"}>Interculturalidad</Typography>
        <Typography value={"Salud y deporte"}>Salud y deporte</Typography>
      </CheckList>
    </Stack>
  );
}

function GeneralForm({
  values,
  userReservations,
  onFieldValueChange,
  onSelectUserReservations,
}) {
  return (
    <Form>
      <Stack gap={"var(--field-gap)"}>
        <TextField
          name="name"
          value={values.name}
          onChange={(e) => onFieldValueChange("name", e.target.value)}
          variant="standard"
          label="Nombre del evento"
        />
        <TextField variant="standard" label="Descripción del evento" />

        <FormControl>
          <FormLabel>
            Cuenta con las siguientes reservaciones aprobadas por la
            administración de la facultad. Seleccione la(s) que utilizará para
            su evento:
          </FormLabel>
          <CheckList
            name={"reservations"}
            values={values.reservations}
            onChange={(checked) => {
              onFieldValueChange("reservations", checked);
            }}
          >
            {userReservations.map((reservation, index) => (
              <CardReservation
                value={reservation.id}
                key={index}
                reservation={reservation}
                activitySchedule={false}
              ></CardReservation>
            ))}
          </CheckList>
        </FormControl>
      </Stack>
    </Form>
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
