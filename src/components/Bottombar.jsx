import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function Bottombar() {
  const [value, setValue] = React.useState(0);

  return (
    <Box
      sx={{
        width: "100%",
        borderTop: "1px solid lightgray",
        position: "absolute",
        bottom: 0,
        bgcolor: "red !important",
      }}
      display={{ xs: "block", md: "none" }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Notificar" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Reservar" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Calendario" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Bandeja" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Yo" icon={<LocationOnIcon />} />
      </BottomNavigation>
    </Box>
  );
}
