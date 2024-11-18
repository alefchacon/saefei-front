import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Stack from "@mui/material/Stack";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LinearProgress from "@mui/material/LinearProgress";
import { useLocation } from "react-router-dom";
import { useLoading } from "./providers/LoadingProvider";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
    if (onGoBack) {
      onGoBack();
    }
  };

  return (
    <>
      <Stack
        id="header"
        role="header"
        display={"flex"}
        flexDirection={"column"}
        zIndex={0}
        className={`${conditionalPadding}`}
        justifyContent={"space-between"}
        paddingTop={{ md: "2rem", xs: "16px" }}
        paddingBottom={{ md: "10px", xs: "16px" }}
        borderBottom={{ xs: "1px solid var(--bg)", md: "none" }}
        position={"sticky"}
        top={"0"}
        bgcolor={"transparent"}
      >
        <Stack direction={"row"} gap={2} minWidth={"100%"}>
          {canGoBack && (
            <IconButton
              id="go-back-button"
              onClick={handleGoBack}
              sx={{ maxHeight: "fit-content", padding: 0 }}
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
    </>
  );
}
