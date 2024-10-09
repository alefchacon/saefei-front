import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";

export default function ExpandableArea({ children, onClick }) {
  return (
    <CardActionArea onClick={onClick} position={"relative"}>
      {children}
      <Button variant="text" size="small">
        Ver más
      </Button>
    </CardActionArea>
  );
}
