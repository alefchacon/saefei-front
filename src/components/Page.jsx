import Stack from "@mui/material/Stack";
import Header from "./Header";

export default function Page({ title, children, flex }) {
  return (
    <Stack id="page" className="page" position={"relative"} flex={flex}>
      <Header title={title}></Header>
      <Stack id={"content"} className="body side-padding" height={"100%"}>
        {children}
      </Stack>
    </Stack>
  );
}
