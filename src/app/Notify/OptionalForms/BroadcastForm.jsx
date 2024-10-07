import { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormLabel from "@mui/material/FormLabel";
import CheckList from "../../../components/CheckList";
import RadioList from "../../../components/RadioList";
import UploadButton from "../../../components/UploadButton";
import { useFormikContext } from "formik";
import { useSearchParams } from "react-router-dom";

export default function BroadcastForm() {
  const { values, setFieldValue } = useFormikContext();

  const [showUpload, setShowUpload] = useState(false);
  return (
    <Stack gap={"var(--field-gap)"}>
      {values.name}
      <Stack>
        <CheckList
          label={
            "Seleccione los medios donde se requiere hacer difusión del evento"
          }
          values={values.media}
          name={"media"}
          onChange={(checked) => setFieldValue("media", checked)}
        >
          <Typography value={"Página Web Institucional de la Facultad"}>
            Página Web Institucional de la Facultad
          </Typography>
          <Typography value={"Correo Institucional de la Facultad"}>
            Correo Institucional de la Facultad
          </Typography>
          <Typography value={"Redes sociales (Facebook, Instagram, Twitter/X)"}>
            Redes sociales (Facebook, Instagram, Twitter/X)
          </Typography>
          <Typography value={"Comunicación UV"}>Comunicación UV</Typography>
          <Typography value={"Radio UV"}>Radio UV</Typography>
        </CheckList>
      </Stack>
      <RadioList
        label={"¿Se proporcionará material promocional?"}
        onChange={(e) => setShowUpload(e.target.value === "true")}
      >
        <Typography value={"true"}>Sí</Typography>
        <Typography value={"false"}>
          No (En caso de no contar con un diseño específico, se empleará un
          diseño básico preestablecido por la facultad)
        </Typography>
      </RadioList>
      {showUpload && (
        <Stack>
          <FormLabel>
            Por favor, proporcione los recursos que se van a publicar.
          </FormLabel>
          <UploadButton
            multiple
            onChange={(files) => setFieldValue("publicity", files)}
          ></UploadButton>
        </Stack>
      )}
    </Stack>
  );
}
