import { useState } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ChipSpace from "./ChipSpace";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import Collapse from "@mui/material/Collapse";
import ChipReservation from "./ChipReservation";
import ListItemButton from "@mui/material/ListItemButton";
export default function ReservationGroup({ space = {}, reservations = [] }) {
  const [show, setShow] = useState(true);
  const toggleShow = () => setShow(!show);

  const sx = {
    direction: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
  };

  const relevantReservations = reservations.filter(
    (item) => item.space.id === space.id
  );

  return (
    <Stack>
      <ListItemButton
        sx={sx}
        onClick={toggleShow}
        disableRipple={relevantReservations.length < 1}
      >
        <ChipSpace space={space} />{" "}
        {relevantReservations.length > 0 && (
          <ExpandCircleDownIcon></ExpandCircleDownIcon>
        )}
      </ListItemButton>
      <Divider></Divider>
      <Stack padding={1}>
        {relevantReservations.length === 0 ? (
          <Typography textAlign={"center"} sx={{ opacity: 0.5 }}>
            Nadie ha reservado este espacio
          </Typography>
        ) : (
          <Collapse in={show}>
            <Stack gap={1} padding={"0 20px"}>
              {relevantReservations.map((reservation, index) => (
                <ChipReservation
                  existingReservation={reservation}
                  key={index}
                />
              ))}
            </Stack>
          </Collapse>
        )}
      </Stack>
    </Stack>
  );
}
