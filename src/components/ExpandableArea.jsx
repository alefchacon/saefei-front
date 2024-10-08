import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";

export default function ExpandableArea({ children, onClick }) {
  return (
    <CardActionArea
      onClick={onClick}
      position={"relative"}
      sx={{ paddingBottom: "5px" }}
    >
      <Button
        variant="text"
        size="small"
        sx={{ position: "absolute", bottom: 0, right: 0 }}
      >
        Ver más
      </Button>

      {children}
    </CardActionArea>
  );
}
