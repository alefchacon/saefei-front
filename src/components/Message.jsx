import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Page from "./Page";

export default function Message({ title, content, children, center = false }) {
  return (
    <Page>
      <Stack
        height={"100%"}
        justifyContent={"center"}
        alignItems={center ? "center" : ""}
      >
        <Typography variant="h4">{title}</Typography>
        <br />
        <Typography textAlign={center ? "center" : "left"}>
          {content}
        </Typography>
        <br />
        <br />
        {children}
      </Stack>
    </Page>
  );
}
