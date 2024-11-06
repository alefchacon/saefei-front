import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import CardReservation from "../../../features/reservations/components/CardReservation";
import CheckList from "../../../components/CheckList";
import { Formik, Form } from "formik";
import { useFormikContext } from "formik";
import Skeleton from "@mui/material/Skeleton";

export default function GeneralForm({ userReservations }) {
  const {
    values,
    touched,
    errors,
    handleBlur,
    setFieldValue,
    setFieldTouched,
  } = useFormikContext();

  return (
    <Form>
      <Stack gap={"var(--field-gap)"}>
        <TextField
          required
          name="name"
          onBlur={handleBlur}
          value={values.name}
          error={Boolean(errors.name && touched.name)}
          helperText={touched.name && errors.name}
          onChange={(e) => setFieldValue("name", e.target.value)}
          variant="filled"
          label="Nombre del evento"
        />
        <TextField
          required
          variant="filled"
          label="Descripción del evento"
          name="description"
          value={values.description}
          onChange={(e) => setFieldValue("description", e.target.value)}
          onBlur={handleBlur}
          error={Boolean(errors.description && touched.description)}
          helperText={touched.description && errors.description}
        />
        <TextField
          required
          variant="filled"
          label="Número estimado de participantes"
          name="numParticipants"
          value={values.numParticipants}
          onChange={(e) => setFieldValue("numParticipants", e.target.value)}
          onBlur={handleBlur}
          error={Boolean(errors.numParticipants && touched.description)}
          helperText={touched.numParticipants && errors.numParticipants}
          type="number"
        />

        <CheckList
          label={
            "Cuenta con las siguientes reservaciones aprobadas por la administración de la facultad. Seleccione la(s) que utilizará para su evento"
          }
          name={"reservations"}
          values={values.reservations}
          required
          onBlur={handleBlur}
          error={Boolean(errors.reservations && touched.reservations)}
          helperText={touched.reservations && errors.reservations}
          onChange={(checked) => {
            setFieldTouched("reservations", checked);

            setFieldValue("reservations", checked);
            /*
              The following deletes activities when their reservation
              gets unchecked. It'd be nice to ask for confirmation here.
              
              Emphasis on "nice" xD.
              */
            const remainingActivities = values.activities.filter((activity) =>
              checked.some(
                (idReservacion) => idReservacion === activity.idReservacion
              )
            );
            setFieldValue("activities", remainingActivities);
          }}
        >
          {userReservations?.map((reservation, index) => (
            <Stack
              key={index}
              className="reservation-wrapper"
              value={reservation.id}
              padding={"10px 0"}
            >
              <CardReservation
                value={reservation.id}
                key={index}
                reservation={reservation}
                reservationSchedule
                forAdmin={true}
              ></CardReservation>
            </Stack>
          ))}
        </CheckList>
      </Stack>
    </Form>
  );
}
