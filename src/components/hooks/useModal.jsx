// useModal.js
import { useState, useCallback } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export const useModal = () => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState(null);
  const [title, setTitle] = useState(null);
  const [actions, setActions] = useState(null);
  const [isResponsive, setIsResponsive] = useState(false);

  const openModal = useCallback((title, content, actions, responsive) => {
    setTitle(title);
    setContent(content);
    setActions(actions);
    setIsOpen(true);
    setIsResponsive(responsive);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setContent(null);
  }, []);

  const Modal = useCallback(() => {
    if (!isOpen) {
      return null;
    }
    return (
      <>
        <Dialog open={isOpen} fullScreen={isResponsive && fullScreen}>
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>{content}</DialogContent>
          <DialogActions>{actions}</DialogActions>
        </Dialog>
      </>
    );
  });

  return { openModal, closeModal, Modal };
};
