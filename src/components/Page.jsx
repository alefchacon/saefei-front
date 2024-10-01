import Stack from "@mui/material/Stack";
import Header from "./Header";

export default function Page({ title, children, flex, header = true }) {
  return (
    <Stack id="page" className="page" position={"relative"} flex={flex}>
      {header && <Header title={title}></Header>}
      <Stack id={"content"} className="body side-padding" height={"100%"}>
        {children}
      </Stack>
    </Stack>
  );
}
