import { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from "moment";

export default function CardActivity({
  time = moment(),
  name = "Activity name",
}) {
  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Stack direction={"row"} gap={3}>
        <Typography>
          <b>{time.format("HH:mm")}</b>
        </Typography>
        <Typography>{name}</Typography>
      </Stack>

      <Stack direction={"row"}>
        <Tooltip title="Editar actividad" placement="top-start">
          <IconButton color="primary">
            <EditIcon></EditIcon>
          </IconButton>
        </Tooltip>
        <Tooltip title="Eliminar actividad" placement="top-start">
          <IconButton color="primary">
            <DeleteIcon></DeleteIcon>
          </IconButton>
        </Tooltip>
      </Stack>
    </Stack>
  );
}
