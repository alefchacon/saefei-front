import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import moment from "moment";

export default function DayViewWrapper({
  forEvents = true,
  selectedDate = moment(),
  children,
}) {
  const modelName = forEvents ? "Eventos" : "Reservaciones";

  return (
    <Stack
      id="calendar-list"
      position={"relative"}
      flex={0.8}
      padding={"0 10px"}
    >
      <Stack padding={"10px 0"}>
        <Typography>{modelName} del</Typography>
        <Typography variant="h5" color={"black"} fontSize={{ md: 26, xs: 20 }}>
          {selectedDate.format("D [de] MMMM [de] YYYY")}{" "}
        </Typography>
      </Stack>
      {children}
    </Stack>
  );
}
