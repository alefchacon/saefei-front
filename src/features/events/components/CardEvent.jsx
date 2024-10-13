import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { User } from "../../auth/domain/user";
import CardReservation from "../../reservations/components/CardReservation";
import ChipCustom from "../../../components/Chip";
import { Program } from "../../reservations/domain/program";
import CardActionArea from "@mui/material/CardActionArea";
import CardHeader from "@mui/material/CardHeader";

export default function CardEvent({ event, disablePadding, className }) {
  return (
    <Stack
      className={`card ${className}`}
      sx={{ padding: disablePadding ? "" : "20px" }}
    >
      <Typography gutterBottom variant="h5" component="div">
        {event?.name}
      </Typography>
      <br />
      <Stack gap={"5px"}>
        <Typography>{new User(event?.user).fullname}</Typography>
        {event?.reservations.map((reservation, index) => (
          <CardReservation
            row
            reservation={reservation}
            key={index}
          ></CardReservation>
        ))}
        <Stack gap={"3px"} direction={"row"} flexWrap={"wrap"}>
          {event?.programs.map((program, index) => (
            <ChipCustom
              title={program.name}
              label={new Program(program).initials}
            ></ChipCustom>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
}
