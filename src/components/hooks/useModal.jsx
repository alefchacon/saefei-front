// useModal.js
import { useState, useCallback } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const useModal = () => {
  const theme = useTheme();
  const screenIsTiny = useMediaQuery(theme.breakpoints.down("md"));
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState(null);
  const [title, setTitle] = useState(null);
  const [actions, setActions] = useState(null);
  const [noBackdrop, setNoBackdrop] = useState(true);
  const [isResponsive, setIsResponsive] = useState(false);
  const [minWidth, setMinWidth] = useState("200px");

  const openModal = (
    title,
    content,
    actions,
    responsive,
    minWidth = "200px",
    noBackdrop = false
  ) => {
    setTitle(title);
    setContent(content);
    setActions(actions);
    setIsOpen(true);
    setIsResponsive(responsive);
    setMinWidth(minWidth);
    setNoBackdrop(noBackdrop);
  };

  const closeModal = () => {
    setIsOpen(false);
    setContent(null);
  };

  const Modal = () => {
    if (!isOpen) {
      return null;
    }

    const goFullscreen = isResponsive && screenIsTiny;

    function MobileTitle({ children }) {
      return (
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Stack direction={"row"} gap={3} alignItems={"center"}>
            <IconButton onClick={closeModal}>
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

          <IconButton onClick={closeModal}>
            <CloseIcon></CloseIcon>
          </IconButton>
        </Stack>
      );
    }

    return (
      <>
        <Dialog
          open={isOpen}
          fullScreen={goFullscreen}
          fullWidth
          maxWidth={"md"}
          slotProps={{
            backdrop: {
              style: { backgroundColor: noBackdrop ? "transparent" : "" },
            },
          }}
          //BackdropProps={{ style: { backgroundColor: "transparent" } }} // Disable background

          //sx={{ "& .MuiDialog-paper": { height: "500px" } }} // Customize height here
        >
          <DialogTitle>
            {goFullscreen ? (
              <MobileTitle>{title}</MobileTitle>
            ) : (
              <DesktopTitle>{title}</DesktopTitle>
            )}
          </DialogTitle>
          <DialogContent>{content}</DialogContent>
          {!goFullscreen && <DialogActions>{actions}</DialogActions>}
        </Dialog>
      </>
    );
  };

  return { openModal, closeModal, Modal };
};
