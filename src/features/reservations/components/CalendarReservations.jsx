import React, { Fragment, useMemo, useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import {
  Calendar,
  Views,
  DateLocalizer,
  momentLocalizer,
} from "react-big-calendar";
import * as dates from "../../../util/dates.js";
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
import { ROUTE_RESERVE } from "../../../stores/ROUTES.js";

const mLocalizer = momentLocalizer(moment);

const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: "var(--blue)",
    },
  });

const DateCellWrapper = ({ children }) => {
  return React.cloneElement(React.Children.only(children), {
    className: "date-cell",
  });
};

const SpaceWrapper = ({ children }) => {
  return React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: "var(--blue)",
      borderRadius: "100px",
      fontFamily: "roboto condensed",
      padding: "0 10px",
      fontWeight: "500",
    },
  });
};

export default function CalendarReservations({
  localizer = mLocalizer,
  showDemoLink = true,
  onDateSelect,
  onMonthChange,
  items,
  forEvents,
  ...props
}) {
  const [selectedMonth, setSelectedMonth] = useState(moment());
  const navigate = useNavigate();
  const { components, defaultDate, max, views } = useMemo(
    () => ({
      components: {
        toolbar: CustomToolbar,
        timeSlotWrapper: ColoredDateCellWrapper,
        eventWrapper: SpaceWrapper,
        dateCellWrapper: DateCellWrapper,
      },
      defaultDate: moment(),
      max: dates.add(dates.endOf(new Date(2015, 17, 1), "day"), -1, "hours"),
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
      <Stack justifyContent={"space-between"} direction={"row"} padding={2}>
        {" "}
        <Stack gap={1} direction={"row"}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              name="selected-months"
              value={moment(date)}
              onChange={(e) => handleSelectMonth(moment(e))}
              views={["month", "year"]}
            />
          </LocalizationProvider>
          <IconButton color="primary" onClick={handleNavigateBack}>
            <ChevronLeftIcon></ChevronLeftIcon>
          </IconButton>
          <IconButton color="primary" onClick={handleNavigateForwards}>
            <ChevronRightIcon></ChevronRightIcon>
          </IconButton>
          <Button onClick={handleResetMonth}> Hoy</Button>
        </Stack>
        <Button onClick={() => navigate(ROUTE_RESERVE)} variant="contained">
          Reservar espacio
        </Button>
      </Stack>
    );
  }

  return (
    <Stack
      height={"100%"}
      width={"100%"}
      display={"flex"}
      flex={2}
      flexGrow={2}
    >
      <Calendar
        titleAccessor={forEvents ? "name" : (item) => item.space.name}
        startAccessor={forEvents ? "start" : "date"}
        endAccessor={forEvents ? "end" : "date"}
        components={components}
        onNavigate={onMonthChange}
        date={selectedMonth}
        events={items}
        localizer={localizer}
        max={max}
        showMultiDayTimes
        step={60}
        selectable
        onSelectSlot={onDateSelect}
        views={views}
      />
    </Stack>
  );
}
