import { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";
import CheckList from "../../../components/CheckList";
import RadioList from "../../../components/RadioList";
import UploadButton from "../../../components/UploadButton";
import { useFormikContext } from "formik";
import FILE_TYPES from "../../../stores/fileTypes";
import MEDIA from "../../../stores/media";
export default function BroadcastForm({ children, forEditing }) {
  const { values, setFieldValue } = useFormikContext();

  const [showUpload, setShowUpload] = useState(values?.publicity?.length > 0);
  const [originalFile, setOriginalFile] = useState(values?.publicity);

  const handleShowUpload = (e) => {
    const newValue = e.target.value;
    if (newValue === "false") {
      setFieldValue("publicity", []);
    }
    setShowUpload(newValue === "true");
  };

  const handlePublicityChange = (files = new FileList()) => {
    const publicityChanged = files.item(0)?.name !== values.publicity[0]?.name;

    if (forEditing && publicityChanged) {
      values["updatedPublicity"] = files;
    }

    setFieldValue("publicity", files);
  };

  return (
    <Stack gap={"var(--field-gap)"} className="optional-form">
      <CheckList
        label={
          "Seleccione los medios donde se requiere hacer difusión del evento"
        }
        values={values?.media}
        name={"media"}
        onChange={(checked) => {
          setFieldValue("media", checked);
        }}
      >
        <Typography value={MEDIA.webPage}>{MEDIA.webPage}</Typography>
        <Typography value={MEDIA.institutionalMail}>{MEDIA.institutionalMail}</Typography>
        <Typography value={MEDIA.socialMedia}>{MEDIA.socialMedia}</Typography>
        <Typography value={MEDIA.communicationUV}>{MEDIA.communicationUV}</Typography>
        <Typography value={MEDIA.radioUV}>{MEDIA.radioUV}</Typography>
      </CheckList>

      <RadioList
        label={"¿Se proporcionará material promocional?"}
        onChange={handleShowUpload}
        value={showUpload}
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
            values={values?.publicity}
            //onChange={(files) => setFieldValue("publicity", files)}
            onChange={handlePublicityChange}
          ></UploadButton>
        </Stack>
      )}
    </Stack>
  );
}
