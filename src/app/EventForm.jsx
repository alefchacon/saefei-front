import { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ChipCustom from "../components/Chip";
import Header from "../components/Header";
import StepperCustom from "../components/Stepper";

import { useEvents } from "../features/events/businessLogic/useEvents";
import ReplyIcon from "@mui/icons-material/Reply";
import { useParams } from "react-router-dom";
import ChipSpace from "../features/reservations/components/ChipSpace";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CampaignIcon from "@mui/icons-material/Campaign";
import Page from "../components/Page";
import TextField from "@mui/material/TextField";
import moment from "moment";
import { TimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useReservations } from "../features/reservations/businessLogic/useReservations";
import useAuth from "./businessLogic/useAuth";
import CardReservation from "../features/reservations/components/CardReservation";
import CheckList from "../components/CheckList";
import Divider from "@mui/material/Divider";
import { getHHssString } from "../util/times";
import { useModal } from "../components/hooks/useModal";

import RadioList from "../components/RadioList";
import AccordionCustom from "../components/Accordion";

import CardActivity from "../features/events/components/CardActivity";

import { Formik, Form } from "formik";

export default function EventForm({}) {
  const { getReservationsAvailableToUser } = useReservations();
  const { getUser } = useAuth();

  const [step, setStep] = useState(-1);
  const [userReservations, setUserReservations] = useState([]);
  const [selectedUserReservations, setSelectedUserReservations] = useState([]);

  useEffect(() => {
    getReservationsAvailableToUser(getUser().id).then((response) => {
      setUserReservations(response.data.data);
    });
  }, []);

  return (
    <Page title={"Notificar evento"}>
      <Formik initialValues={{ reservations: [], activities: [] }}>
        {({ values, errors, setFieldValue, handleChange, touched }) => (
          <StepperCustom>
            <Stack title="Datos generales">
              <Button onClick={() => console.log(values)}>testin</Button>
              <GeneralForm
                values={values}
                userReservations={userReservations}
                onFieldValueChange={setFieldValue}
              ></GeneralForm>
            </Stack>
            <Stack title="Agenda">
              <ScheduleForm
                values={values}
                userReservations={userReservations}
                onFieldValueChange={setFieldValue}
              ></ScheduleForm>
            </Stack>
            <Stack title="Info. demográfica">
              <DemographicForm></DemographicForm>
            </Stack>
            <Stack title="Adicional">gdsfgsdfgsdgf</Stack>
          </StepperCustom>
        )}
      </Formik>
    </Page>
  );
}

function fuck() {}

function DemographicForm(
  values,
  userReservations,
  onFieldValueChange,
  onSelectUserReservations
) {
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

function ScheduleForm({
  values,
  userReservations,
  onFieldValueChange,
  onSelectUserReservations,
}) {
  const [selectedUserReservations, setSelectedUserReservations] = useState([]);
  const [startActivities, setStartActivities] = useState([]);
  const [endActivities, setEndActivities] = useState([]);

  const { openModal, closeModal, Modal } = useModal();

  useEffect(() => {
    const _selectedUserReservations = userReservations.filter((reservation) =>
      values.reservations.includes(reservation.id)
    );

    setSelectedUserReservations(_selectedUserReservations);

    const _startActivities = _selectedUserReservations.map((reservation) => {
      return {
        idReservacion: reservation.id,
        time: moment(reservation.start, "HH:mm:ss").add(30, "minutes"),
        name: `Inicio ${reservation.id}`,
      };
    });
    setStartActivities(_startActivities);

    const _endActivities = _selectedUserReservations.map((reservation) => {
      return {
        idReservacion: reservation.id,
        time: moment(reservation.end, "HH:mm:ss").subtract(30, "minutes"),
        name: `Fin ${reservation.id}`,
      };
    });
    setEndActivities(_endActivities);
    onFieldValueChange("activities", [..._startActivities, ..._endActivities]);
  }, []);

  const openAddActivityModal = () => {
    openModal(
      "Agregar actividad",
      <Stack minWidth={"500px"} gap={"var(--field-gap)"}>
        <TextField
          label={"Nombre de la actividad"}
          variant="standard"
        ></TextField>
        <TimePicker
          slotProps={{ textField: { variant: "standard" } }}
        ></TimePicker>
        <br />
        <Stack direction={"row"} gap={3} justifyContent={"end"}>
          <Button onClick={closeModal}>Cancelar</Button>
          <Button variant="contained">Agregar</Button>
        </Stack>
      </Stack>
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <FormLabel>
        A continuación, ingrese las actividades que se llevarán a cabo durante
        su evento en los horarios de las reservaciones seleccionadas.
        <br />
        <br />
        Como mínimo, le pedimos que nos diga la hora de inicio y fin de su
        evento. Se han asignado las siguientes por defecto, mismas que usted
        puede modificar:
      </FormLabel>
      <br />
      <Stack>
        {selectedUserReservations.map((reservation, index) => (
          <AccordionCustom
            header={
              <Stack
                direction={"row"}
                width={"100%"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <CardReservation
                  key={index}
                  reservation={reservation}
                  activitySchedule={false}
                />
                <Button onClick={openAddActivityModal}>
                  Agregar actividad
                </Button>
              </Stack>
            }
          >
            <CardActivity
              activity={startActivities.find(
                (activity) => activity.idReservacion === reservation.id
              )}
              required
            ></CardActivity>
            <CardActivity
              activity={endActivities.find(
                (activity) => activity.idReservacion === reservation.id
              )}
              required
            ></CardActivity>
          </AccordionCustom>
        ))}
      </Stack>
      <Modal></Modal>
    </LocalizationProvider>
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
        <TextField variant="standard" label="Nombre del evento" />
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
              <Stack padding={"10px 0"}>
                <CardReservation
                  value={reservation.id}
                  key={index}
                  reservation={reservation}
                  activitySchedule={false}
                ></CardReservation>
              </Stack>
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
