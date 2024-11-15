import { useMemo, useState, Children, cloneElement } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import {
  Calendar,
  Views,
  DateLocalizer,
  momentLocalizer,
} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import Button from "@mui/material/Button";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import { ROUTE_RESERVE } from "../../stores/ROUTES";
const mLocalizer = momentLocalizer(moment);

const coloredDateCellWrapper = ({ children }) =>
  cloneElement(Children.only(children), {
    style: {
      backgroundColor: "var(--blue)",
    },
  });

const eventWrapper = ({ children }) => {
  return cloneElement(Children.only(children), {
    style: {
      backgroundColor: "var(--blue)",
      borderRadius: "100px",
      fontFamily: "roboto condensed",
      padding: "0 10px",
      fontWeight: "500",
    },
  });
};

const StyledDatePicker = styled(DatePicker)(({ theme }) => ({
  "& .MuiInputBase-input": {
    fontSize: "16px",
    textTransform: "capitalize",
    fontWeight: 500,
  },
  "& .MuiInputBase-root": {
    backgroundColor: "transparent",

    "&:hover": {
      backgroundColor: "#eeeeee",
    },
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
}));

export default function CalendarCustom({
  localizer = mLocalizer,
  showDemoLink = true,
  onDateSelect,
  onMonthChange,
  items,
  forEvents,
  actionButton,
  ...props
}) {
  const [selectedMonth, setSelectedMonth] = useState(moment());
  const navigate = useNavigate();
  const { components, defaultDate, max, views } = useMemo(
    () => ({
      components: {
        toolbar: CustomToolbar,
        timeSlotWrapper: coloredDateCellWrapper,
        eventWrapper: eventWrapper,
        dateCellWrapper: (props) => (
          <TouchCellWrapper {...props} onSelectSlot={handleDateSelect} />
        ),
      },
      defaultDate: moment(),

      views: Object.keys(Views).map((k) => Views[k]),
    }),
    []
  );

  function CustomToolbar(props) {
    const { date, onNavigate, view, setView } = props;

    const handleNavigateBack = () => {
      const newMonth = date.subtract(1, "months");
      setSelectedMonth(newMonth);
      onMonthChange(newMonth);
    };

    const handleNavigateForwards = () => {
      const newMonth = date.add(1, "months");
      setSelectedMonth(newMonth);
      onMonthChange(newMonth);
    };

    const handleSelectMonth = (newMonth = moment()) => {
      const month = moment(newMonth);
      setSelectedMonth(month);
      onMonthChange(month);
    };

    const handleResetMonth = () => {
      const today = moment();
      setSelectedMonth(today);
      onMonthChange(today);
    };

    return (
      <Stack
        justifyContent={"space-between"}
        alignItems={"center"}
        direction={"row"}
        padding={"0 20px 20px 20px"}
      >
        {" "}
        <Stack gap={1} direction={"row"}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <StyledDatePicker
              name="selected-months"
              value={moment(date)}
              onChange={(e) => handleSelectMonth(moment(e))}
              views={["month", "year"]}
            />
          </LocalizationProvider>
          <IconButton
            color="primary"
            onClick={handleNavigateBack}
            title="Retroceder un mes"
          >
            <ChevronLeftIcon></ChevronLeftIcon>
          </IconButton>
          <IconButton color="primary" onClick={handleNavigateForwards}>
            <ChevronRightIcon></ChevronRightIcon>
          </IconButton>
          <Button onClick={handleResetMonth}> Hoy</Button>
        </Stack>
        {actionButton}
      </Stack>
    );
  }

  const handleDateSelectForDesktop = (selectedDate) => {
    handleDateSelect(selectedDate.start);
  };

  const handleDateSelect = (dateString) => {
    if (onDateSelect) {
      onDateSelect(dateString, items);
    }
  };

  const TouchCellWrapper = ({ children, value, onSelectSlot }) => {
    return cloneElement(Children.only(children), {
      onTouchEnd: () => onSelectSlot(value),
      className: "date-cell",
    });
  };

  return (
    <Stack
      width={"100%"}
      maxHeight={"100%"}
      display={"flex"}
      flex={2}
      flexGrow={2}
      className="calendar"
      paddingTop={"0px"}
      bgcolor={"transparent"}
    >
      <Calendar
        titleAccessor={forEvents ? "name" : (item) => item.space.name}
        startAccessor={"date"}
        endAccessor={"date"}
        components={components}
        onNavigate={onMonthChange}
        date={selectedMonth}
        events={items}
        localizer={localizer}
        max={max}
        showMultiDayTimes
        step={60}
        selectable
        onSelectSlot={handleDateSelectForDesktop}
        views={views}
      />
    </Stack>
  );
}
