import { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from "moment";
import { getHHssString } from "../../../util/moments";
import ListItemButton from "@mui/material/ListItemButton";
import { ListItem } from "@mui/material";

export default function CardActivity({
  activity = { name: "activity", time: "12:00:00" },
  required,
  onDelete,
  onEdit,
  editable = true,
}) {
  const handleDeleteActivity = () => {
    onDelete(activity);
  };

  const handleEditActivity = () => {
    onEdit(activity);
  };

  return (
    <ListItemButton
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        cursor: "default",
      }}
      divider
    >
      <Stack direction={"row"} gap={3}>
        <Typography>
          <b>{getHHssString(activity.time)}</b>
        </Typography>
        <Typography>{activity.name}</Typography>
      </Stack>

      {editable && (
        <Stack direction={"row"}>
          <Tooltip title="Editar actividad" placement="top-start">
            <IconButton color="primary" onClick={handleEditActivity}>
              <EditIcon></EditIcon>
            </IconButton>
          </Tooltip>
          {!required && (
            <Tooltip title="Eliminar actividad" placement="top-start">
              <IconButton color="primary" onClick={handleDeleteActivity}>
                <DeleteIcon></DeleteIcon>
              </IconButton>
            </Tooltip>
          )}
        </Stack>
      )}
    </ListItemButton>
  );
}
