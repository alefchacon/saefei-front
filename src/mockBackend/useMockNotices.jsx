import { useState } from "react";
import noticesAdministrator from "./stores/noticesAdministrator";
export default function useMockNotices() {
  const [notices, setNotices] = useState({
    noticesCoordinator: [],
    noticesAdministrator: [],
  });

  const mockGetNotices = () => {
    setNotices(noticesAdministrator);
  };

  const markAsRead = async () => {};

  return { notices, mockGetNotices, markAsRead };
}
