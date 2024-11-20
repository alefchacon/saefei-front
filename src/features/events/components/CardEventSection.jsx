import { useEffect, useState, useRef } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import TabsCustom from "../../../components/Tabs";
import FILE_URL from "../../../stores/fileUrl";
import AdditionalForm from "../../../app/Notify/OptionalForms/AdditionalForm";
import BroadcastForm from "../../../app/Notify/OptionalForms/BroadcastForm";
import TechRequirementsForm from "../../../app/Notify/OptionalForms/TechRequirementsForm";
import RecordsForm from "../../../app/Notify/OptionalForms/RecordsForm";
import DecorationForm from "../../../app/Notify/OptionalForms/DecorationForm";
import { Formik, Form } from "formik";
import ButtonResponsive from "../../../components/ButtonResponsive";
import { useLoading } from "../../../components/providers/LoadingProvider";
import PresidiumForm from "../../../app/Notify/OptionalForms/PresidiumForm";
import ExternalParticipantsForm from "../../../app/Notify/OptionalForms/ExternalParticipantsForm";
import ChipCustom from "../../../components/Chip";
import IconButton from "@mui/material/IconButton";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ReplyIcon from "@mui/icons-material/Reply";
import MessageIcon from "@mui/icons-material/Message";
import Tooltip from "@mui/material/Tooltip";
import FILE_TYPES from "../../../stores/fileTypes";
import { useModal } from "../../../components/providers/ModalProvider";
import ScheduleForm from "../../../app/Notify/StepForms/ScheduleForm";
export default function CardEventSection({
  eventUV,
  onUpdate,
  onUploadFile,
  onUpdateFile,
  title,
  children,
  flex,
  maxHeight = "100%",
  editable,
  fieldKeys = [],
  forCoordinator,
  secondaryAction,
}) {
  const { Modal, openModal, closeModal } = useModal();
  const { loading } = useLoading();
  if (!Array.isArray(children)) {
    children = [children];
  }

  const logisticsForm = (
    <Stack>
      <TabsCustom>
        <Stack label="General">
          <ExternalParticipantsForm></ExternalParticipantsForm>
        </Stack>
        <Stack label="Requisitos del CC">
          <TechRequirementsForm></TechRequirementsForm>
        </Stack>
        <Stack label="Decoración">
          <DecorationForm></DecorationForm>
        </Stack>
        <Stack label="Presidium">
          <PresidiumForm></PresidiumForm>
        </Stack>
        <Stack label="Constancias">
          <RecordsForm></RecordsForm>
        </Stack>
      </TabsCustom>
    </Stack>
  );

  const editType = {
    Logística: logisticsForm,
    Agenda: <ScheduleForm forEditing />,
    Difusión: <BroadcastForm forEditing />,
    Adicional: <AdditionalForm />,
  };

  const submitEdit = async (values) => {
    const responseJSONUpdate = await onUpdate(values);
    console.log(values);

    if (values["updatedPublicity"]) {
      onUploadFile(
        values["updatedPublicity"],
        FILE_TYPES.PUBLICITY,
        eventUV.id
      );
    }

    if (values["updatedChronogram"]) {
      onUploadFile(
        values["updatedChronogram"],
        FILE_TYPES.CHRONOGRAM,
        eventUV.id
      );
    }

    if (responseJSONUpdate.status === 200) {
      closeModal();
    }
  };

  const editModalBody = () => {
    return (
      <Formik initialValues={eventUV} onSubmit={submitEdit} enableReinitialize>
        <Form>
          {editType[title]}
          <Stack className="button-row">
            <ButtonResponsive type="submit">Guardar</ButtonResponsive>
          </Stack>
        </Form>
      </Formik>
    );
  };

  const showEditModal = (sectionTitle = "asdf", sectionData) => {
    openModal(`Editar ${sectionTitle}`, editModalBody(), "", true);
  };
  const hasChanges = eventUV.changes?.some((change) =>
    change.columns.some((column) => fieldKeys.includes(column))
  );
  const changeButtons = (
    <Stack direction={"row"} alignItems={"center"}>
      <ChipCustom label={"Editado"} color={"warning"}></ChipCustom>

      <Tooltip title={"Aprobar edición"} placement="top">
        <IconButton>
          <ThumbUpIcon></ThumbUpIcon>
        </IconButton>
      </Tooltip>
      <Tooltip title={"Enviar observaciones"} placement="top">
        <IconButton>
          <ReplyIcon></ReplyIcon>
        </IconButton>
      </Tooltip>
    </Stack>
  );

  return (
    <Formik>
      <>
        <Stack
          height={"100%"}
          maxHeight={maxHeight}
          className="card"
          flex={flex}
          overflow={"hidden"}
          justifyContent={"space-between"}
        >
          <Stack
            sx={{
              padding: 2,
              height: "100%",
              maxHeight: "fit-content",
              alignItems: "start",
              justifyContent: "start",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Stack
              justifyContent={"space-between"}
              width={"100%"}
              direction={"row"}
            >
              <Typography variant="h5" fontWeight={500}>
                {title}
              </Typography>
              {hasChanges && changeButtons}
            </Stack>
            <br />
            {children}
          </Stack>
          {editable && (
            <Stack className="button-row" padding={"10px"}>
              {secondaryAction}
              <Button onClick={() => showEditModal(title, eventUV)}>
                Editar{" "}
              </Button>
            </Stack>
          )}
        </Stack>
      </>
    </Formik>
  );
}
