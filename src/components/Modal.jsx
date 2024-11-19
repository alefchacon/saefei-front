import "../app/App.css";

// useModal.js
import { useState, useCallback } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function Modal({
  title,
  children,
  actions,
  responsive,
  minWidth,
  noBackdrop = false,
  onClose,
  open,
}) {
  const theme = useTheme();
  const screenIsTiny = useMediaQuery(theme.breakpoints.down("md"));
  //const [isOpen, setIsOpen] = useState(open);
  if (!open) {
    return null;
  }

  const goFullscreen = responsive && screenIsTiny;

  function MobileTitle({ children }) {
    return (
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Stack direction={"row"} gap={3} alignItems={"center"}>
          <IconButton onClick={onClose}>
            <ArrowBackIcon></ArrowBackIcon>
          </IconButton>
          {children}
        </Stack>
        {actions}
      </Stack>
    );
  }
  function DesktopTitle({ children }) {
    return (
      <Stack direction={"row"} justifyContent={"space-between"}>
        {children}

        <IconButton onClick={onClose}>
          <CloseIcon></CloseIcon>
        </IconButton>
      </Stack>
    );
  }

  return (
    <>
      <Dialog
        open={open}
        fullScreen={goFullscreen}
        fullWidth
        maxWidth={"md"}
        slotProps={{
          backdrop: {
            style: { backgroundColor: noBackdrop ? "transparent" : "" },
          },
        }}
      >
        <DialogTitle>
          {goFullscreen ? (
            <MobileTitle>{title}</MobileTitle>
          ) : (
            <DesktopTitle>{title}</DesktopTitle>
          )}
        </DialogTitle>
        <DialogContent>{children}</DialogContent>
        {!goFullscreen && <DialogActions>{actions}</DialogActions>}
      </Dialog>
    </>
  );
}
