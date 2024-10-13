import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import CardActionArea from "@mui/material/CardActionArea";

export default function ExpandableArea({ children, onClick, expanded }) {
  return (
    <Stack position={"relative"} justifyContent={"start"} alignItems={"start"}>
      {children}
      <Button variant="text" size="small" onClick={onClick}>
        Ver {expanded ? "menos" : "más"}
      </Button>
    </Stack>
  );
}
