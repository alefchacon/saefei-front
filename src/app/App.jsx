import { useState } from "react";
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { Card, dividerClasses } from "@mui/material";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import { IconButton } from "@mui/material";
import { Divider } from "@mui/material";
import { CardActionArea } from "@mui/material";
import TodayIcon from "@mui/icons-material/Today";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Stack from "@mui/material/Stack";
import CardHeader from "@mui/material/CardHeader";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ReservationForm from "./ReservationForm";
import SchoolIcon from "@mui/icons-material/School";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Bottombar from "../components/Bottombar";
import Reservations from "./Reservations";
import EventView from "./EventView";
import { NoticesDesktop } from "./NoticesDesktop";
import NoticesMobile from "./NoticesMobile";

import "moment/dist/locale/es-mx";
import moment from "moment";
import LinearProgress from "@mui/material/LinearProgress";
import { Routes, Route } from "react-router-dom";
import * as ROUTES from "../stores/ROUTES";
import EventForm from "./Notify/EventForm";
import Events from "./Events";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useIsMobile from "../components/hooks/useIsMobile";

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
  moment.locale("es-mx");
  const isMobile = useIsMobile();
  const [count, setCount] = useState(0);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Stack
          role={"main"}
          sx={{ backgroundColor: "white" }}
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

          <Sidebar />

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
                element={isMobile ? <NoticesMobile /> : <NoticesDesktop />}
              ></Route>
              <Route
                path={ROUTES.ROUTE_RESERVE}
                element={<ReservationForm></ReservationForm>}
              ></Route>
              <Route
                path={ROUTES.ROUTE_CALENDAR_RESERVATIONS}
                element={<Reservations></Reservations>}
              ></Route>
              <Route
                path={`${ROUTES.ROUTE_EVENT}/:idEvento?`}
                element={<EventView></EventView>}
              ></Route>
              <Route
                path={`${ROUTES.ROUTE_NOTIFY}/:paso?`}
                element={<EventForm />}
              ></Route>{" "}
              <Route
                path={`${ROUTES.ROUTE_SEARCH_EVENTS}`}
                element={<Events />}
              ></Route>{" "}
              <Route
                path={`/test`}
                element={
                  isMobile ? <Stack>Mobile</Stack> : <Stack>Desktop</Stack>
                }
              ></Route>{" "}
            </Routes>
          </Stack>
        </Stack>
      </ThemeProvider>
    </>
  );
}

export default App;
