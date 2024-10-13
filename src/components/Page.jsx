import Stack from "@mui/material/Stack";
import Header from "./Header";
import Slide from "@mui/material/Slide";
import { useLoading } from "./providers/LoadingProvider";
import Fade from "@mui/material/Fade";
import { useNavigate, useLocation } from "react-router-dom";

export default function Page({
  title,
  children,
  flex,
  header = true,
  activeSectionId = "principal",
  onSectionChange,
  className,
  skeleton,
  onGoBack,
  disablePadding = false,
  bgcolor = "white",
}) {
  const { loading } = useLoading();
  const navigate = useNavigate();
  const location = useLocation();

  const handleReturnToFirstSection = () => {
    onSectionChange("principal");
  };

  const currentSection = children.find(
    (child) => child.props.id === activeSectionId
  );

  const conditionalPadding = () =>
    disablePadding ? { md: "40px 40px", sx: "0" } : "";

  return (
    <Stack
      id="page"
      className={`page ${className}`}
      position={"relative"}
      flex={flex}
      bgcolor={bgcolor}
    >
      {header && (
        <Header
          disablePadding={disablePadding}
          onGoBack={onGoBack}
          onSectionChange={handleReturnToFirstSection}
          sectionedPage={activeSectionId !== "principal"}
          title={title ?? currentSection?.props.title}
        ></Header>
      )}
      {loading && skeleton ? (
        skeleton
      ) : (
        <Stack
          id={"content"}
          className={`body ${disablePadding ? "" : "side-padding"}`}
          padding={conditionalPadding}
          height={"100%"}
        >
          {currentSection}
        </Stack>
      )}
    </Stack>
  );
}
