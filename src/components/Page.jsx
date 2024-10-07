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
  activeSectionId = "pricipal",
  onSectionChange,
  className,
  skeleton,
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

  return (
    <Stack
      id="page"
      className={`page ${className}`}
      position={"relative"}
      flex={flex}
    >
      {header && (
        <Header
          onSectionChange={handleReturnToFirstSection}
          sectionedPage={activeSectionId !== "principal"}
          title={title ?? currentSection?.props.title}
        ></Header>
      )}
      {loading && skeleton ? (
        skeleton
      ) : (
        <Stack id={"content"} className="body side-padding" height={"100%"}>
          {currentSection}
        </Stack>
      )}
    </Stack>
  );
}
