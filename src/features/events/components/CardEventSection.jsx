import { useEffect, useState, useRef } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import TabsCustom from "../../../components/Tabs";
import { useModal } from "../../../components/hooks/useModal";
const FILE_URL = "http://localhost:8000/api/file/";

import AdditionalForm from "../../../app/Notify/OptionalForms/AdditionalForm";
import BroadcastForm from "../../../app/Notify/OptionalForms/BroadcastForm";
import TechRequirementsForm from "../../../app/Notify/OptionalForms/TechRequirementsForm";
import RecordsForm from "../../../app/Notify/OptionalForms/RecordsForm";
import DecorationForm from "../../../app/Notify/OptionalForms/DecorationForm";
import { Formik, Form } from "formik";
import ButtonResponsive from "../../../components/ButtonResponsive";
import { useEvents } from "../businessLogic/useEvents";
import { useLoading } from "../../../components/providers/LoadingProvider";
export default function CardEventSection({
  eventUV,
  onUpdate,
  title,
  children,
  flex,
  maxHeight = "100%",
  editable,
}) {
  const { Modal, openModal, closeModal } = useModal();
  const { loading } = useLoading();
  if (!Array.isArray(children)) {
    children = [children];
  }

  const logisticsForm = (
    <Stack>
      <TabsCustom>
        <Stack label="Requisitos del CC">
          <TechRequirementsForm></TechRequirementsForm>
        </Stack>
        <Stack label="Decoración">
          <DecorationForm></DecorationForm>
        </Stack>
        <Stack label="Presidium"></Stack>
        <Stack label="Constancias">
          <RecordsForm></RecordsForm>
        </Stack>
      </TabsCustom>
    </Stack>
  );

  const editType = {
    Logística: logisticsForm,
    Agenda: "Agenda",
    Difusión: <BroadcastForm />,
    Adicional: <AdditionalForm />,
  };

  const submitEdit = async (values) => {
    const response = await onUpdate(values);
    if (response.status === 200) {
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

  return (
    <Formik>
      <>
        <Modal></Modal>
        <Stack
          height={"100%"}
          maxHeight={maxHeight}
          className="card shadow"
          flex={flex}
          overflow={"hidden"}
          justifyContent={"space-between"}
          bgcolor={"white"}
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
            <Typography variant="h5" fontWeight={500}>
              {title}
            </Typography>
            <br />
            {children}
          </Stack>
          {editable && (
            <Stack className="button-row" padding={"10px"}>
              <Button onClick={() => showEditModal(title, eventUV)}>
                Editar
              </Button>
            </Stack>
          )}
        </Stack>
      </>
    </Formik>
  );
}
