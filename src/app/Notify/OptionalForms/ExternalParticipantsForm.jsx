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

export default function ExternalParticipantsForm({
  values,
  userReservations,
  onFieldValueChange,
  onSelectUserReservations,
  onSectionChange,
}) {
  return (
    <Stack gap={"var(--field-gap)"}>
      <Stack>
        <FormLabel>
          ¿Cuántas personas externas estiman recibir en el evento?
        </FormLabel>
        <TextField variant="standard" type="number"></TextField>
      </Stack>
      <RadioList
        label={
          "¿Se requiere autorización para que público externo ingrese al estacionamiento durante el evento?"
        }
      >
        <Typography value="true">Sí</Typography>
        <Typography value="false">No</Typography>
      </RadioList>
      <RadioList
        label={"¿Necesita autorización para el ingreso en fin de semana?"}
      >
        <Typography value="true">Sí</Typography>
        <Typography value="false">No</Typography>
      </RadioList>
    </Stack>
  );
}