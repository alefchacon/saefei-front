import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import FormLabel from "@mui/material/FormLabel";
import { useFormikContext } from "formik";

export default function PresidiumForm() {
  const { values, setFieldValue } = useFormikContext();

  return (
    <Stack gap={"var(--field-gap)"}>
      <Stack>
        <FormLabel>
          Proporcione los nombres, cargos y direcciones de correo electrónico de
          los invitados especiales.
        </FormLabel>
        <TextField
          placeholder="Escriba su respuesta"
          variant="filled"
          value={values?.presidium}
          onChange={(e) => setFieldValue("presidium", e.target.value)}
          multiline
          rows={10}
        ></TextField>
      </Stack>
    </Stack>
  );
}
