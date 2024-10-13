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
import TextField from "@mui/material/TextField";
import SearchField from "../components/SearchField";
import SelectCustom from "../components/Select";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import useAuth from "../features/auth/businessLogic/useAuth";

import moment from "moment";
import { ROLE_COORDINATOR } from "../stores/ROLES";
export default function Events() {
  const { getNotices, notices } = useNotices();
  const navigate = useNavigate();
  const user = useAuth().getUser();

  useLayoutEffect(() => {
    fetchNextPage();
  }, []);

  const fetchNextPage = async () => {
    getNotices();
  };

  return (
    <Page
      title={"Eventos"}
      onBottomReached={fetchNextPage}
      bgcolor="white"
      disablePadding
    >
      <Stack id={"principal"} className="right-padding" gap={1}>
        <SearchField></SearchField>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Stack direction={"row"} gap={"1vw"}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                label="Mes"
                name="selected-months"
                value={moment()}
                views={["month", "year"]}
                sx={{ maxWidth: "170px" }}
                slotProps={{
                  textField: { variant: "standard", fullWidth: false },
                }}
              />
            </LocalizationProvider>
            <SelectCustom variant="standard" label="Orden" minWidth={"100px"}>
              <Stack value={"fecha"}>Fecha</Stack>
              <Stack value={"alfabetico"}>Alfabético</Stack>
            </SelectCustom>
          </Stack>

          {user.rol.id === ROLE_COORDINATOR.id && (
            <Button variant="contained">Reportar</Button>
          )}
        </Stack>
        <br />
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
      <CardList></CardList>
    </Page>
  );
}
