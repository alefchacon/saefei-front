import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import FormLabel from "@mui/material/FormLabel";
import { useFormikContext } from "formik";

export default function RecordsForm() {
  const { values, setFieldValue } = useFormikContext();

  return (
    <Stack gap={"var(--field-gap)"}>
      <Stack>
        <FormLabel>
          Proporcione el grado y nombres de los ponentes u organizadores,
          especificando su rol.
        </FormLabel>
        <TextField
          placeholder="Escriba su respuesta"
          variant="filled"
          value={values?.records}
          onChange={(e) => setFieldValue("records", e.target.value)}
          multiline
          rows={10}
        ></TextField>
      </Stack>
    </Stack>
  );
}
