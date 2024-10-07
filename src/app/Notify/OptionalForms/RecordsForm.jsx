import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import FormLabel from "@mui/material/FormLabel";

export default function RecordsForm({ values, onFieldValueChange }) {
  return (
    <Stack gap={"var(--field-gap)"}>
      <Stack>
        <FormLabel>
          ¿Se prevé la presencia de un presidium durante el evento? Por favor,
          proporcione los nombres, cargos y direcciones de correo electrónico de
          los invitados especiales.
        </FormLabel>
        <TextField
          placeholder="Escriba su respuesta"
          variant="filled"
          value={values.records}
          onChange={(e) => onFieldValueChange("records", e.target.value)}
          multiline
          rows={10}
        ></TextField>
      </Stack>
    </Stack>
  );
}
