import { useLayoutEffect } from "react";
import { useLoading } from "../components/providers/LoadingProvider";
import useMockLoading from "./mockLoading";
import reservations from "./stores/reservations";

export default function useMockReservations() {
  const mockLoading = useMockLoading();

  const mockGetReservations = async () => {
    await mockLoading();

    return reservations;
  };

  return { mockGetReservations };
}
