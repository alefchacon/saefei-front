import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import FormLabel from "@mui/material/FormLabel";

export default function DecorationForm({ values, onFieldValueChange }) {
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
          value={values.decoration}
          onChange={(e) => onFieldValueChange("decoration", e.target.value)}
          multiline
          rows={10}
        ></TextField>
      </Stack>
    </Stack>
  );
}
