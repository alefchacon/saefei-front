import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import FormLabel from "@mui/material/FormLabel";
import RadioList from "../../../components/RadioList";
import TextField from "@mui/material/TextField";
import { useFormikContext } from "formik";

export default function TechRequirementsForm({}) {
  const { values, setFieldValue } = useFormikContext();
  return (
    <Stack gap={"var(--field-gap)"}>
      <Stack>
        <FormLabel>
          Por favor, detalle los requerimientos técnicos del Centro de Cómputo
          (por ejemplo, equipo de cómputo, instalación de software
          especializado, equipos audiovisuales, acceso a internet, entre otros)
        </FormLabel>
        <TextField
          value={values?.computerCenterRequirements}
          onChange={(e) =>
            setFieldValue("computerCenterRequirements", e.target.value)
          }
          placeholder="Escriba su respuesta"
          variant="filled"
          multiline
          rows={10}
        ></TextField>
      </Stack>
      <RadioList
        label={"¿Necesita que el evento sea transmitido?"}
        value={values?.needsLivestream}
        onChange={(e) => setFieldValue("needsLivestream", e.target.value)}
      >
        <Typography value="1">Sí</Typography>
        <Typography value="0">No</Typography>
      </RadioList>
    </Stack>
  );
}
