import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import FormLabel from "@mui/material/FormLabel";
import { useFormikContext } from "formik";

export default function DecorationForm() {
  const { values, setFieldValue } = useFormikContext();
  return (
    <Stack gap={"var(--field-gap)"}>
      <Stack>
        <FormLabel>
          Solicite material de decoración o señalización. Ejemplo: mantelería,
          personificadores, banderas, etcétera.
        </FormLabel>
        <TextField
          placeholder="Escriba su respuesta"
          variant="filled"
          value={values?.decoration}
          onChange={(e) => setFieldValue("decoration", e.target.value)}
          multiline
          rows={10}
        ></TextField>
      </Stack>
    </Stack>
  );
}
