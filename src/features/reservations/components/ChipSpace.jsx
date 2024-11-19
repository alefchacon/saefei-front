import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";
import { SPACE_COLORS } from "../../../stores/spaceProperties";
const StyledChip = styled(Chip)({
  ".MuiChip-label": {
    textTransform: "uppercase",
    fontWeight: "600",
    fontFamily: "roboto condensed",
  },
});

export default function ChipSpace({
  space = {
    id: 0,
    name: "",
    capacity: 0,
  },
  variant = 1,
  size = "medium",
}) {
  return (
    <StyledChip
      size={size}
      label={SPACE_COLORS[space.id]?.label}
      sx={{
        width: "150px",
        color: SPACE_COLORS[space.id]?.color,
        backgroundColor: SPACE_COLORS[space.id]?.backgroundColor,
      }}
      value={SPACE_COLORS[space.id]?.value}
    ></StyledChip>
  );
}
