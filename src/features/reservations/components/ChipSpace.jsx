import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";

const StyledChip = styled(Chip)({
  ".MuiChip-label": {
    textTransform: "uppercase",
    fontWeight: "600",
    fontFamily: "roboto condensed",
  },
});

const VARIANT_MAP = Object.freeze({
  1: {
    label: "auditorio",
    color: "var(--blue)",
    backgroundColor: "var(--bg)",
    value: 1,
  },
  2: {
    label: "audiovisual",
    color: "var(--green)",
    backgroundColor: "var(--light-green)",
    value: 2,
  },
  3: {
    label: "salón de cristal",
    color: "var(--yellow)",
    backgroundColor: "var(--light-yellow)",
    value: 3,
  },
  4: {
    label: "sala de maestros",
    color: "var(--purple)",
    backgroundColor: "var(--light-purple)",
    value: 4,
  },
  5: {
    label: "teatro al aire libre",
    color: "var(--gray)",
    backgroundColor: "var(--light-gray)",
    value: 5,
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
      label={VARIANT_MAP[space.id]?.label}
      sx={{
        width: "fit-content",
        color: VARIANT_MAP[space.id]?.color,
        backgroundColor: VARIANT_MAP[space.id]?.backgroundColor,
      }}
      value={VARIANT_MAP[space.id]?.value}
    ></StyledChip>
  );
}
