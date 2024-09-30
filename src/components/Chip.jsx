import Chip from "@mui/material/Chip";

export default function ChipCustom({ label, color, size = "small", display }) {
  return (
    <Chip
      color={color}
      label={label}
      sx={{
        maxWidth: "fit-content",
        fontFamily: "roboto condensed",
        display: display,
      }}
      size={size}
    />
  );
}
