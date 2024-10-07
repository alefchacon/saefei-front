import { useState, useEffect } from "react";
import "./App.css";

import { Typography } from "@mui/material";

import Stack from "@mui/material/Stack";

import Header from "../components/Header";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import moment from "moment";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker } from "@mui/x-date-pickers";
import { TimePicker } from "@mui/x-date-pickers";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import { Formik, Form, useFormikContext } from "formik";
import ChipSpace from "../features/reservations/components/ChipSpace";
import { useReservations } from "../features/reservations/businessLogic/useReservations";
import FormControl from "@mui/material/FormControl";
import * as yup from "yup";
import { MESSAGES_FIELD } from "../stores/MESSAGES";
import { useModal } from "../components/hooks/useModal";
import ButtonResponsive from "../components/ButtonResponsive";
import Select from "../components/Select";
import Fade from "@mui/material/Fade";
import FormHelperText from "@mui/material/FormHelperText";
import Page from "../components/Page";
import SPACES from "../stores/SPACES";
import ChipReservation from "../features/reservations/components/ChipReservation";

const checkOverlap = (proposedReservation, existingReservation) => {
  const proposedReservationOverlapsAll =
    proposedReservation.start?.isSameOrBefore(
      existingReservation.start,
      "minute"
    ) &&
    proposedReservation.end?.isSameOrAfter(existingReservation.end, "minute");

  const proposedReservationOverlapsStart =
    proposedReservation.start?.isSameOrBefore(
      existingReservation.start,
      "minute"
    ) &&
    proposedReservation.end?.isSameOrAfter(
      existingReservation.start,
      "minute"
    ) &&
    proposedReservation.end?.isSameOrBefore(existingReservation.end, "minute");

  const proposedReservationOverlapsEnd =
    proposedReservation.start?.isSameOrAfter(
      existingReservation.start,
      "minute"
    ) &&
    proposedReservation.start?.isSameOrBefore(
      existingReservation.end,
      "minute"
    ) &&
    (proposedReservation.end?.isSameOrAfter(
      existingReservation.end,
      "minute"
    ) ||
      proposedReservation.end?.isSameOrBefore(
        existingReservation.end,
        "minute"
      ));

  return (
    proposedReservationOverlapsAll ||
    proposedReservationOverlapsStart ||
    proposedReservationOverlapsEnd
  );
};

export default function ReservationForm() {
  const { openModal, closeModal, Modal } = useModal();
  const { addReservation } = useReservations();

  const handleSubmit = async (values, actions) => {
    const response = await addReservation(values);
    if (response.status === 201) {
      openModal(
        "Reservación enviada",
        <DialogContentText>
          Gracias por reservar su espacio. La administración de la facultad
          revisará su reservación y le responderá si puede realizarse a su
          correo electrónico.
        </DialogContentText>,
        <>
          <Button onClick={() => handleMoreReservations(actions)}>
            Hacer más reservaciones
          </Button>
          <Button onClick={closeModal}>Regresar al calendario</Button>
        </>,
        false
      );
    }
  };

  const handleMoreReservations = (actions) => {
    closeModal();
    actions.resetForm();
  };

  return (
    <Page title={"Reservar un espacio"}>
      <Formik
        onSubmit={handleSubmit}
        validationSchema={yup.object().shape({
          idEspacio: yup.number().min(1).required(MESSAGES_FIELD.REQUIRED),
          date: yup.object().required(MESSAGES_FIELD.REQUIRED),
          start: yup.object().required(MESSAGES_FIELD.REQUIRED),
          end: yup.object().required(MESSAGES_FIELD.REQUIRED),

          motive: yup.string().required(MESSAGES_FIELD.REQUIRED),
          overlaps: yup.boolean().isFalse("No debe haber traslapes!"),
        })}
        initialValues={{
          date: null,
          start: null,
          motive: "",
          end: null,
          idEspacio: "",
          overlaps: false,
        }}
      >
        {({ values, errors, setFieldValue, handleChange, touched }) => (
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <Form className="form">
              <Select
                id="idEspacio"
                label="Seleccione el espacio a reservar"
                onChange={handleChange}
                value={values.idEspacio}
                error={Boolean(errors.idEspacio && touched.idEspacio)}
                helperText={
                  Boolean(errors.idEspacio && touched.idEspacio)
                    ? errors.idEspacio
                    : ""
                }
              >
                {SPACES.map((space, index) => (
                  <Stack key={index} value={space.id}>
                    <ChipSpace space={space}></ChipSpace>
                    <Typography variant="caption" color="textSecondary">
                      Capacidad: {space.capacity} personas
                    </Typography>
                  </Stack>
                ))}
              </Select>

              <DatePicker
                value={values.date}
                onChange={(value) => setFieldValue("date", value)}
                label={"Seleccione la fecha de su reservación"}
                sx={{ width: "100%" }}
                minDate={moment()}
                slotProps={{
                  textField: {
                    variant: "filled",
                    fullWidth: true,
                    error: Boolean(errors.date && touched.date),
                    helperText: Boolean(errors.date && touched.date)
                      ? errors.date
                      : "",
                  },
                }}
              ></DatePicker>

              <Fade in={values.date !== null && values.id !== null}>
                <Stack>
                  <ProposedScheduleForm />
                  <br />
                  <ButtonResponsive>Reservar</ButtonResponsive>
                </Stack>
              </Fade>
            </Form>
          </LocalizationProvider>
        )}
      </Formik>
      <Modal></Modal>
    </Page>
  );
}

