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
import UploadButton from "../../../components/UploadButton";

import { useModal } from "../../../components/hooks/useModal";

import AccordionCustom from "../../../components/Accordion";

import CardActivity from "../../../features/events/components/CardActivity";

import { v4 as uuidv4 } from "uuid";

import { useFormikContext } from "formik";
import useIsMobile from "../../../components/hooks/useIsMobile";
import TruncatingText from "../../../components/TruncatingText";

export default function ScheduleForm({ forEditing, selectedUserReservations }) {
  const isMobile = useIsMobile();
  const { openModal, closeModal, Modal } = useModal();
  const { values, setFieldValue, setFieldTouched } = useFormikContext();

  const newActivityNameRef = useRef(null);
  const newActivityTimeRef = useRef(null);

  const openAddActivityModal = (idReservacion = 0) => {
    openModal(
      "Agregar actividad",
      <Stack gap={"var(--field-gap)"}>
        <TextField
          inputRef={newActivityNameRef}
          label={"Nombre de la actividad"}
          variant="filled"
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
          slotProps={{ textField: { variant: "filled" } }}
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
          console.log(newActivity);
          setFieldValue("activities", [...values.activities, newActivity]);
        }}
        variant="contained"
      >
        <TruncatingText>Agregar actividad</TruncatingText>
      </Button>,
      true
    );
  };
  const openEditActivityModal = (activityToEdit) => {
    openModal(
      "Editar actividad",
      <Stack minWidth={"500px"} gap={"var(--field-gap)"}>
        <TextField
          disabled={activityToEdit.start || activityToEdit.end}
          defaultValue={activityToEdit.name}
          onChange={(e) => (newActivityNameRef.current.value = e.target.value)}
          inputRef={newActivityNameRef}
          label={"Nombre de la actividad"}
          variant="filled"
        ></TextField>
        <TimePicker
          defaultValue={activityToEdit.time}
          minTime={moment(
            values.activities.find(
              (activity) =>
                activity.idReservacion === activityToEdit.idReservacion &&
                activity.start
            ).time,
            "HH:mm"
          )}
          maxTime={moment(
            values.activities.find(
              (activity) =>
                activity.idReservacion === activityToEdit.idReservacion &&
                activity.end
            ).time,
            "HH:mm"
          )}
          inputRef={newActivityTimeRef}
          slotProps={{ textField: { variant: "filled" } }}
        ></TimePicker>
      </Stack>,
      <Button
        onClick={() => {
          const newActivity = {
            idFrontend: activityToEdit.idFrontend,
            idReservacion: activityToEdit.idReservacion,
            name: newActivityNameRef.current.value,
            time: moment(newActivityTimeRef.current.value, "HH:mm"),
            start: activityToEdit.start,
            end: activityToEdit.end,
          };
          const activitiesWithoutEditedOne = values.activities.filter(
            (activity) => activity.idFrontend !== activityToEdit.idFrontend
          );
          setFieldValue("activities", [
            ...activitiesWithoutEditedOne,
            newActivity,
          ]);
          closeModal();
        }}
        variant="contained"
      >
        Editar actividad
      </Button>,
      true
    );
  };

  const handleDeleteActivity = (activityToDelete) => {
    const newActivities = values.activities.filter(
      (activity) => activity.idFrontend !== activityToDelete.idFrontend
    );
    setFieldValue("activities", newActivities);
  };

  const handleChronogramChange = (files = new FileList()) => {
    const chronogramChanged = files.item(0)?.name !== values.chronogram?.name;

    if (forEditing && chronogramChanged) {
      values["updatedChronogram"] = files;
    }

    console.log(values);
    setFieldValue("chronogram", files);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Stack gap={5}>
        <Stack>
          <FormLabel>
            A continuación, ingrese las actividades que se llevarán a cabo
            durante su evento en los horarios de las reservaciones
            seleccionadas.
            <br />
            <br />
            Como mínimo, le pedimos que nos comparta la hora de inicio y fin de
            su evento. Se han asignado las siguientes por defecto, mismas que
            usted puede modificar:
          </FormLabel>
          <br />
          <Stack>
            {selectedUserReservations?.map((reservation, index) => (
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
                      reservationSchedule
                      simpleSchedule
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
                  .filter(
                    (activity) => activity.idReservacion === reservation.id
                  )
                  .map((activity, index) => (
                    <CardActivity
                      activity={activity}
                      key={index}
                      required={activity.start || activity.end}
                      onDelete={handleDeleteActivity}
                      onEdit={() => openEditActivityModal(activity)}
                    ></CardActivity>
                  ))}
              </AccordionCustom>
            ))}
          </Stack>
        </Stack>
        <Stack>
          <FormLabel>
            Si cuenta con un cronograma más detallado, puede compartirlo a
            continuación:
          </FormLabel>
          <UploadButton
            values={values.chronogram}
            onChange={handleChronogramChange}
          ></UploadButton>
        </Stack>
      </Stack>
      <Modal></Modal>
    </LocalizationProvider>
  );
}
