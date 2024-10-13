import Stack from "@mui/material/Stack";
import Header from "./Header";
import Slide from "@mui/material/Slide";
import { useLoading } from "./providers/LoadingProvider";
import Fade from "@mui/material/Fade";
import { useNavigate, useLocation } from "react-router-dom";

import { useState, useEffect, useRef, useCallback } from "react";
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
  onBottomReached,
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
    disablePadding ? { md: "0px 40px", sx: "0" } : "";

  const divRef = useRef(null);

  const handleScroll = useCallback(async () => {
    const { scrollTop, scrollHeight, clientHeight } = divRef.current;

    // I have to subtract 1 from scrollHeight because otherwise it won't work
    // I've no idea why :(
    const userReachedBottom = scrollTop + clientHeight >= scrollHeight - 1;
    if (userReachedBottom && onBottomReached) {
      onBottomReached();
    }
  });

  useEffect(() => {
    const divElement = divRef?.current;
    divElement?.addEventListener("scroll", handleScroll);

    return () => {
      divElement?.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <Stack
      id="page"
      className={`page ${className}`}
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
          ref={divRef}
          id={"content"}
          className={`body ${disablePadding ? "" : "side-padding top-padding"}`}
          padding={conditionalPadding}
        >
          {currentSection}
        </Stack>
      )}
    </Stack>
  );
}
