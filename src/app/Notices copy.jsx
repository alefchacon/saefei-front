import CardList from "../components/CardList";
import Page from "../components/Page";
import CardEvent from "../features/events/components/CardEvent";
import Stack from "@mui/material/Stack";

import { useLayoutEffect } from "react";
import useNotices from "../features/notices/businessLogic/useNotices";
import EventView from "./EventView";

export default function Notices() {
  const { getNotices, notices } = useNotices();

  useLayoutEffect(() => {
    getNotices();
  }, []);

  return (
    <Stack id={"principal"} direction={"row"} flex={1} gap={"20px"}>
      <CardList>
        {notices.map((notice, index) => (
          <CardEvent event={notice.event} />
        ))}
      </CardList>

      <Stack bgcolor={"red"} flex={2}>
        <EventView></EventView>
      </Stack>
    </Stack>
  );
}
