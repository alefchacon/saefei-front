import { useEffect, useState, useRef } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import moment from "moment";
import { TimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import FormLabel from "@mui/material/FormLabel";
import CardReservation from "../../../features/reservations/components/CardReservation";

import { useModal } from "../../../components/hooks/useModal";

import AccordionCustom from "../../../components/Accordion";

import CardActivity from "../../../features/events/components/CardActivity";

import { v4 as uuidv4 } from "uuid";

export default function ScheduleForm({
  values,
  userReservations,
  selectedUserReservations,
  onFieldValueChange,
  onSelectUserReservations,
}) {
  const { openModal, closeModal, Modal } = useModal();

  const newActivityNameRef = useRef(null);
  const newActivityTimeRef = useRef(null);
  const openAddActivityModal = (idReservacion = 0) => {
    openModal(
      "Agregar actividad",
      <Stack minWidth={"500px"} gap={"var(--field-gap)"}>
        <TextField
          inputRef={newActivityNameRef}
          label={"Nombre de la actividad"}
          variant="standard"
        ></TextField>
        <TimePicker
          minTime={moment(
            values.activities.find(
              (activity) =>
                activity.idReservacion === idReservacion && activity.start
            ).time,
            "HH:mm"
          )}
          maxTime={moment(
            values.activities.find(
              (activity) =>
                activity.idReservacion === idReservacion && activity.end
            ).time,
            "HH:mm"
          )}
          inputRef={newActivityTimeRef}
          slotProps={{ textField: { variant: "standard" } }}
        ></TimePicker>
      </Stack>,
      <Button
        onClick={() => {
          const newActivity = {
            idFrontend: uuidv4(),
            idReservacion: idReservacion,
            name: newActivityNameRef.current.value,
            time: moment(newActivityTimeRef.current.value, "HH:mm"),
          };
          onFieldValueChange("activities", [...values.activities, newActivity]);
        }}
        variant="contained"
      >
        Agregar actividad
      </Button>,
      true
    );
  };

  const handleDeleteActivity = (activityToDelete) => {
    const newActivities = values.activities.filter(
      (activity) => activity.idFrontend !== activityToDelete.idFrontend
    );
    onFieldValueChange("activities", newActivities);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <FormLabel>
        A continuación, ingrese las actividades que se llevarán a cabo durante
        su evento en los horarios de las reservaciones seleccionadas.
        <br />
        <br />
        Como mínimo, le pedimos que nos comparta la hora de inicio y fin de su
        evento. Se han asignado las siguientes por defecto, mismas que usted
        puede modificar:
      </FormLabel>
      <br />
      <Stack>
        {selectedUserReservations.map((reservation, index) => (
          <AccordionCustom
            key={index}
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
                <Button
                  onClick={(event) => {
                    event.stopPropagation();
                    openAddActivityModal(reservation.id);
                  }}
                >
                  Agregar actividad
                </Button>
              </Stack>
            }
          >
            {values.activities
              .filter((activity) => activity.idReservacion === reservation.id)
              .map((activity, index) => (
                <CardActivity
                  activity={activity}
                  key={index}
                  required={activity.start || activity.end}
                  onDelete={handleDeleteActivity}
                ></CardActivity>
              ))}
          </AccordionCustom>
        ))}
      </Stack>
      <Modal></Modal>
    </LocalizationProvider>
  );
}
