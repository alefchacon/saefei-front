import { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ChipCustom from "../../../components/Chip";
import Header from "../../../components/Header";

import { useEvents } from "../../events/businessLogic/useEvents";
import ReplyIcon from "@mui/icons-material/Reply";
import { useParams } from "react-router-dom";
import ChipSpace from "./ChipSpace";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CampaignIcon from "@mui/icons-material/Campaign";
import moment from "moment";
import { getScheduleString } from "../../../util/moments";
export default function CardReservation({
  reservation,
  activitySchedule = true,
}) {
  return (
    <Stack gap={1} direction={"column"}>
      <ChipSpace space={reservation.space}></ChipSpace>
      <Stack direction={"row"} gap={5}>
        <Stack direction={"row"} gap={1}>
          <EventIcon></EventIcon>
          <Typography>
            {moment(reservation.date).format("DD/MM/YYYY")}
          </Typography>
        </Stack>
        <Stack direction={"row"} gap={1}>
          <AccessTimeIcon></AccessTimeIcon>
          <Typography>
            {activitySchedule ? "WIP" : getScheduleString(reservation)}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}
