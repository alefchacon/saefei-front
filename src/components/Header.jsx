import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Stack from "@mui/material/Stack";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LinearProgress from "@mui/material/LinearProgress";
import { useLocation } from "react-router-dom";
import { useLoading } from "./providers/LoadingProvider";

export default function Header({
  title = "",
  description = "",
  children,
  disablePadding = false,
  disableLoading = false,
  sectionedPage = false,
  onGoBack,
  onSectionChange,
  scrolled = true,
}) {
  const location = useLocation();
  const { loading } = useLoading();
  const canGoBack =
    location.pathname.split("/").length > 2 || Boolean(onGoBack);

  const conditionalPadding = disablePadding ? "base-padding" : `side-padding`;
  const scrollState = scrolled ? "shadow" : ``;

  return (
    <>
      <Stack
        id="header"
        role="header"
        display={"flex"}
        flexDirection={"column"}
        zIndex={5}
        className={`${conditionalPadding} ${scrollState}`}
        justifyContent={"space-between"}
        paddingTop={{ md: "2rem", xs: "0.5rem" }}
        paddingBottom={{ md: "10px", xs: "10px" }}
        borderBottom={{ xs: "1px solid var(--bg)", md: "none" }}
        position={"sticky"}
        top={"0"}
        bgcolor={"white"}
      >
        <Stack direction={"row"} gap={2} minWidth={"100%"}>
          {canGoBack && (
            <IconButton
              id="go-back-button"
              onClick={onGoBack}
              sx={{ maxHeight: "fit-content" }}
            >
              <ArrowBackIcon></ArrowBackIcon>
            </IconButton>
          )}
          <Stack direction={"column"} width={"100%"}>
            <Typography
              id="title"
              variant="h5"
              color="black"
              height={"100%"}
              alignItems={"center"}
              display={"flex"}
              fontSize={{ md: 28, xs: 20 }}
              width={"100%"}
            >
              {title}
            </Typography>
            {description && (
              <Typography id="description" variant="caption">
                {description}
              </Typography>
            )}
            {children}
          </Stack>
        </Stack>
      </Stack>
      {loading && !disableLoading ? (
        <LinearProgress sx={{ height: "5px" }}></LinearProgress>
      ) : (
        <Stack bgcolor={"transparent"} height={"5px"}></Stack>
      )}
    </>
  );
}
