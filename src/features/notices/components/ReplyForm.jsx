import { useEffect, useState, useRef } from "react";
import Stack from "@mui/material/Stack";
import { useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
//MOVE THIS TO SOME KIND OF ENV FILE!! >:D
import ButtonResponsive from "../../../components/ButtonResponsive";
import { Formik, Form } from "formik";
import { useEvents } from "../../events/businessLogic/useEvents";
import { useLoading } from "../../../components/providers/LoadingProvider";

import { useNoticesContext } from "../../../app/Notices/Notices";
import { Typography } from "@mui/material";


export default function ReplyForm({
  eventUV,
  onSuccess,
  submitButton,
  editable,
  children
}) {
  const { replyToEvent } = useEvents();
  const { loading } = useLoading();
  const textRef = useRef(null);
  const handleSubmit = async () => {
    const values = {
      id: eventUV?.id,
      reply: textRef.current.value,
    };
    const response = await replyToEvent(values);

    /*
    if (response.status === 200) {
      onSuccess(response.data.data);
    }
      */
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    textRef.current.value = newValue;
  };

  if (!editable) {
    return <Typography>{eventUV?.reply}</Typography>;
  }

  return (
    <Stack gap={"10px"}>
    {children}
      <TextField
        inputRef={textRef}
        defaultValue={
          eventUV?.reply ||
          "[necesito los fragmentos de texto para armar el mensaje! :D]"
        }
        onChange={handleChange}
        multiline
        //rows={10}
        slotProps={{
          htmlInput: {height: "fit-content", maxLength: 3000}
        }}

        variant="filled"
      ></TextField>
      
      
      {submitButton && (
        <Stack className="button-row">
          <ButtonResponsive
            type="submit"
            onClick={handleSubmit}
            loading={loading}
          >
            Responder
          </ButtonResponsive>
        </Stack>
      )}
      
    </Stack>
  );
}
