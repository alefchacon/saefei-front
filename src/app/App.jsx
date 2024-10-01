import { useState } from "react";
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { Card } from "@mui/material";
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

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Bottombar from "../components/Bottombar";
import Reservations from "./Reservations";
import EventView from "./EventView";

import "moment/dist/locale/es-mx";
import moment from "moment";
import LinearProgress from "@mui/material/LinearProgress";
import { Routes, Route } from "react-router-dom";
import * as ROUTES from "../stores/ROUTES";
import EventForm from "./EventForm";
function App() {
  moment.locale("es-mx");

  const [count, setCount] = useState(0);

  return (
    <>
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
        >
          <Typography color="white">Universidad Veracruzana</Typography>
        </Stack>

        <Sidebar />

        <Stack
          id="content"
          className="flex-2"
          sx={{
            backgroundColor: "transparent",
            padding: { md: "2rem", xs: "0" },
          }}
        >
          <Routes>
            <Route
              path={ROUTES.ROUTE_RESERVE}
              element={<ReservationForm></ReservationForm>}
            ></Route>
            <Route
              path={ROUTES.ROUTE_CALENDAR_RESERVATIONS}
              element={<Reservations></Reservations>}
            ></Route>
            <Route
              path={`${ROUTES.ROUTE_SEARCH_EVENTS}/:idEvento?`}
              element={<EventView></EventView>}
            ></Route>
            <Route
              path={`${ROUTES.ROUTE_NOTIFY}`}
              element={<EventForm />}
            ></Route>
          </Routes>
        </Stack>
        <Bottombar></Bottombar>
      </Stack>
    </>
  );
}

export default App;
