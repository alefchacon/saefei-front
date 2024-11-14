import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ChipSpace from "../features/reservations/components/ChipSpace";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";
import { getScheduleString } from "../util/moments";

export default function CardCalendarEvent({ event }) {
  return (
    <>
      <ListItemButton
        disableGutters
        sx={{ display: "flex", flexDirection: "column", alignItems: "start" }}
      >
        <Stack direction={"row"} gap={"20px"} padding={"10px 10px 10px 20px"}>
          <Typography width={"100px"}>{getScheduleString(event)}</Typography>
          <Stack flex={2}>
            <Typography>{event?.name}</Typography>
            <ChipSpace space={event?.space}></ChipSpace>
          </Stack>
        </Stack>
      </ListItemButton>
      <Divider></Divider>
    </>
  );
}
