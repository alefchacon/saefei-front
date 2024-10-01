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
import { Formik, Form } from "formik";

export default function EventForm({}) {
  const { getReservationsAvailableToUser } = useReservations();
  const { getUser } = useAuth();

  const [step, setStep] = useState(-1);
  const [userReservations, setUserReservations] = useState([]);

  useEffect(() => {
    getReservationsAvailableToUser(getUser().id).then((response) => {
      setUserReservations(response.data.data);
    });
  }, []);

  return (
    <Page title={"Notificar evento"}>
      <Formik>
        <StepperCustom>
          <Stack title="Datos generales">
            <GeneralForm userReservations={userReservations}></GeneralForm>
          </Stack>
          <Stack title="Horario">ponga su horario!!!!!</Stack>
          <Stack title="Info. demográfica">:D</Stack>
          <Stack title="Adicional">gdsfgsdfgsdgf</Stack>
        </StepperCustom>
      </Formik>
    </Page>
  );
}

function fuck() {}

function GeneralForm({ userReservations }) {
  return (
    <Stack gap={"var(--field-gap)"}>
      <TextField variant="standard" label="Nombre del evento" />
      <TextField variant="standard" label="Descripción del evento" />

      <FormControl>
        <FormLabel>
          Estas son sus reservaciones aprobadas por la administración de la
          facultad. Seleccione la(s) que utilizará para su evento:
        </FormLabel>
        <CheckList>
          {userReservations.map((reservation, index) => (
            <CardReservation
              value={reservation.id}
              key={index}
              reservation={reservation}
            ></CardReservation>
          ))}
        </CheckList>
      </FormControl>

      <LocalizationProvider dateAdapter={AdapterMoment}>
        <FormControl sx={{ gap: 1 }}>
          <FormLabel>Ingrese el horario de su evento</FormLabel>
          <Stack gap={"var(--field-gap)"} direction={"row"}>
            <TimePicker
              format="HH:mm"
              name="start"
              label={"Inicio"}
              slotProps={{
                textField: {
                  fullWidth: true,
                  variant: "standard",
                  "aria-labelledby": "asdf",
                },
              }}
            ></TimePicker>
            <TimePicker
              format="HH:mm"
              label={"Fin"}
              slotProps={{
                textField: {
                  fullWidth: true,
                  variant: "standard",
                  "aria-labelledby": "time-pickers-label",
                },
              }}
            ></TimePicker>
          </Stack>
        </FormControl>
      </LocalizationProvider>
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
