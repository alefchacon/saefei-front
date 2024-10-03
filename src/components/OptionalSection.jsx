import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ListItemButton from "@mui/material/ListItemButton";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export default function OptionalSection({
  name = "Section name",
  description = "description",
  icon,
  onClick,
}) {
  return (
    <Stack
      sx={{
        padding: 3,
        borderRadius: 3,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 3,
      }}
    >
      <Stack direction={"row"} gap={4} alignItems={"center"}>
        {icon}
        <Stack>
          <Typography>
            <b>{name}</b>
          </Typography>
          <Typography>{description}</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}
