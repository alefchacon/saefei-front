import { forwardRef, useRef } from "react";

import CardList from "../../components/CardList";
import Page from "../../components/Page";
import TabsCustom from "../../components/Tabs";
import { useLayoutEffect } from "react";
import useNotices from "../../features/notices/businessLogic/useNotices";
import { useState, useContext, createContext } from "react";
import { useModal } from "../../components/hooks/useModal";
import useIsMobile from "../../components/hooks/useIsMobile";
import NoticesAdministrator from "./NoticesAdministrator";
import useMockNotices from "../../mockBackend/useMockNotices";
const NoticesContext = createContext(null);

import NoticesCoordinator from "./NoticesCoordinator";
import getUser from "../../features/auth/businessLogic/getUser";
import mockGetUser from "../../mockBackend/mockGetUser";
export function useNoticesContext() {
  return useContext(NoticesContext);
}

export function Notices({ onLoad }) {
  //const { markAsRead, getNotices, notices } = useNotices();
  const { notices, mockGetNotices, markAsRead } = useMockNotices();
  const [selectedNotice, setSelectedNotice] = useState(null);
  const { Modal, openModal } = useModal();
  const isMobile = useIsMobile();
  //const user = getUser();
  const user = mockGetUser();

  useLayoutEffect(() => {
    //getNotices();

    mockGetNotices();
    if (onLoad) {
      onLoad();
    }
  }, []);

  return (
    <Page
      showHeader={!isMobile}
      title={"Bandeja de entrada"}
      bgcolor="white"
      disablePadding
      disableDivider
    >
      <TabsCustom id={"principal"}>
        {user.isCoordinator && (
          <NoticesCoordinator
            notices={notices}
            label={"Eventos"}
          ></NoticesCoordinator>
        )}
        <NoticesAdministrator
          label="Reservaciones"
          notices={notices}
          onNoticeUpdate={markAsRead}
        ></NoticesAdministrator>
      </TabsCustom>
      <CardList></CardList>
    </Page>
  );
}
