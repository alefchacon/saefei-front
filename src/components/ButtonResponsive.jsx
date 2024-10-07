import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export default function ButtonResponsive({
  children,
  variant = "contained",
  loading = false,
  onClick,
  type = "button",
}) {
  const theme = useTheme();
  const responsive = useMediaQuery(theme.breakpoints.down("md"));

  const config = responsive
    ? {
        position: "absolute !important",
        top: 10,
        right: 30,
        zIndex: 100,
        gap: 2,
      }
    : {
        gap: 2,
        maxWidth: "fit-content",
      };

  return (
    <Button
      disableElevation
      variant={variant}
      type={type}
      onClick={onClick}
      disabled={loading}
      sx={config}
    >
      {children}
      {loading && <CircularProgress size={"20px"} />}
    </Button>
  );
}
