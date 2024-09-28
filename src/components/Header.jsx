import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Stack from "@mui/material/Stack";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export default function Header({
  title = "Título",
  description = "",
  children,
}) {
  return (
    <>
      <Stack
        id="header"
        role="header"
        display={"flex"}
        flexDirection={"column"}
        zIndex={5}
        className={`side-padding`}
        justifyContent={"space-between"}
        paddingTop={{ md: "20px", xs: "10px" }}
        paddingBottom={{ md: "20px", xs: "10px" }}
        borderBottom={{ xs: "1px solid var(--bg)", md: "none" }}
      >
        <Stack
          sx={{ opacity: 0.7 }}
          direction={"row"}
          display={"flex"}
          alignItems={"center"}
          gap={2}
        >
          Reservaciones de espacios{" "}
          <ChevronRightIcon fontSize="50"></ChevronRightIcon> Reservar un
          espacio
        </Stack>
        <Stack direction={"row"} gap={2}>
          <IconButton
            id="go-back-button"
            sx={{
              position: { md: "absolute", xs: "relative" },
              left: { md: 20, xs: 0 },
            }}
          >
            <ArrowBackIcon></ArrowBackIcon>
          </IconButton>
          <Stack>
            <Typography
              id="title"
              variant="h5"
              color="black"
              height={"100%"}
              alignItems={"center"}
              display={"flex"}
              fontSize={{ md: 28, xs: 20 }}
            >
              {title}
            </Typography>
            {description && (
              <Typography id="description" variant="caption">
                {description}
              </Typography>
            )}
          </Stack>
        </Stack>
        {children}
      </Stack>
      <Divider></Divider>
    </>
  );
}
