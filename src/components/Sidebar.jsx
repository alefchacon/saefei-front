import { useState } from "react";

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

import Badge from "@mui/material/Badge";

export default function Sidebar() {
  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const CustomListItemButton = styled(ListItemButton)(({ theme }) => ({
    borderRadius: "10px",

    "&.Mui-selected": {
      backgroundColor: "white",
      color: "var(--blue)",
      boxShadow: "0 0 2px 0px rgba(0,0,0,0.2)",
    },
  }));

  return (
    <Stack
      id="sidebar"
      sx={{
        backgroundColor: "transparent",
        maxWidth: "20vw",
        color: "var(--dark)",
        flex: 1,
      }}
      display={{ xs: "none", md: "flex" }}
      padding={"50px 20px"}
      borderRadius={"0 10px 10px 0"}
    >
      <Typography
        style={{ fontWeight: 800, fontSize: 35 }}
        alignItems={"center"}
        display={"flex"}
        gap={2}
      >
        <SchoolIcon fontSize="50" /> SAEFEI
      </Typography>
      <Typography variant="caption" sx={{ opacity: 0.5 }}>
        Sistema de Administración de Eventos de la Facultad de Estadística e
        Informática
      </Typography>
      <br />
      <List component="nav" aria-label="main mailbox folders">
        <Stack id="user" sx={{ opacity: 0.8 }}>
          <Typography>Alejandro Chacón Fernández</Typography>
          <Typography
            fontFamily={"roboto condensed"}
            fontWeight={500}
            sx={{ textTransform: "uppercase" }}
          >
            Desarrollador
          </Typography>
        </Stack>
        <CustomListItemButton
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}
        >
          <ListItemIcon sx={{ color: "inherit" }}>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Bandeja" />
          <Badge badgeContent={12} color="error"></Badge>
        </CustomListItemButton>
        <CustomListItemButton
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
        >
          <ListItemIcon sx={{ color: "inherit" }}>
            <FolderSharedIcon></FolderSharedIcon>
          </ListItemIcon>
          <ListItemText primary="Mis eventos" />
        </CustomListItemButton>
      </List>
      <Divider />
      <List component="nav" aria-label="secondary mailbox folder">
        <CustomListItemButton
          selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 2)}
        >
          <ListItemIcon sx={{ color: "inherit" }}>
            <SearchIcon />
          </ListItemIcon>
          <ListItemText primary="Buscar eventos" />
        </CustomListItemButton>
        <CustomListItemButton
          selected={selectedIndex === 3}
          onClick={(event) => handleListItemClick(event, 3)}
        >
          <ListItemIcon sx={{ color: "inherit" }}>
            <CalendarMonthIcon />
          </ListItemIcon>
          <ListItemText primary="Calendario de eventos" />
        </CustomListItemButton>
        <CustomListItemButton
          selected={selectedIndex === 4}
          onClick={(event) => handleListItemClick(event, 4)}
        >
          <ListItemIcon sx={{ color: "inherit" }}>
            <DomainIcon />
          </ListItemIcon>
          <ListItemText primary="Reservaciones de espacios" />
        </CustomListItemButton>
        <CustomListItemButton
          selected={selectedIndex === 5}
          onClick={(event) => handleListItemClick(event, 5)}
        >
          <ListItemIcon sx={{ color: "inherit" }}>
            <AddAlertIcon />
          </ListItemIcon>
          <ListItemText primary="Notificar evento" />
        </CustomListItemButton>
      </List>
    </Stack>
  );
}
