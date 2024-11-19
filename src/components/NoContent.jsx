import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function NoContent({ label = "Todo bien" }) {
  return (
    <Stack alignItems={"center"} overflow={"hidden"} flexWrap={"wrap"}>
      <CheckCircleOutlineIcon sx={{ fontSize: "6rem" }} />
      <Typography
        variant="h5"
        width={"40%"}
        sx={{ overflowWrap: "break-word" }}
        textAlign={"center"}
      >
        {label}
      </Typography>
    </Stack>
  );
}
