import Chip from "@mui/material/Chip";

export default function ChipCustom({
  label,
  color,
  size = "small",
  display,
  onClick,
}) {
  return (
    <Chip
      color={color}
      label={label}
      onClick={onClick}
      sx={{
        maxWidth: "fit-content",
        fontFamily: "roboto condensed",
        display: display,
      }}
      size={size}
    />
  );
}
