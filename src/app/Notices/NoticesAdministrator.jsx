import CardEvent from "../../features/events/components/CardEvent";
import NoticeWrapper from "../../features/notices/components/NoticeWrapper";
import { useLayoutEffect } from "react";
import useNotices from "../../features/notices/businessLogic/useNotices";
import { useState, useContext, createContext } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import EventView from "../EventView";
import Slide from "@mui/material/Slide";
import { TransitionGroup } from "react-transition-group";
import useIsMobile from "../../components/hooks/useIsMobile";
import CardActions from "@mui/material/CardActions";
import Message from "../../components/Message";
import CardList from "../../components/CardList";
import CardReservation from "../../features/reservations/components/CardReservation";
import getUser from "../../features/auth/businessLogic/getUser";
import { useModal } from "../../components/providers/ModalProvider";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import ButtonResponsive from "../../components/ButtonResponsive";
import { useRef } from "react";
import { useReservations } from "../../features/reservations/businessLogic/useReservations";
import CardActionArea from "@mui/material/CardActionArea";

export default function NoticesAdministrator({
  onLoad,
  notices,
  onNoticeUpdate,
}) {
  const { openModal } = useModal();
  const [selectedNotice, setSelectedNotice] = useState(null);
  const isMobile = useIsMobile();
  const user = getUser();
  const replyRef = useRef(null);
  const { acceptReservation, rejectReservation } = useReservations();

  useLayoutEffect(() => {
    if (onLoad) {
      onLoad();
    }
  }, []);

  const handleReply = (updatedEvent) => {
    if (updatedEvent.id === selectedNotice.id) {
      markAsRead(selectedNotice);
      setSelectedNotice(null);
    }
  };

  if (!user.isAdministrator) {
    return;
  }

  const handleReject = async (notice, reply) => {
    const response = await rejectReservation(notice.reservation, reply);
    if (response.status === 200) {
      await onNoticeUpdate(notice);
    }
  };

  const handleAccept = async (notice) => {
    const response = await acceptReservation(notice.reservation);
    if (response.status === 200) {
      await onNoticeUpdate(notice);
    }
  };

  if (
    !Boolean(notices?.noticesAdministrator) ||
    notices?.noticesAdministrator?.length < 1
  ) {
    return <Message center title={"No hay notificaciones"} />;
  }

  const openRejectReservationModal = (notice) => {
    openModal(
      "Rechazar reservación",
      <Stack>
        <CardReservation
          reservation={notice.reservation}
          user
          reservationSchedule
          simpleSchedule
        ></CardReservation>
        <br />
        <Typography>
          Explique por qué la reservación no puede ser aprobada:
        </Typography>
        <TextField variant="filled" inputRef={replyRef}></TextField>
      </Stack>,
      <Button
        variant="contained"
        disableElevation
        onClick={() => handleReject(notice, replyRef.current.value)}
      >
        Rechazar
      </Button>,
      true
    );
  };

  return (
    <CardList>
      <TransitionGroup>
        {notices.noticesAdministrator?.map((notice, index) => (
          <Slide direction="left" key={index} mountOnEnter unmountOnExit>
            <Stack sx={{ margin: "5px 0" }}>
              <NoticeWrapper
                noticeType={notice.type?.id}
                name={notice.type?.name}
              >
                <CardReservation
                  reservation={notice.reservation}
                  disablePadding
                  simpleSchedule
                  reservationSchedule
                  wrapped
                  user
                  motive
                />

                <Stack className="button-row">
                  <Button onClick={() => openRejectReservationModal(notice)}>
                    Rechazar
                  </Button>
                  <Button
                    variant="contained"
                    disableElevation
                    onClick={() => handleAccept(notice)}
                  >
                    Aceptar
                  </Button>
                </Stack>
              </NoticeWrapper>
            </Stack>
          </Slide>
        ))}
      </TransitionGroup>
      <br />
      <br />
      <br />
    </CardList>
  );
}
