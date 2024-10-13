import { Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import SchoolIcon from "@mui/icons-material/School";

export default function Logo({ center = true, className }) {
  return (
    <Stack className={className} direction={"column"} alignItems={"start"}>
      <Typography
        style={{ fontWeight: 800, fontSize: 35 }}
        alignItems={"center"}
        display={"flex"}
        gap={2}
      >
        <SchoolIcon fontSize="50" /> SEAFEI
      </Typography>
      <Typography variant="caption" sx={{ opacity: 0.5 }} lineHeight={1.3}>
        Sistema de Eventos Académicos <br />
        de la Facultad de Estadística e Informática
      </Typography>
    </Stack>
  );
}
