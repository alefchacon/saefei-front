import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import CardReservation from "../../../features/reservations/components/CardReservation";
import CheckList from "../../../components/CheckList";
import { Formik, Form } from "formik";
import { useFormikContext } from "formik";
import Skeleton from "@mui/material/Skeleton";
import { debounce } from 'lodash';

export default function GeneralForm({ userReservations }) {
  const {
    values,
    touched,
    errors,
    handleBlur,
    setFieldValue,
    setFieldTouched,
    
  } = useFormikContext();

  const handleChangeDebounced = debounce(
    (name, value) => setFieldValue(name, value),
    0.1
  );
  
  // Usage in onChange
  const handleChange = (e) => {
    handleChangeDebounced(e.target.name, e.target.value);
  };


  const handleReservationsChange = (checkedReservations) => {
    setFieldTouched("reservations", checkedReservations);

    setFieldValue("reservations", checkedReservations);
    /*
      The following deletes activities when their reservation
      gets unchecked. It'd be nice to ask for confirmation here.
      
      Emphasis on "nice".
      */
    const remainingActivities = values.activities.filter((activity) =>
      checkedReservations.some(
        (idReservacion) => idReservacion === activity.idReservacion
      )
    );
    setFieldValue("activities", remainingActivities);
  }

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
          //onChange={handleChange}
          onChange={(e) => setFieldValue(e.target.name, e.target.value)}
          variant="filled"
          label="Nombre del evento"
        />
        <TextField
          required
          variant="filled"
          label="Descripción del evento"
          name="description"
          value={values.description}
          onChange={handleChange}
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
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(errors.numParticipants && touched.description)}
          helperText={touched.numParticipants && errors.numParticipants}
          type="number"
        />

        {/*
          IF THE USER HAS MANY RESERVATIONS, PERFORMANCE WILL TANK
          
          This is because the DOM gets re rendered every time the
          user enters a value in one of the TextFields above, so
          the reservation list, and every reservation within, gets
          rerendered with each keystroke.
          If reservations are few (which is what we would expect
          in a real life scenario) then performance is fine.
          But if, for some reason, the user has many, then inputs
          will start lagging.
        */}
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
          onChange={handleReservationsChange}
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
                simpleSchedule={true}
              ></CardReservation>
            </Stack>
          ))}
        </CheckList>
      </Stack>
    </Form>
  );
}