const ProposedScheduleForm = ({}) => {
  const { getReservationsBySpaceDate } = useReservations();

  const [reservationsAccepted, setReservationsAccepted] = useState([]);
  const { values, setFieldValue, handleChange, errors, touched } =
    useFormikContext();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (values.date !== null && values.idEspacio !== null) {
      fetchReservations();
    }
  }, [values.date, values.idEspacio]);

  const fetchReservations = async () => {
    setReady(false);

    getReservationsBySpaceDate(values.idEspacio, moment(values.date))
      .then((reservations) => {
        setReservationsAccepted(reservations);
        setReady(true);
      })
      .catch((error) => setReady(false));
  };

  useEffect(() => {
    reservationsAccepted.map((reservation) => {
      reservation.overlaps = checkOverlap(values, reservation);
    });
    const overlap = reservationsAccepted.some(
      (reservation) => reservation.overlaps
    );
    setFieldValue("overlaps", overlap);
  }, [values.start, values.end, reservationsAccepted]);

  const selectedSpace = SPACES.find((space) => space.id === values.idEspacio);

  return (
    ready && (
      <Stack className="conditional-fields form">
        {reservationsAccepted.length > 0 && (
          <Stack id={"reservations-accepted"} gap={1}>
            <Stack
              direction={"row"}
              alignItems={"center"}
              gap={1}
              maxWidth={"100%"}
              flexWrap={"wrap"}
            >
              {[
                "Estas",
                "son",
                "las",
                "reservaciones",
                "actuales",
                "del",
                <ChipSpace space={selectedSpace} />,
                "para",
                "el",
                values.date.format("DD/MM/2024"),
              ].map((element, index) => (
                <div key={index}>{element}</div>
              ))}
            </Stack>
            <Stack direction={"row"} gap={1} flexWrap={"wrap"}>
              {reservationsAccepted.map((reservation, index) => (
                <ChipReservation
                  key={index}
                  existingReservation={reservation}
                  proposedReservation={values}
                />
              ))}
            </Stack>
          </Stack>
        )}
        <Stack id="reservation-schedule" gap={1}>
          <FormControl error={Boolean(errors.overlaps)} id={"overlaps"}>
            <FormLabel id={"time-pickers-label"}>
              Seleccione las horas de inicio y fin de su reservación.{" "}
              {reservationsAccepted.length > 0 &&
                "Procure que no traslapen con las reservaciones actuales."}
            </FormLabel>
            <Stack gap={"var(--field-gap)"} direction={"row"}>
              <TimePicker
                format="HH:mm"
                name="start"
                onChange={(value) => setFieldValue("start", value)}
                value={values.start}
                label={"Inicio"}
                maxTime={values.end}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    variant: "filled",
                    "aria-labelledby": "asdf",
                    error: Boolean(errors.start && touched.start),
                    helperText: Boolean(errors.start && touched.start)
                      ? errors.start
                      : "",
                  },
                }}
              ></TimePicker>
              <TimePicker
                value={values.end}
                format="HH:mm"
                onChange={(value) => setFieldValue("end", value)}
                label={"Fin"}
                minTime={values.start}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    variant: "filled",
                    "aria-labelledby": "time-pickers-label",
                    error: Boolean(errors.end && touched.end),
                    helperText: Boolean(errors.end && touched.end)
                      ? errors.end
                      : "",
                  },
                }}
              ></TimePicker>
            </Stack>
            {Boolean(errors.overlaps) && (
              <FormHelperText color="error">{errors.overlaps}</FormHelperText>
            )}
          </FormControl>
        </Stack>
        <FormControl>
          <FormLabel>
            Describa brevemente el evento que celebrará en este espacio.
            Ejemplo: "17mo Seminario de Investigación en Ingeniería de Software"
          </FormLabel>
          <TextField
            variant="filled"
            name="motive"
            value={values.motive}
            onChange={handleChange}
            helperText={
              Boolean(errors.motive && touched.motive) ? errors.motive : ""
            }
            error={Boolean(errors.motive && touched.motive)}
            fullWidth
            slotProps={{
              htmlInput: {
                maxLength: 100,
              },
            }}
          ></TextField>
        </FormControl>
      </Stack>
    )
  );
};
