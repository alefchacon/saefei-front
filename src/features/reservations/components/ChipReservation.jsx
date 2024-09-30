import Chip from "@mui/material/Chip";
import moment from "moment";

export default function ChipReservation({
  existingReservation = { start: moment(), end: moment() },
}) {
  const schedule = `${moment(existingReservation.start, "HH:mm").format(
    "HH:mm"
  )} - ${moment(existingReservation.end, "HH:mm").format("HH:mm")}`;

  return (
    <Chip
      color={existingReservation.overlaps ? "error" : ""}
      label={schedule}
      sx={{ maxWidth: "fit-content" }}
      size="small"
    />
  );
}
