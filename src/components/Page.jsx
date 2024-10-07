import Stack from "@mui/material/Stack";
import Header from "./Header";
import Slide from "@mui/material/Slide";
import { useLoading } from "./providers/LoadingProvider";
import Fade from "@mui/material/Fade";
export default function Page({
  title,
  children,
  flex,
  header = true,
  activeSectionIndex = 0,
  onSectionChange,
  className,
  skeleton,
}) {
  const { loading } = useLoading();

  const handleReturnToFirstSection = () => {
    onSectionChange(0);
  };

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
          sectionedPage={activeSectionIndex > 0}
          title={title}
        ></Header>
      )}
      {loading && skeleton ? (
        skeleton
      ) : (
        <Stack id={"content"} className="body side-padding" height={"100%"}>
          {children[activeSectionIndex]}
        </Stack>
      )}
    </Stack>
  );
}
