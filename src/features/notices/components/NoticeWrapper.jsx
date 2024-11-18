import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import CardActionArea from "@mui/material/CardActionArea";

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
  onClick,
}) {
  return (
    <Stack
      className="notice-wrapper card shadow"
      padding={"10px"}
      direction={"column"}
      sx={{
        boxShadow: selected ? "10px 0 1px 0 var(--blue) inset" : "",
      }}
      maxWidth={"100%"}
    >
      <Stack direction={"row"}>
        <Stack minWidth={"50px"} alignItems={"center"}>
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
    </Stack>
  );
}
