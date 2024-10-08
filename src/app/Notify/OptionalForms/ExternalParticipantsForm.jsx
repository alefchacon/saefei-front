import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormLabel from "@mui/material/FormLabel";
import RadioList from "../../../components/RadioList";

import { useFormikContext } from "formik";

export default function EternalParticipantsForm({}) {
  const { values, setFieldValue } = useFormikContext();

  return (
    <Stack gap={"var(--field-gap)"}>
      <Stack>
        <FormLabel>
          ¿Cuántas personas externas estiman recibir en el evento?
        </FormLabel>
        <TextField
          value={values.numParticipantsExternal}
          onChange={(e) =>
            setFieldValue("numParticipantsExternal", e.target.value)
          }
          variant="filled"
          type="number"
          slotProps={{ htmlInput: { min: 0 } }}
        ></TextField>
      </Stack>
      <RadioList
        value={values.needsParking}
        onChange={(e) => setFieldValue("needsParking", e.target.value)}
        label={
          "¿Se requiere autorización para que público externo ingrese al estacionamiento durante el evento?"
        }
      >
        <Typography value="1">Sí</Typography>
        <Typography value="0">No</Typography>
      </RadioList>
      <RadioList
        value={values.needsWeekend}
        onChange={(e) => setFieldValue("needsWeekend", e.target.value)}
        label={"¿Necesita autorización para el ingreso en fin de semana?"}
      >
        <Typography value="1">Sí</Typography>
        <Typography value="0">No</Typography>
      </RadioList>
    </Stack>
  );
}
