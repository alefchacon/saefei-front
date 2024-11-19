import CardEvent from "../../features/events/components/CardEvent";
import NoticeWrapper from "../../features/notices/components/NoticeWrapper";
import { useLayoutEffect } from "react";
import useNotices from "../../features/notices/businessLogic/useNotices";
import CardActionArea from "@mui/material/CardActionArea";
import { useNavigate } from "react-router-dom";
import { ROUTE_EVENT } from "../../stores/routes";
import { useState, useContext, createContext } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import EventView from "../EventView";
import Slide from "@mui/material/Slide";
import { TransitionGroup } from "react-transition-group";
import useIsMobile from "../../components/hooks/useIsMobile";
import CardActions from "@mui/material/CardActions";
import useAuth from "../../features/auth/businessLogic/useAuth";
import { useLoading } from "../../components/providers/LoadingProvider";
import CardList from "../../components/CardList";
import Message from "../../components/Message";

export default function NoticesCoordinator({ onLoad, notices }) {
  const { markAsRead } = useNotices();
  const [selectedNotice, setSelectedNotice] = useState(null);
  const { isLoading } = useLoading();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const user = useAuth().getUser();

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

  if (user === null) {
    return;
  }
  if (!Boolean(user) || !user?.isCoordinator) {
    return;
  }

  if (
    !Boolean(notices?.noticesCoordinator) ||
    notices?.noticesCoordinator?.length < 1
  ) {
    return <Message center title={"No hay notificaciones"} />;
  }

  if (isMobile) {
    return (
      <CardList label={"Notificaciones de evento"}>
        <TransitionGroup>
          {notices.noticesCoordinator?.map((notice, index) => (
            <Slide direction="left" key={index} mountOnEnter unmountOnExit>
              <CardActionArea
                key={index}
                onClick={() => navigate(`${ROUTE_EVENT}/${notice.event.id}`)}
                sx={{ margin: "5px 0" }}
              >
                <NoticeWrapper
                  noticeType={notice.type?.id}
                  name={notice.type?.name}
                >
                  <CardEvent event={notice.event} disablePadding wrapped />
                </NoticeWrapper>
              </CardActionArea>
            </Slide>
          ))}
        </TransitionGroup>
      </CardList>
    );
  }

  return (
    <Stack
      label={"Notificaciones de evento"}
      color={"#6B6F79"}
      maxHeight={"100%"}
    >
      <Stack direction={"row"} gap={"20px"} maxHeight={"100%"}>
        <Stack
          direction={"column"}
          gap={1}
          flex={0.7}
          maxHeight={"100%"}
          sx={{ overflowY: "auto", overflowX: "hidden" }}
          padding={"0"}
        >
          <TransitionGroup>
            {notices.noticesCoordinator?.map((notice, index) => (
              <Slide direction="left" key={index} mountOnEnter unmountOnExit>
                <CardActionArea onClick={() => setSelectedNotice(notice)}>
                  <NoticeWrapper
                    key={index}
                    noticeType={notice.type?.id}
                    name={notice.type?.name}
                    onReply={() => markAsRead(notice)}
                    selected={notice.id === selectedNotice?.id}
                  >
                    <CardEvent event={notice.event} disablePadding wrapped />
                    <CardActions className="button-row">
                      <Button>Marcar como leído</Button>
                    </CardActions>
                  </NoticeWrapper>
                </CardActionArea>
              </Slide>
            ))}
          </TransitionGroup>
        </Stack>

        <Stack flex={2} className="shadow">
          <EventView
            defaultEventUV={selectedNotice}
            onReply={handleReply}
          ></EventView>
        </Stack>
      </Stack>
    </Stack>
  );
}
