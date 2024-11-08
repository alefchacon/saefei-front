import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import useIsMobile from "./hooks/useIsMobile";

export default function FabResponsive({
  label = "Label",
  variant = "circular",
  onClick,
}) {
  const isMobile = useIsMobile();

  return (
    <>
      {isMobile ? (
        <Fab
          variant={variant}
          color="primary"
          sx={{ position: "fixed", bottom: 50, right: 50 }}
          onClick={onClick}
        >
          <Typography>{label}</Typography>
        </Fab>
      ) : (
        ""
      )}
    </>
  );
}
