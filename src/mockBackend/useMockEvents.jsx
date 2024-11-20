import { useLayoutEffect } from "react";
import { useLoading } from "../components/providers/LoadingProvider";
import useMockLoading from "./mockLoading";
import fullEvents from "./stores/fullEvents";
import calendarEvents from "./stores/calendarEvents";
import { useState } from "react";
import { useSnackbar } from "../components/providers/SnackbarProvider";
export default function useMockEvents() {
  const [mockEvents, setEvents] = useState([]);
  const [eventUV, setMockEvent] = useState({});
  const { openSnackbar } = useSnackbar();
  const mockLoading = useMockLoading();

  const mockGetCalendarEvents = async (name = "", idUsuario = 0) => {
    await mockLoading();
    let filteredEvents = filterEventByName(name, calendarEvents);
    filteredEvents = filterEventByOrganizer(idUsuario, filteredEvents);
    setEvents(filteredEvents);
  };

  const filterEventByName = (query = "", events = []) => {
    if (query === "") {
      return events;
    }

    return events.filter((event) =>
      event.name.toLowerCase().includes(query.toLowerCase())
    );
  };
  const filterEventByOrganizer = (idUsuario = "", events = []) => {
    if (idUsuario == 0) {
      return events;
    }

    return events.filter((event) => event.user.id == idUsuario);
  };

  const mockGetEvent = async (id = 69) => {
    await mockLoading();
    return setMockEvent(fullEvents.find((event) => event.id == id));
  };

  const mockUploadFile = async () => {
    await mockLoading(5000);
    openSnackbar("Evento actualizado");
    setMockEvent((prevEvent) => ({
      ...prevEvent,
      publicity: [{ id: 1 }],
    }));
  };

  return {
    mockGetCalendarEvents,
    mockEvents,
    mockGetEvent,
    eventUV,
    mockUploadFile,
  };
}
