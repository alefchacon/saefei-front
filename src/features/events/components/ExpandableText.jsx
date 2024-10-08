import { useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import { useModal } from "../../../components/hooks/useModal";
import ExpandableArea from "../../../components/ExpandableArea";
export default function ExpandableText({
  name = "",
  expanded = false,
  maxLines = 2,
  children,
}) {
  const { Modal, closeModal, openModal } = useModal();

  const [isExpanded, setIsExpanded] = useState(expanded);
  const ellipsis = `ellipsis line-clamp-${maxLines}`;

  const showModal = () => {
    openModal(name, children, "", true);
  };

  return (
    <>
      <ExpandableArea onClick={showModal}>
        <p className={ellipsis} style={{ fontSize: "16px" }}>
          <b>{name}: </b>
          {children}
        </p>
      </ExpandableArea>
      <Modal></Modal>
    </>
  );
}
