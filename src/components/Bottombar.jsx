import * as React from "react";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AddAlertIcon from "@mui/icons-material/AddAlert";
import DomainIcon from "@mui/icons-material/Domain";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import InboxIcon from "@mui/icons-material/Inbox";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate, useLocation } from "react-router-dom";
import * as ROUTES from "../stores/routes";
import { styled } from "@mui/material/styles";
import LogInForm from "../features/auth/components/LogInForm";
import { useModal } from "./providers/ModalProvider";
import { useTheme } from "@emotion/react";
import { IconButton, ListItem } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import LoginIcon from "@mui/icons-material/Login";
import Alert from "@mui/material/Alert";

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
      {icon}
      <Typography variant="caption">{label}</Typography>
    </ListItemButton>
  );
}

export default function Bottombar({ noticeAmount, isAuthenticated }) {
  const navigate = useNavigate();
  const { openModal, closeModal } = useModal();

  const showLoginModal = (message = "") => {
    openModal(
      "Entrar",
      <LogInForm onLogin={handleLogin}>{message}</LogInForm>,
      "",
      true
    );
  };
  const handleLogin = () => {
    closeModal();
  };

  const iconSize = {
    fontSize: "28px",
  };

  const handleNavigateToNotify = () => {
    if (isAuthenticated) {
      navigate(ROUTES.ROUTE_NOTIFY);
    } else {
      showLoginModal(
        <Alert severity="info">
          Debe iniciar sesión para poder notificar su evento
        </Alert>
      );
    }
  };

  return (
    <Stack
      sx={{
        width: "100%",
        borderTop: "1px solid lightgray",
        position: "sticky",
        bottom: 0,
        backgroundColor: "var(--card)",
      }}
      direction={"row"}
      display={{ xs: "flex", md: "none" }}
    >
      <NavOption
        label="Notificar"
        route={ROUTES.ROUTE_NOTIFY}
        onClick={handleNavigateToNotify}
        icon={<AddAlertIcon sx={iconSize} />}
      />
      <NavOption
        label="Reservar"
        route={ROUTES.ROUTE_CALENDAR_RESERVATIONS}
        icon={<LocationOnIcon sx={iconSize} />}
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
          onClick={showLoginModal}
        />
      )}
    </Stack>
  );
}
