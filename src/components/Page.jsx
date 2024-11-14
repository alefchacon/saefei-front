import Stack from "@mui/material/Stack";
import Header from "./Header";
import Slide from "@mui/material/Slide";
import { useLoading } from "./providers/LoadingProvider";
import Fade from "@mui/material/Fade";
import { useNavigate, useLocation } from "react-router-dom";
import * as SCROLL_DIRECTIONS from "../stores/SCROLL_DIRECTIONS";
import Divider from "@mui/material/Divider";
import { useState, useEffect, useRef, useCallback } from "react";
import LinearProgress from "@mui/material/LinearProgress";

export default function Page({
  title,
  children,
  flex,
  header = true,
  className,
  skeleton,
  onGoBack,
  disablePadding = false,
  bgcolor = "white",
  onBottomReached,
  disableLoading,
  onScroll,
  onScrollUp,
  onScrollDown,
  disableDivider,
  showHeader = true,
}) {
  const { loading } = useLoading();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const conditionalPadding = () =>
    disablePadding ? { md: "0px 40px", sx: "0" } : "";

  const divRef = useRef(null);

  const handleScroll = useCallback(async () => {
    const { scrollTop, scrollHeight, clientHeight } = divRef.current;

    const userScrolledAtAll = scrollTop !== 0;
    setScrolled(userScrolledAtAll);

    const currentScrollPosition = scrollTop + clientHeight;

    let scrollDirection = SCROLL_DIRECTIONS.SCROLL_DOWN;
    if (currentScrollPosition < scrollPosition) {
      scrollDirection = SCROLL_DIRECTIONS.SCROLL_UP;
    }
    setScrollPosition(currentScrollPosition);
    if (onScroll) {
      onScroll(scrollDirection);
    }

    // I have to subtract 1 from scrollHeight because otherwise it won't work
    // I've no idea why :(
    const userReachedBottom = currentScrollPosition >= scrollHeight - 1;
    if (userReachedBottom && onBottomReached) {
      onBottomReached();
    }
  });

  function LoadingBar() {
    return (
      <Stack
        sx={{
          position: "absolute",
          top: 0,
          zIndex: 100,
          width: "100%",
        }}
      >
        <LinearProgress
          className={`${loading ? "show" : "hide"}`}
        ></LinearProgress>
      </Stack>
    );
  }

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
      bgcolor={"transparent"}
    >
      {header && showHeader && (
        <Stack>
          <Header
            disableLoading={disableLoading}
            disablePadding={disablePadding}
            onGoBack={onGoBack}
            title={title}
            scrolled={scrolled}
          ></Header>
        </Stack>
      )}
      {loading && skeleton ? (
        skeleton
      ) : (
        <>
          <Stack position={"relative"}>
            <LoadingBar></LoadingBar>
          </Stack>
          <Stack
            ref={divRef}
            id={"content"}
            className={`body ${
              disablePadding ? "" : "side-padding top-padding"
            }`}
            padding={conditionalPadding}
            position={"relative"}
          >
            {children}
          </Stack>
        </>
      )}
    </Stack>
  );
}
