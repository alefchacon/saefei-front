import Stack from "@mui/material/Stack";
import Header from "./Header";
import Slide from "@mui/material/Slide";
import { useLoading } from "./providers/LoadingProvider";
import Fade from "@mui/material/Fade";
import { useNavigate, useLocation } from "react-router-dom";
import * as SCROLL_DIRECTIONS from "../stores/scrollDirections";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import {
  useState,
  useEffect,
  useRef,
  useCallback,
  createContext,
  useContext,
} from "react";
import LinearProgress from "@mui/material/LinearProgress";
import usePageControl from "./hooks/usePageControl";
import { usePage } from "./providers/PageProvider";

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
    disablePadding ? { md: "10px 40px", sx: "0" } : "";

  const { pageRef } = usePage();

  const handleScroll = useCallback(async () => {
    const { scrollTop, scrollHeight, clientHeight } = pageRef.current;

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
    const divElement = pageRef?.current;
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
      {!disableLoading && (
        <Stack position={"relative"}>
          <LoadingBar></LoadingBar>
        </Stack>
      )}
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
          <Stack
            ref={pageRef}
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
