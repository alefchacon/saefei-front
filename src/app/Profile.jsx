import Page from "../components/Page";
import useIsMobile from "../components/hooks/useIsMobile";
import Events from "./Events";
import ChipCustom from "../components/Chip";
import getUser from "../features/auth/businessLogic/getUser";
import Button from "@mui/material/Button";
import logOut from "../features/auth/businessLogic/logOut";

//MOCK
import mockGetUser from "../mockBackend/mockGetUser";

export default function Profile({ userEvents = false, noPage = false }) {
  //const user = getUser();
  const user = mockGetUser();
  const isMobile = useIsMobile();

  const handleLogOut = async () => {
    logOut();
  };

  return (
    <Page
      title={
        <div>
          <div>
            {user?.fullname}
            <br />
          </div>
          <Button onClick={handleLogOut}>Salir</Button>
        </div>
      }
      disablePadding={isMobile}
      bgcolor="white"
      showHeader
    >
      <Events noPage userEvents></Events>
    </Page>
  );
}
