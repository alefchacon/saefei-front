import ChipCustom from "../../../components/Chip";
import moment from "moment";

export default function ChipReservation({
  existingReservation = { start: moment(), end: moment() },
}) {
  const schedule = `${moment(existingReservation.start, "HH:mm").format(
    "HH:mm"
  )} - ${moment(existingReservation.end, "HH:mm").format("HH:mm")}`;

  return (
    <ChipCustom
      color={existingReservation.overlaps ? "error" : ""}
      label={schedule}
    />
  );
}
