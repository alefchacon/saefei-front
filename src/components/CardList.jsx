import Stack from "@mui/material/Stack";

export default function CardList({ children }) {
  return (
    <Stack gap={{ md: "10px", xs: "0" }} className="card-list">
      {children}
    </Stack>
  );
}
