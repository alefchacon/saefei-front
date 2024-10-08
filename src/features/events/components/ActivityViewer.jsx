import { useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import { useModal } from "../../../components/hooks/useModal";
import ExpandableArea from "../../../components/ExpandableArea";
import AccordionCustom from "../../../components/Accordion";
import CardReservation from "../../reservations/components/CardReservation";
export default function ActivityViewer({
  name = "",
  expanded = false,
  maxLines = 2,
  reservations,
  children,
}) {
  const { Modal, closeModal, openModal } = useModal();

  const [isExpanded, setIsExpanded] = useState(expanded);
  const ellipsis = `ellipsis line-clamp-${maxLines}`;

  const modalContent = (
    <>
      {reservations?.map((reservation, index) => (
        <AccordionCustom
          key={index}
          header={
            <CardReservation reservation={reservation} activitySchedule />
          }
        ></AccordionCustom>
      ))}
    </>
  );

  const showModal = () => {
    openModal(name, modalContent, "", true);
  };

  return (
    <>
      <ExpandableArea onClick={showModal}>
        {" "}
        <Stack gap={3}>
          {reservations?.map((reservation, index) => (
            <CardReservation
              key={index}
              reservation={reservation}
            ></CardReservation>
          ))}
        </Stack>
      </ExpandableArea>
      <Modal></Modal>
    </>
  );
}
