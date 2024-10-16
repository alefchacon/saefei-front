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
import DomainIcon from "@mui/icons-material/Domain";
import Tooltip from "@mui/material/Tooltip";
import moment from "moment";
import SchoolIcon from "@mui/icons-material/School";
import { getScheduleString } from "../../../util/moments";
export default function CardReservation({
  reservation,
  activitySchedule = false,
  reservationSchedule = false,
  row = false,
}) {
  return (
    <Stack
      gap={1}
      direction={row ? "row" : "column"}
      alignItems={row ? "center" : "start"}
      flexWrap={"wrap"}
    >
      <ChipSpace space={reservation?.space}></ChipSpace>
      <Stack direction={row ? "row" : "column"} gap={1} flexWrap={"wrap"}>
        <Stack direction={"row"} gap={1}>
          <EventIcon></EventIcon>
          <Typography>
            {moment(reservation?.date).format("DD/MM/YYYY")}
          </Typography>
        </Stack>
        {reservationSchedule && (
          <Stack direction={"row"} gap={1}>
            <DomainIcon></DomainIcon>
            <Typography>Reservación:</Typography>
            <Typography>
              {getScheduleString({
                start: reservation.startEvent,
                end: reservation.endEvent,
              })}
            </Typography>
          </Stack>
        )}
        {activitySchedule && (
          <Stack direction={"row"} gap={1}>
            <SchoolIcon></SchoolIcon>
            <Typography>Evento:</Typography>
            <Typography>
              {getScheduleString({
                start: reservation.startEvent,
                end: reservation.endEvent,
              })}
            </Typography>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
}
