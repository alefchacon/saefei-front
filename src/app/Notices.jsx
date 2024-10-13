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

export default function Notices() {
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
        <Stack label={"Eventos"} className="right-padding" gap={1}>
          {notices.map((notice, index) => (
            <CardActionArea
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
        <CardList label="Reservaciones"></CardList>
      </TabsCustom>
      <CardList></CardList>
    </Page>
  );
}
