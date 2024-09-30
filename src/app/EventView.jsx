import { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";

import { useEvents } from "../features/events/businessLogic/useEvents";

import { useParams } from "react-router-dom";

export default function EventView() {
  const [event, setEvent] = useState({});
  const { getEvent } = useEvents();
  const { idEvento } = useParams();
  useEffect(() => {
    getEvent(idEvento).then((response) => setEvent(response.data.data));
  }, []);

  const fetchEvent = async () => {};

  return (
    <Stack direction={"row"} gap={2} height={"fit-content"}>
      <CardEvent event={event}></CardEvent>
    </Stack>
  );
}

function CardEvent({ event }) {
  return (
    <Stack height={"fit-content"} className="page">
      <CardActionArea>
        <Stack elevation={0} className="" padding={2}>
          <Typography variant="h5">General</Typography>
          <br />
          <Typography variant="paragraph" fontSize={16}>
            <b>Descripción:</b> {event.description}
          </Typography>
        </Stack>
      </CardActionArea>
      <CardActions sx={{ height: "fit-content", bgcolor: "white" }}>
        <Button>Editar</Button>
      </CardActions>
    </Stack>
  );
}
