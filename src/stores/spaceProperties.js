export const SPACE_COLORS = Object.freeze({
  1: {
    label: "auditorio",
    color: "var(--blue)",
    backgroundColor: "var(--selected)",
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

export const getSpaceColorBySpaceName = (spaceName = "Salón de cristal") => {
  return Object
    .values(SPACE_COLORS)
    .find(space => space.label === spaceName.toLowerCase());
}