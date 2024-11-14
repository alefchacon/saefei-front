import { useState, useLayoutEffect } from "react";
import "./App.css";

import { Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import ReservationForm from "./ReservationForm";

import Sidebar from "../components/Sidebar";
import Bottombar from "../components/Bottombar";
import CalendarReservations from "./CalendarReservations";
import EventView from "./EventView";
import { Notices } from "./Notices/Notices";
import "moment/dist/locale/es-mx";
import moment from "moment";
import { Routes, Route } from "react-router-dom";
import * as ROUTES from "../stores/ROUTES";
import EventForm from "./Notify/EventForm";
import Events from "./Events";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useIsMobile from "../components/hooks/useIsMobile";
import EventUpdateForm from "./EventUpdateForm";
import CalendarEvents from "./CalendarEvents";
import { useAxiosInterceptors } from "../dataAccess/useAxiosInterceptor";
import NoContent from "../components/NoContent";
import getNoticeAmount from "../features/notices/businessLogic/getNoticeAmount";
import useAuth from "../features/auth/businessLogic/useAuth";
import AuthGuard from "../features/auth/components/AuthGuard";
import isAuthenticated from "../features/auth/businessLogic/isAuthenticated";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3471c1",
    },
  },
  components: {
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: "#f5f7ff",
          "&:hover": {
            backgroundColor: "#ebefff", // Background color on hover
          },
          "&.Mui-focused": {
            backgroundColor: "#dedfff", // Background color when focused
          },
        },
      },
    },
  },
});

function App() {
  useAxiosInterceptors();

  moment.locale("es-mx");
  const isMobile = useIsMobile();
  const [count, setCount] = useState(0);
  const [noticeAmount, setNoticeAmount] = useState(null);
  const user = useAuth().getUser();
  useLayoutEffect(() => {
    if (isAuthenticated) {
      getNoticeAmount().then((response) => setNoticeAmount(response));
    }
  }, []);
  return (
    <>
      <ThemeProvider theme={theme}>
        <Stack
          role={"main"}
          sx={{ backgroundColor: "var(--bg)" }}
          display={"flex"}
          flexDirection={{ md: "row", xs: "column" }}
          height={"100%"}
          width={"100%"}
          position={"relative"}
        >
          <Stack
            position={"absolute"}
            right={0}
            bgcolor={"var(--dark)"}
            padding={"0.2px 20px 0.2px 50px"}
            borderRadius={"0 10px 0 20px"}
            display={{ md: "block", xs: "none" }}
            sx={{ opacity: 0.5 }}
            zIndex={1000}
          >
            <Typography color="white">Universidad Veracruzana</Typography>
          </Stack>

          <Sidebar noticeAmount={noticeAmount} />

          <Stack
            className="flex-2"
            sx={{
              position: "relative",
              backgroundColor: "transparent",
            }}
          >
            <Routes>
              <Route
                path={ROUTES.ROUTE_INBOX}
                element={
                  <AuthGuard>
                    <Notices />
                  </AuthGuard>
                }
              ></Route>
              <Route
                path={ROUTES.ROUTE_RESERVE}
                element={<ReservationForm></ReservationForm>}
              ></Route>
              <Route
                path={ROUTES.ROUTE_CALENDAR_RESERVATIONS}
                element={<CalendarReservations></CalendarReservations>}
              ></Route>
              <Route
                path={ROUTES.ROUTE_CALENDAR_EVENTS}
                element={<CalendarEvents></CalendarEvents>}
              ></Route>
              <Route
                path={`${ROUTES.ROUTE_EVENT}/:idEvento?`}
                element={<EventView></EventView>}
              ></Route>
              <Route
                path={`${ROUTES.ROUTE_EVENT}/:idEvento?`}
                element={<EventView></EventView>}
              ></Route>
              <Route
                path={`${ROUTES.ROUTE_EVENT}/:idEvento?${ROUTES.ROUTE_EDIT}/:idSeccion?`}
                element={<EventUpdateForm></EventUpdateForm>}
              ></Route>{" "}
              <Route
                path={`${ROUTES.ROUTE_NOTIFY}/:paso?`}
                element={<EventForm />}
              ></Route>{" "}
              <Route
                path={`${ROUTES.ROUTE_SEARCH_EVENTS}`}
                element={<Events />}
              ></Route>{" "}
              <Route
                path={`${ROUTES.ROUTE_MY_EVENTS}`}
                element={
                  <AuthGuard>
                    <Events userEvents />
                  </AuthGuard>
                }
              ></Route>{" "}
              <Route
                path={`/test`}
                element={isMobile ? <Stack>Mobile</Stack> : <NoContent />}
              ></Route>{" "}
            </Routes>
          </Stack>
          <Bottombar noticeAmount={noticeAmount}></Bottombar>
        </Stack>
      </ThemeProvider>
    </>
  );
}

export default App;
