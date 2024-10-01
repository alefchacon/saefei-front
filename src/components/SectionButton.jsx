import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ListItemButton from "@mui/material/ListItemButton";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export default function SectionButton({
  name = "Section name",
  description = "description",
  icon,
}) {
  return (
    <ListItemButton
      sx={{
        padding: 3,
        borderRadius: 3,
        bgcolor: "var(--bg)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 3,
        "&:hover": {
          backgroundColor: "#e6eafa",
        },
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
      <ChevronRightIcon></ChevronRightIcon>
    </ListItemButton>
  );
}