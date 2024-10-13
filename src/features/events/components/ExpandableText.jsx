import { useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import { useModal } from "../../../components/hooks/useModal";
import ExpandableArea from "../../../components/ExpandableArea";
import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

export default function ExpandableText({
  name = "",
  modalTitle = "",
  expanded = false,
  maxLines = 2,
  children,
}) {
  const { Modal, closeModal, openModal } = useModal();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("md"));
  const [isExpanded, setIsExpanded] = useState(expanded);
  const ellipsis = `ellipsis line-clamp-${maxLines}`;

  const showModal = () => {
    openModal(name || modalTitle, children, "", true);
  };

  const asdf = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <ExpandableArea expanded={isExpanded} onClick={mobile ? showModal : asdf}>
        <Typography
          color="gray"
          className={isExpanded ? "" : ellipsis}
          style={{ fontSize: "16px" }}
        >
          {name && <b>{name}: </b>}
          {children}
        </Typography>
      </ExpandableArea>
      <Modal></Modal>
    </>
  );
}
