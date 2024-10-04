import { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import StepperCustom from "../../../components/Stepper";

import CampaignIcon from "@mui/icons-material/Campaign";
import Page from "../../../components/Page";
import TextField from "@mui/material/TextField";
import moment from "moment";
import { TimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useReservations } from "../../../features/reservations/businessLogic/useReservations";
import useAuth from "../../businessLogic/useAuth";
import CardReservation from "../../../features/reservations/components/CardReservation";
import CheckList from "../../../components/CheckList";
import Divider from "@mui/material/Divider";
import { getHHssString } from "../../../util/times";
import { useModal } from "../../../components/hooks/useModal";
import SectionButton from "../../../components/SectionButton";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import SettingsIcon from "@mui/icons-material/Settings";
import HailIcon from "@mui/icons-material/Hail";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import RadioList from "../../../components/RadioList";
import AccordionCustom from "../../../components/Accordion";
import { useNavigate } from "react-router-dom";
import UploadButton from "../../../components/UploadButton";
import Slide from "@mui/material/Slide";

import * as ROUTE from "../../../stores/ROUTES";

import CardActivity from "../../../features/events/components/CardActivity";

import { Formik, Form } from "formik";

export default function BroadcastForm({
  values,
  userReservations,
  onFieldValueChange,
  onSelectUserReservations,
  onSectionChange,
}) {
  const [showUpload, setShowUpload] = useState(false);
  return (
    <Stack gap={"var(--field-gap)"}>
      <Stack>
        <CheckList
          label={
            "Seleccione los medios donde se requiere hacer difusión del evento"
          }
          values={values.platforms}
          name={"platforms"}
          onChange={(checked) => onFieldValueChange("platforms", checked)}
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
        <TextField variant="standard" label="Otra(s)"></TextField>
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
          <UploadButton></UploadButton>
        </Stack>
      )}
    </Stack>
  );
}
