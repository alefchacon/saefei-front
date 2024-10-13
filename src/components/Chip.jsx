import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import { useSnackbar } from "./providers/SnackbarProvider";

export default function ChipCustom({
  label,
  color,
  size = "small",
  display,
  onClick,
  title,
}) {
  const { openSnackbar } = useSnackbar();

  const handleSnackbar = () => {
    openSnackbar(title);
  };

  return (
    <Tooltip title={title} placement="top">
      <Chip
        color={color}
        label={label}
        onClick={onClick || handleSnackbar}
        sx={{
          maxWidth: "fit-content",
          fontFamily: "roboto condensed",
          display: display,
          fontWeight: 500,
          color: color,
        }}
        size={size}
      />
    </Tooltip>
  );
}
