import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import moment from "moment";
import CardCalendarEvent from "../../features/events/components/CardCalendarEvent";
import SPACES from "../../stores/spaces";
import ReservationGroup from "../../features/reservations/components/ReservationGroup";

export default function DayView({ forEvents, items, selectedDate }) {
  const itemsInSelectedDate = items.filter((item) =>
    moment(item.date).isSame(moment(selectedDate), "day", "[)")
  );

  //console.log(items);

  if (forEvents) {
    return (
      <Stack>
        {itemsInSelectedDate.map((event, index) => (
          <CardCalendarEvent key={index} event={event} />
        ))}
      </Stack>
    );
  }

  return (
    <Stack>
      {SPACES.map((space, index) => (
        <ReservationGroup
          space={space}
          reservations={itemsInSelectedDate}
        ></ReservationGroup>
      ))}
    </Stack>
  );
}
