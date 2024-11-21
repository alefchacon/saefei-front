import { forwardRef, useRef } from "react";

import CardList from "../../components/CardList";
import Page from "../../components/Page";
import CardEvent from "../../features/events/components/CardEvent";
import TabsCustom from "../../components/Tabs";
import NoticeWrapper from "../../features/notices/components/NoticeWrapper";
import { useLayoutEffect, useEffect } from "react";
import useNotices from "../../features/notices/businessLogic/useNotices";
import CardActionArea from "@mui/material/CardActionArea";
import { useNavigate } from "react-router-dom";
import { ROUTE_EVENT } from "../../stores/routes";
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
import NoticesAdministrator from "./NoticesAdministrator";

const NoticesContext = createContext(null);

import NoticesCoordinator from "./NoticesCoordinator";
import getUser from "../../features/auth/businessLogic/getUser";
export function useNoticesContext() {
  return useContext(NoticesContext);
}

export function Notices({ onLoad }) {
  const { markAsRead, getNotices, notices } = useNotices();
  const [selectedNotice, setSelectedNotice] = useState(null);
  const { Modal, openModal } = useModal();
  const isMobile = useIsMobile();
  const user = getUser();

  useEffect(() => {
    getNotices();
    if (onLoad) {
      onLoad();
    }
  }, []);

  return (
    <Page
      showHeader={!isMobile}
      title={"Bandeja de entrada"}
      bgcolor="white"
      disablePadding
      disableDivider
    >
      <TabsCustom id={"principal"}>
        {user.isCoordinator && (
          <NoticesCoordinator
            notices={notices}
            label={"Eventos"}
          ></NoticesCoordinator>
        )}
        <NoticesAdministrator
          label="Reservaciones"
          notices={notices}
          onNoticeUpdate={markAsRead}
        ></NoticesAdministrator>
      </TabsCustom>
    </Page>
  );
}
