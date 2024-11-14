import { forwardRef, useRef } from "react";

import CardList from "../../components/CardList";
import Page from "../../components/Page";
import CardEvent from "../../features/events/components/CardEvent";
import TabsCustom from "../../components/Tabs";
import NoticeWrapper from "../../features/notices/components/NoticeWrapper";
import { useLayoutEffect } from "react";
import useNotices from "../../features/notices/businessLogic/useNotices";
import CardActionArea from "@mui/material/CardActionArea";
import { useNavigate } from "react-router-dom";
import { ROUTE_EVENT } from "../../stores/ROUTES";
import { useState, useContext, createContext } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import EventView from "../EventView";
import CardReservation from "../../features/reservations/components/CardReservation";
import Slide from "@mui/material/Slide";
import Collapse from "@mui/material/Collapse";
import { TransitionGroup } from "react-transition-group";
import { useModal } from "../../components/hooks/useModal";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { useReservations } from "../../features/reservations/businessLogic/useReservations";
import ButtonResponsive from "../../components/ButtonResponsive";
import useIsMobile from "../../components/hooks/useIsMobile";
import CardActions from "@mui/material/CardActions";
import getNotices from "../../features/notices/businessLogic/getNotices";

const NoticesContext = createContext(null);

import NoticesCoordinator from "./NoticesCoordinator";
export function useNoticesContext() {
  return useContext(NoticesContext);
}

export function Notices({ onLoad }) {
  const [notices, setNotices] = useState();
  const { markAsRead } = useNotices();
  const [selectedNotice, setSelectedNotice] = useState(null);
  const navigate = useNavigate();
  const { Modal, openModal } = useModal();
  const { acceptReservation, rejectReservation } = useReservations();
  const isMobile = useIsMobile();

  useLayoutEffect(() => {
    fetchNextPage();
    if (onLoad) {
      onLoad();
    }
  }, []);

  const fetchNextPage = async () => {
    getNotices().then((response) => {
      console.log(response);
      setNotices(response.data.data);
    });
  };

  const handleReply = (updatedEvent) => {
    if (updatedEvent.id === selectedNotice.id) {
      markAsRead(selectedNotice);
      setSelectedNotice(null);
    }
  };

  const replyRef = useRef(null);

  const handleReject = async (reservation, reply) => {
    const response = await rejectReservation(reservation, reply);
  };

  const openRejectReservationModal = (reservation) => {
    openModal(
      "Rechazar reservación",
      <Stack>
        <CardReservation
          reservation={reservation}
          user
          reservationSchedule
          simpleSchedule
        ></CardReservation>
        <br />
        <Typography>
          Explique por qué la reservación no puede ser aprobada:
        </Typography>
        <TextField variant="filled" inputRef={replyRef}></TextField>
        <Stack className="button-row">
          <ButtonResponsive
            onClick={() => handleReject(reservation, replyRef.current.value)}
          >
            Rechazar
          </ButtonResponsive>
        </Stack>
      </Stack>
    );
  };

  const SlideTransition = forwardRef((props, ref) => {
    return <Slide {...props} ref={ref} />;
  });

  const handleAccept = async (notice) => {
    const response = await acceptReservation(notice.reservation);
  };

  return (
    <NoticesContext.Provider value={{ handleReply }}>
      <Page
        showHeader={!isMobile}
        title={"Bandeja de entrada"}
        bgcolor="white"
        disablePadding
        disableDivider
      >
        <TabsCustom id={"principal"}>
          <NoticesCoordinator
            notices={notices}
            label={"Eventos"}
          ></NoticesCoordinator>
          <Stack
            label={"Reservaciones"}
            className="right-padding"
            gap={1}
            color={"#6B6F79"}
          >
            <TransitionGroup>
              {notices?.administratorNotices?.map((notice, index) => (
                <SlideTransition
                  key={notice.id || index}
                  direction="left"
                  mountOnEnter
                  unmountOnExit
                >
                  <Stack>
                    <NoticeWrapper
                      noticeType={notice.type?.id}
                      name={notice.type?.name}
                      replyButton
                    >
                      <CardReservation
                        reservation={notice.reservation}
                        disablePadding
                        user
                        motive
                        reservationSchedule
                        simpleSchedule
                      />
                      <CardActions className="button-row">
                        <Button
                          onClick={() =>
                            openRejectReservationModal(notice.reservation)
                          }
                        >
                          Rechazar
                        </Button>
                        <Button
                          variant="contained"
                          disableElevation
                          onClick={() => handleAccept(notice)}
                        >
                          Aceptar
                        </Button>
                      </CardActions>
                    </NoticeWrapper>
                  </Stack>
                </SlideTransition>
              ))}
            </TransitionGroup>
          </Stack>
        </TabsCustom>
        <CardList></CardList>
      </Page>
      <Modal></Modal>
    </NoticesContext.Provider>
  );
}
