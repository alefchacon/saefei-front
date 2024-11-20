import { useLayoutEffect } from "react";
import { useLoading } from "../components/providers/LoadingProvider";
import useMockLoading from "./mockLoading";
import calendarEvents from "./stores/calendarEvents";

export default function useMockEvents() {
  const mockLoading = useMockLoading();

  const mockGetCalendarEvents = async () => {
    await mockLoading();

    return calendarEvents;
  };

  return { mockGetCalendarEvents };
}
