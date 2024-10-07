import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ListItemButton from "@mui/material/ListItemButton";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChipCustom from "./Chip";

export default function SectionButton({
  name = "Section name",
  description = "description",
  icon,
  onClick,
  configured = false,
}) {
  return (
    <ListItemButton
      onClick={onClick}
      sx={{
        padding: 3,
        borderRadius: 3,
        bgcolor: "var(--bg)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 3,
        "&:hover": {
          backgroundColor: "var(--bg-hover)",
        },
      }}
    >
      <Stack direction={"row"} gap={4} alignItems={"center"}>
        {icon}
        <Stack>
          <Stack direction={"row"} alignContent={"center"} gap={1}>
            <Typography>
              <b>{name}</b>
            </Typography>
            {configured && (
              <ChipCustom
                color={"primary"}
                size="small"
                label={"Configurado"}
              ></ChipCustom>
            )}
          </Stack>
          <Typography>{description}</Typography>
        </Stack>
      </Stack>
      <ChevronRightIcon></ChevronRightIcon>
    </ListItemButton>
  );
}
