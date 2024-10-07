import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import FormLabel from "@mui/material/FormLabel";
import { useFormikContext } from "formik";

export default function AdditionalForm({}) {
  const { values, setFieldValue } = useFormikContext();

  return (
    <Stack gap={"var(--field-gap)"}>
      <Stack>
        <FormLabel>
          Escriba cualquier comentario adicional o solicitud especial
          relacionada con el evento.
        </FormLabel>
        <TextField
          value={values.additional}
          onChange={(e) => setFieldValue("additional", e.target.value)}
          placeholder="Escriba su respuesta"
          variant="filled"
          multiline
          rows={10}
        ></TextField>
      </Stack>
    </Stack>
  );
}
