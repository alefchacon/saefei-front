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
import * as ROUTES from "../stores/ROUTES";
import { styled } from "@mui/material/styles";
import isAuthenticated from "../features/auth/businessLogic/isAuthenticated";
import LogInForm from "../features/auth/components/LogInForm";
import { useModal } from "./providers/ModalProvider";
import { useTheme } from "@emotion/react";
import { IconButton, ListItem } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";

const StyledAction = styled(BottomNavigationAction)(({ theme }) => ({
  "& .Mui-selected	": {
    backgroundColor: "blue",

    "&:hover": {
      backgroundColor: "#eeeeee",
    },
  },
  "& .MuiBottomNavigationAction-iconOnly	": {
    color: "red",

    "&:hover": {
      backgroundColor: "#eeeeee",
    },
  },
}));

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

    if (route) {
      navigate(route);
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

export default function Bottombar({ noticeAmount }) {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);
  const { openModal, closeModal } = useModal();

  const showLoginModal = () => {
    openModal("Entrar", <LogInForm onLogin={handleLogin} />, "", true);
  };
  const handleLogin = () => {
    closeModal();
  };

  const iconSize = {
    fontSize: "28px",
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
        icon={<AddAlertIcon sx={iconSize} />}
      />
      <NavOption
        label="Reservar"
        route={ROUTES.ROUTE_CALENDAR_RESERVATIONS}
        icon={<DomainIcon sx={iconSize} />}
      />
      <NavOption
        label="Eventos"
        route={ROUTES.ROUTE_CALENDAR_EVENTS}
        icon={<CalendarMonthIcon sx={iconSize} />}
      />

      {isAuthenticated ? (
        <>
          <NavOption
            label="Bandeja"
            route={ROUTES.ROUTE_INBOX}
            badgeContent={noticeAmount}
            icon={<InboxIcon sx={iconSize} />}
          />
          <NavOption
            label="Usuario"
            route={ROUTES.ROUTE_MY_EVENTS}
            icon={<AccountCircleIcon sx={iconSize} />}
          />
        </>
      ) : (
        <NavOption
          label="Entrar"
          icon={<AccountCircleIcon sx={iconSize} />}
          onClick={showLoginModal}
        />
      )}
    </Stack>
  );
}
