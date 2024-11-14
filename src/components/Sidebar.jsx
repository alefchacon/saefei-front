import { useState, useLayoutEffect } from "react";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DomainIcon from "@mui/icons-material/Domain";
import SearchIcon from "@mui/icons-material/Search";
import AddAlertIcon from "@mui/icons-material/AddAlert";
import SchoolIcon from "@mui/icons-material/School";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import { styled } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import * as ROUTES from "../stores/ROUTES";
import MenuIcon from "@mui/icons-material/Menu";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import LoginIcon from "@mui/icons-material/Login";
import LogInForm from "../features/auth/components/LogInForm";
import useAuth from "../features/auth/businessLogic/useAuth";
import Logo from "../components/Logo";
import ChipCustom from "./Chip";
import { useModal } from "./providers/ModalProvider";

export default function Sidebar({ noticeAmount }) {
  const [selectedIndex, setSelectedIndex] = useState(1);
  const { openModal, closeModal } = useModal();
  const user = useAuth().getUser();

  const location = useLocation();
  const navigate = useNavigate();

  const handleListItemClick = (event, index, route) => {
    setSelectedIndex(index);
    navigate(route);
  };

  const CustomListItemButton = styled(ListItemButton)(({ theme }) => ({
    borderRadius: "0px",
    display: "flex",
    color: "inherit",
    "&.Mui-selected": {
      backgroundColor: "var(--blue2)",
      boxShadow: "0 0 2px 0px rgba(0,0,0,0.5)",
    },
    padding: "8px 24px",
  }));

  const showLoginModal = () => {
    openModal("Entrar", <LogInForm onLogin={handleLogin} />, "", true);
  };

  const handleLogin = () => {
    closeModal();
  };

  const toggleGrow = () => setGrown(!grown);
  const [grown, setGrown] = useState(true);

  function AuthOptions() {
    if (!user) {
      return (
        <CustomListItemButton onClick={showLoginModal}>
          <ListItemIcon sx={{ color: "inherit" }}>
            <LoginIcon></LoginIcon>
          </ListItemIcon>
          <ListItemText primary="Entrar" />
        </CustomListItemButton>
      );
    }

    return (
      <>
        <CustomListItemButton className="asdf" onClick={showLoginModal}>
          <ListItemIcon sx={{ color: "inherit" }}>
            <LoginIcon></LoginIcon>
          </ListItemIcon>
          <Stack className={grown ? "appear" : "disappear"}>
            <b>{user.fullname}</b>
            <ChipCustom label={user.job} color={"white"}></ChipCustom>
          </Stack>
        </CustomListItemButton>

        <CustomListItemButton
          selected={location.pathname.includes(ROUTES.ROUTE_INBOX)}
          onClick={(event) => handleListItemClick(event, 0, ROUTES.ROUTE_INBOX)}
        >
          <ListItemIcon sx={{ color: "inherit" }}>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Bandeja" />
          {grown && <Badge badgeContent={noticeAmount} color="error"></Badge>}
        </CustomListItemButton>
        <CustomListItemButton
          selected={location.pathname.includes(ROUTES.ROUTE_MY_EVENTS)}
          onClick={(event) =>
            handleListItemClick(event, 1, ROUTES.ROUTE_MY_EVENTS)
          }
        >
          <ListItemIcon sx={{ color: "inherit" }}>
            <FolderSharedIcon></FolderSharedIcon>
          </ListItemIcon>
          <ListItemText primary="Mis eventos" />
        </CustomListItemButton>
      </>
    );
  }

  return (
    <>
      <Stack
        id="sidebar"
        sx={{
          backgroundColor: "var(--blue)",
          overflow: "hidden",
          color: "white",
          flex: 1,
        }}
        className={grown ? `grow` : "shrink"}
        display={{ xs: "none", md: "flex" }}
        padding={"10px 0px 50px 0px"}
      >
        <br />
        <Stack direction={"row"} alignItems={"start"} gap={2}>
          <IconButton
            sx={{
              color: "inherit",
              width: "fit-content",
              padding: "0 0 0 24px",
            }}
            onClick={toggleGrow}
          >
            <MenuIcon></MenuIcon>
          </IconButton>
          {grown && <Logo className={grown ? "appear" : "disappear"}></Logo>}
        </Stack>
        <br />
        <List component="nav" aria-label="main mailbox folders">
          <AuthOptions></AuthOptions>
        </List>
        <Divider sx={{ backgroundColor: "rgba(255,255,255,0.3)" }} />
        <List component="nav" aria-label="secondary mailbox folder">
          <CustomListItemButton
            selected={location.pathname.includes(ROUTES.ROUTE_SEARCH_EVENTS)}
            onClick={(event) =>
              handleListItemClick(event, 2, ROUTES.ROUTE_SEARCH_EVENTS)
            }
          >
            <ListItemIcon sx={{ color: "inherit" }}>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText primary="Buscar eventos" />
          </CustomListItemButton>
          <CustomListItemButton
            selected={location.pathname.includes(ROUTES.ROUTE_CALENDAR_EVENTS)}
            onClick={(event) =>
              handleListItemClick(event, 3, ROUTES.ROUTE_CALENDAR_EVENTS)
            }
          >
            <ListItemIcon sx={{ color: "inherit" }}>
              <CalendarMonthIcon />
            </ListItemIcon>
            <ListItemText primary="Calendario de eventos" />
          </CustomListItemButton>
          <CustomListItemButton
            selected={location.pathname.includes(
              ROUTES.ROUTE_CALENDAR_RESERVATIONS
            )}
            onClick={(event) =>
              handleListItemClick(event, 4, ROUTES.ROUTE_CALENDAR_RESERVATIONS)
            }
          >
            <ListItemIcon sx={{ color: "inherit" }}>
              <DomainIcon />
            </ListItemIcon>

            <ListItemText primary="Reservaciones de espacios" />
          </CustomListItemButton>
          <CustomListItemButton
            selected={location.pathname.includes(ROUTES.ROUTE_NOTIFY)}
            onClick={(event) =>
              handleListItemClick(event, 5, `${ROUTES.ROUTE_NOTIFY}?paso=0`)
            }
          >
            <ListItemIcon sx={{ color: "inherit" }}>
              <AddAlertIcon />
            </ListItemIcon>
            <ListItemText primary="Notificar evento" />
          </CustomListItemButton>
        </List>
      </Stack>
    </>
  );
}
