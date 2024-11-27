import { useEffect, useState, useRef } from "react";
import Stack from "@mui/material/Stack";
import ChipTabs from "../../../components/ChipTabs";
import TabsCustom from "../../../components/Tabs";
import ReplyForm from "../../notices/components/ReplyForm";
import * as MEDIA_NOTICES from "../../../stores/mediaNotices";
import useIsMobile from "../../../components/hooks/useIsMobile";
import MEDIA from "../../../stores/media";
import createResponse from "../businessLogic/createResponse";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import ButtonResponsive from "../../../components/ButtonResponsive";

export default function ResponsePanel({onUpdateEvent, onUpdatedEvent, userCanEdit, user, eventUV}) {
    const isMobile = useIsMobile();

    function MediaNoticeForm({ mediaNotice, id, children }) {
      return (
        <Stack gap={"20px"}>
        
          <Alert severity="info">
            La notificación ha sido generada automáticamente. Por favor, verifique que la redacción corresponda a los requisitos del evento antes de enviarla.
          </Alert>
          <TextField
            id={`${id}-email`}
            variant="filled"
            defaultValue={mediaNotice.email}
            label={"Para"}
            sx={{ maxWidth: "300px" }}
          ></TextField>
          <TextField
            id={`${id}-notice`}
            defaultValue={mediaNotice.notice}
            multiline
            rows={10}
            variant="filled"
          ></TextField>
          <Stack className="button-row">
            <ButtonResponsive>Notificar</ButtonResponsive>
          </Stack>
        </Stack>
      );
    }

    eventUV.reply = createResponse(eventUV);

    return (
      <Stack className={isMobile ? "" : "card"} padding={"0px"} gap={"20px"} height={"100%"}>

          {userCanEdit && (
            <Stack label="Respuesta al organizador" height={"100%"}>
              <ReplyForm
                editable={user?.isCoordinator}
                submitButton={user?.isCoordinator}
                eventUV={eventUV}
                onSuccess={onUpdatedEvent}
              >
              {eventUV.replied==1 ?
                <Alert >
                  La respuesta ya fue enviada.
                </Alert>

              : 
                <Alert severity="info">
                  La respuesta ha sido generada automáticamente. Por favor, verifique que la redacción corresponda a los requisitos del evento antes de enviarla.
                </Alert>
              }
              </ReplyForm>
            </Stack>
          )}

      </Stack>
    );
  }


