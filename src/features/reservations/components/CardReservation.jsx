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
import PersonIcon from "@mui/icons-material/Person";
import ExpandableText from "../../events/components/ExpandableText";
import MessageIcon from "@mui/icons-material/Message";
export default function CardReservation({
  reservation,
  activitySchedule = false,
  reservationSchedule = false,
  row = false,
  motive,
  user,
  simpleSchedule,
}) {
  return (
    <Stack
      gap={1}
      direction={"column"}
      alignItems={"start"}
      justifyContent={"center"}
      flexWrap={"wrap"}
      maxWidth={"100%"}
    >
      <Stack
        direction={"column"}
        
        justifyContent={"center"}
        gap={"10px"}
      >
        <ChipSpace space={reservation?.space}></ChipSpace>
        <Stack
          direction={"row"}
          gap={"10px"}
          flexWrap={"wrap"}
          maxWidth={"100%"}
        >
          <Stack direction={"row"} gap={1} flexWrap={"wrap"} maxWidth={"100%"}>
            <EventIcon></EventIcon>
            <Typography>
              {moment(reservation?.date).format("DD/MM/YYYY")}
            </Typography>
          </Stack>
          {reservationSchedule && (
            <Stack direction={"row"} gap={1}>
              {simpleSchedule ? <AccessTimeIcon /> : <DomainIcon></DomainIcon>}
              {!simpleSchedule && <Typography>Reservación:</Typography>}
              <Typography>
                {getScheduleString({
                  start: reservation.start,
                  end: reservation.end,
                })}
              </Typography>
            </Stack>
          )}
          {activitySchedule && (
            <Stack direction={"row"} gap={1}>
              {simpleSchedule ? <AccessTimeIcon /> : <SchoolIcon></SchoolIcon>}
              {!simpleSchedule && <Typography>Evento:</Typography>}

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
      <Stack gap={"10px"} flexWrap={"wrap"} maxWidth={"100%"}>
        {user && (
          <Stack direction={"row"} gap={1} maxWidth={"100%"}>
            <PersonIcon></PersonIcon>
            <Stack direction={"column"}>
              <Typography>{reservation.user?.names}</Typography>
              <Typography variant="caption">
                {reservation.user?.email}
              </Typography>
            </Stack>
          </Stack>
        )}
        {motive && (
          <Stack direction={"row"} gap={1}>
            <MessageIcon></MessageIcon>
            <ExpandableText>{reservation?.motive}</ExpandableText>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
}
