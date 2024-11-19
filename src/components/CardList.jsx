import Stack from "@mui/material/Stack";

export default function CardList({ children }) {
  return (
    <Stack
      gap={{ md: "10px", xs: "5px" }}
      padding={{ md: "0 0", xs: "0 5px" }}
      className="card-list"
    >
      {children}
    </Stack>
  );
}
