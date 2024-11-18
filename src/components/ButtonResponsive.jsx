import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useLoading } from "./providers/LoadingProvider";
import useIsMobile from "./hooks/useIsMobile";
export default function ButtonResponsive({
  children,
  variant = "contained",
  isLoading = null,
  onClick,
  type = "button",
  responsive = true,
  fixed,
}) {
  const isMobile = useIsMobile();
  const { loading } = useLoading();

  const configuration =
    isMobile && responsive
      ? {
          position: "fixed !important",
          top: 15,
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
      disabled={isLoading || loading}
      sx={configuration}
    >
      {children}
      {loading && <CircularProgress size={"20px"} />}
    </Button>
  );
}
