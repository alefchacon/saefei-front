import { useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import { useModal } from "../../../components/hooks/useModal";
import ExpandableArea from "../../../components/ExpandableArea";
import AccordionCustom from "../../../components/Accordion";
import CardReservation from "../../reservations/components/CardReservation";
import TabsCustom from "../../../components/Tabs";
import CardActivity from "./CardActivity";
export default function ActivityViewer({
  name = "",
  expanded = false,
  maxLines = 2,
  reservations,
  children,
  editable = false,
  forCoordinator,
}) {
  const { Modal, closeModal, openModal } = useModal();

  const [isExpanded, setIsExpanded] = useState(expanded);
  const ellipsis = `ellipsis line-clamp-${maxLines}`;

  const modalContent = (
    <TabsCustom>
      {reservations?.map((reservation, index) => (
        <Stack
          key={index}
          label={
            <CardReservation
              row
              reservation={reservation}
              activitySchedule={false}
            />
          }
        >
          {reservation.activities.map((activity, index) => (
            <CardActivity key={index} activity={activity} editable={editable} />
          ))}
        </Stack>
      ))}
    </TabsCustom>
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
              activitySchedule
              reservationSchedule={forCoordinator}
              simpleSchedule={!forCoordinator}
            ></CardReservation>
          ))}
        </Stack>
      </ExpandableArea>
      <Modal></Modal>
    </>
  );
}
