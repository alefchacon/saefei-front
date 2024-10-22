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
import { useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import CardReservation from "../features/reservations/components/CardReservation";

export default function NoticesMobile() {
  const { getNotices, notices } = useNotices();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    fetchNextPage();
  }, []);

  const fetchNextPage = async () => {
    getNotices();
  };

  return (
    <Page
      title={"Bandeja de entrada"}
      onBottomReached={fetchNextPage}
      bgcolor="white"
      disablePadding
    >
      <TabsCustom id={"principal"}>
        <Stack
          label={"Eventos"}
          className="right-padding"
          gap={1}
          color={"#6B6F79"}
        >
          {notices.coordinatorNotices.map((notice, index) => (
            <CardActionArea
              key={index}
              onClick={() => navigate(`${ROUTE_EVENT}/${notice.event.id}`)}
            >
              <NoticeWrapper
                noticeType={notice.type?.id}
                name={notice.type?.name}
              >
                <CardEvent event={notice.event} disablePadding />
              </NoticeWrapper>
            </CardActionArea>
          ))}
        </Stack>
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
  );
}
