import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import CardReservation from "../../../features/reservations/components/CardReservation";
import CheckList from "../../../components/CheckList";
import { Formik, Form } from "formik";

export default function GeneralForm({
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
        <TextField
          variant="standard"
          label="Descripción del evento"
          name="description"
          value={values.description}
          onChange={(e) => onFieldValueChange("description", e.target.value)}
        />

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
              /*
              Aquí estaría bien pedir confirmación antes de borrar las actividades.
              Eso es para la v2 xD.
              */
              const remainingActivities = values.activities.filter((activity) =>
                checked.some(
                  (idReservacion) => idReservacion === activity.idReservacion
                )
              );
              onFieldValueChange("activities", remainingActivities);
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
