import CardList from "../components/CardList";
import Page from "../components/Page";
import CardEvent from "../features/events/components/CardEvent";
import TabsCustom from "../components/Tabs";
import NoticeWrapper from "../features/notices/components/NoticeWrapper";
import { useLayoutEffect } from "react";
import useNotices from "../features/notices/businessLogic/useNotices";
import CardActionArea from "@mui/material/CardActionArea";
import { useNavigate } from "react-router-dom";
import { ROUTE_EVENT } from "../stores/ROUTES";
import { useState, useContext, createContext } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import EventView from "./EventView";
import CardReservation from "../features/reservations/components/CardReservation";
import Slide from "@mui/material/Slide";
import Collapse from "@mui/material/Collapse";
import { TransitionGroup } from "react-transition-group";

const NoticesContext = createContext(null);

export function useNoticesContext() {
  return useContext(NoticesContext);
}

export function NoticesDesktop({ onLoad }) {
  const { getNotices, notices, markAsRead } = useNotices();
  const [selectedNotice, setSelectedNotice] = useState(null);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    fetchNextPage();
    if (onLoad) {
      onLoad();
    }
  }, []);

  const fetchNextPage = async () => {
    getNotices();
  };

  const handleReply = (updatedEvent) => {
    if (updatedEvent.id === selectedNotice.id) {
      markAsRead(selectedNotice);
      setSelectedNotice(null);
    }
  };

  return (
    <NoticesContext.Provider value={{ handleReply }}>
      <Page title={"Bandeja de entrada"} bgcolor="white" disablePadding>
        <TabsCustom id={"principal"}>
          {notices.coordinatorNotices?.length > 0 && (
            <Stack label={"Eventos"} color={"#6B6F79"} maxHeight={"100%"}>
              <Stack direction={"row"} gap={"20px"} maxHeight={"100%"}>
                <Stack
                  direction={"column"}
                  className="shadow"
                  gap={1}
                  flex={1}
                  maxHeight={"100%"}
                  sx={{ overflowY: "auto", overflowX: "hidden" }}
                  padding={"10px"}
                >
                  <TransitionGroup>
                    {notices.coordinatorNotices?.map((notice, index) => (
                      <Slide
                        direction="left"
                        key={index}
                        mountOnEnter
                        unmountOnExit
                      >
                        <CardActionArea
                          key={index}
                          onClick={() => setSelectedNotice(notice)}
                          sx={{ padding: "5px 0" }}
                        >
                          <NoticeWrapper
                            noticeType={notice.type?.id}
                            name={notice.type?.name}
                            onReply={() => markAsRead(notice)}
                            selected={notice.id === selectedNotice?.id}
                          >
                            <CardEvent event={notice.event} disablePadding />
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
          )}
          <Stack
            label={"Reservaciones"}
            className="right-padding"
            gap={1}
            color={"#6B6F79"}
          >
            {notices.administratorNotices.map((notice, index) => (
              <CardActionArea
                onClick={() => navigate(`${ROUTE_EVENT}/${notice.event.id}`)}
              >
                <NoticeWrapper
                  noticeType={notice.type?.id}
                  name={notice.type?.name}
                >
                  <CardReservation
                    reservation={notice.reservation}
                    disablePadding
                  />
                </NoticeWrapper>
              </CardActionArea>
            ))}
          </Stack>
        </TabsCustom>
        <CardList></CardList>
      </Page>
    </NoticesContext.Provider>
  );
}
