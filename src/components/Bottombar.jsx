import * as React from "react";
import Badge from "@mui/material/Badge";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import AddAlertIcon from "@mui/icons-material/AddAlert";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import InboxIcon from "@mui/icons-material/Inbox";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate, useLocation } from "react-router-dom";
import * as ROUTES from "../stores/routes";
import { useModal } from "./providers/ModalProvider";
import { useTheme } from "@emotion/react";
import ListItemButton from "@mui/material/ListItemButton";
import LoginIcon from "@mui/icons-material/Login";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import Divider from "@mui/material/Divider";

function NavOption({
  route = null,
  icon = <AccountCircleIcon sx={{ fontSize: "28px" }} />,
  label = "Label",
  onClick,
  badgeContent = null,
}) {
  const theme = useTheme();
  const selected = useLocation().pathname.includes(route);
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <ListItemButton
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: selected ? theme.palette.primary.main : "",
        position: "relative",
        padding: "2px 0",
      }}
      onClick={handleClick}
    >
      {badgeContent && (
        <Badge
          badgeContent={badgeContent}
          color="error"
          sx={{
            top: "0",
            right: "0",
            margin: "15px 7vw",
            position: "absolute",
          }}
        ></Badge>
      )}
      <Stack
        bgcolor={selected ? "var(--selected)" : ""}
        padding={"2px 20px"}
        borderRadius={"100px"}
      >
        {icon}
      </Stack>
      <Typography variant="caption" fontWeight={selected ? 600 : 400}>
        {label}
      </Typography>
    </ListItemButton>
  );
}

export default function Bottombar({ noticeAmount, isAuthenticated, onLogIn }) {
  const navigate = useNavigate();
  const { openModal, closeModal } = useModal();

  const iconSize = {
    fontSize: "24px",
  };

  return (
    <Stack
      sx={{
        width: "100%",
        borderTop: "1px solid lightgray",
        position: "sticky",
        zIndex: 9001,
        bottom: 0,
        backgroundColor: "var(--card)",
      }}
      flex={1}
      direction={"row"}
      display={{ xs: "flex", md: "none" }}
    >
      <NavOption
        label="Notificar"
        route={ROUTES.ROUTE_NOTIFY}
        onClick={() => navigate(ROUTES.ROUTE_NOTIFY)}
        icon={<AddAlertIcon sx={iconSize} />}
      />
      <NavOption
        label="Reservar"
        route={ROUTES.ROUTE_CALENDAR_RESERVATIONS}
        icon={<AddLocationIcon sx={iconSize} />}
        onClick={() => navigate(ROUTES.ROUTE_CALENDAR_RESERVATIONS)}
      />
      <NavOption
        label="Eventos"
        icon={<CalendarMonthIcon sx={iconSize} />}
        route={ROUTES.ROUTE_CALENDAR_EVENTS}
        onClick={() => navigate(ROUTES.ROUTE_CALENDAR_EVENTS)}
      />

      {isAuthenticated ? (
        <>
          <NavOption
            label="Bandeja"
            onClick={() => navigate(ROUTES.ROUTE_INBOX)}
            route={ROUTES.ROUTE_INBOX}
            badgeContent={noticeAmount}
            icon={<InboxIcon sx={iconSize} />}
          />
          <NavOption
            label="Usuario"
            route={ROUTES.ROUTE_MY_EVENTS}
            onClick={() => navigate(ROUTES.ROUTE_MY_EVENTS)}
            icon={<AccountCircleIcon sx={iconSize} />}
          />
        </>
      ) : (
        <NavOption
          label="Entrar"
          icon={<LoginIcon sx={iconSize} />}
          onClick={onLogIn}
        />
      )}
    </Stack>
  );
}
