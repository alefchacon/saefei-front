import Stack from "@mui/material/Stack";

export default function CardList({ children }) {
  return (
    <Stack gap={"10px"} className="card-list">
      {children}
    </Stack>
  );
}
