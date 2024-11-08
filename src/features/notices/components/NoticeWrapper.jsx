import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import NewReleasesIcon from "@mui/icons-material/NewReleases";

const ICONS = {
  1: <NewReleasesIcon sx={{ color: "var(--green)" }} />,
};

export default function NoticeWrapper({
  children,
  noticeType,
  name,
  onReply,
  selected,
}) {
  return (
    <Stack
      className="card shadow"
      padding={"10px"}
      direction={"row"}
      bgcolor={selected ? "var(--selected)" : "transparent"}
    >
      <Stack flex={1} alignItems={"center"}>
        {ICONS[noticeType]}
      </Stack>
      <Stack flex={15}>
        <Typography>{name}</Typography>
        <br />
        <Divider></Divider>
        <br />
        {children}
        <Stack className="button-row">
          <Button onClick={onReply}>Responder</Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
