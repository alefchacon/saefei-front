import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import NewReleasesIcon from "@mui/icons-material/NewReleases";

const ICONS = {
  1: <NewReleasesIcon sx={{ color: "var(--green)" }} />,
  5: <NewReleasesIcon sx={{ color: "var(--green)" }} />,
};

export default function NoticeWrapper({
  children,
  noticeType,
  name,
  onReply,
  selected,
  replyButton,
}) {
  return (
    <Stack
      className="notice-wrapper card shadow"
      padding={"10px"}
      direction={"row"}
      bgcolor={selected ? "var(--selected)" : "transparent"}
      maxWidth={"100%"}
    >
      <Stack flex={1} alignItems={"center"}>
        {ICONS[noticeType]}
      </Stack>
      <Stack
        flex={15}
        flexWrap={"wrap"}
        maxWidth={"100%"}
        position={"relative"}
        gap={"10px"}
      >
        <Typography>{name}</Typography>

        <Divider></Divider>

        {children}
      </Stack>
    </Stack>
  );
}
