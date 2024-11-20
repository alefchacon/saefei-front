import CardList from "../components/CardList";
import Page from "../components/Page";
import CardEvent from "../features/events/components/CardEvent";
import { useLayoutEffect } from "react";
import CardActionArea from "@mui/material/CardActionArea";
import { useNavigate } from "react-router-dom";
import { ROUTE_EVENT } from "../stores/routes";
import { useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import SearchField from "../components/SearchField";
import SelectCustom from "../components/Select";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import useAuth from "../features/auth/businessLogic/useAuth";
import { useEvents } from "../features/events/businessLogic/useEvents";
import useIsMobile from "../components/hooks/useIsMobile";
import moment from "moment";
import useMockEvents from "../mockBackend/useMockEvents";
import * as FILTERS from "../stores/filtersEvent";
import mockGetUser from "../mockBackend/mockGetUser";

export default function Events({ userEvents = false, noPage = false }) {
  const { mockGetCalendarEvents, mockEvents } = useMockEvents();
  const navigate = useNavigate();
  //const user = useAuth().getUser();
  const user = mockGetUser();

  const isMobile = useIsMobile();
  const [filters, setFilters] = useState({
    date: moment(),
    order: FILTERS.FILTER_EVENT_DATE,
    searchbar: "",
  });

  //const { events, getEvents } = useEvents();

  //If the filters change, launch a brand new search:
  useLayoutEffect(() => {
    fetchNextPage(true);
  }, [filters, userEvents]);

  const fetchNextPage = async (newSearch = false) => {
    const includeDate = filters.searchbar === "";
    //getEvents(getFilters(includeDate), newSearch);
    const idUsuario = userEvents ? user.id : 0;
    await mockGetCalendarEvents("", idUsuario);
  };

  const mockHandleSearchbarChange = (newSearchbarValue = "") => {
    mockGetCalendarEvents(newSearchbarValue);
  };

  const handleSearchbarChange = (newSearchbarValue) => {
    setFilters((prev) => ({
      ...prev,
      searchbar: newSearchbarValue,
    }));
  };
  const handleDateChange = (newDate) => {
    setFilters((prev) => ({
      ...prev,
      date: newDate,
    }));
  };
  const handleOrderChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      order: e.target.value,
    }));
  };

  const getFilters = (includeDate = true) => {
    const filterArray = [`orden=${filters.order}`, `q=${filters.searchbar}`];

    if (includeDate && !userEvents) {
      filterArray.push(`fecha=${moment(filters.date).format("YYYY-MM")}`);
    } else if (userEvents) {
      filterArray.push(`delUsuario=${true}`);
    }

    return filterArray;
  };

  const resetName = () => {
    setFilters((prev) => ({
      ...prev,
      searchbar: "",
    }));
  };

  const eventList = (
    <>
      <Stack id={"principal"} gap={1}>
        <Stack id={"filters"} padding={"10px"} gap={"20px"}>
          <SearchField
            onSearch={mockHandleSearchbarChange}
            onDeleteQuery={resetName}
          ></SearchField>
          {/*
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Stack
              direction={"row"}
              gap={"1vw"}
              width={"100%"}
              justifyContent={"space-between"}
            >
              <Stack direction={"row"} gap={"1vw"}>
                {!userEvents && (
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DatePicker
                      label="Mes"
                      name="selected-months"
                      value={filters.date}
                      onAccept={handleDateChange}
                      views={["month", "year"]}
                      sx={{ maxWidth: "170px" }}
                      slotProps={{
                        textField: { variant: "standard", fullWidth: false },
                      }}
                    />
                  </LocalizationProvider>
                )}
                <SelectCustom
                  variant="standard"
                  label="Orden"
                  minWidth={"100px"}
                  value={filters.order}
                  onChange={handleOrderChange}
                >
                  <Stack value={""}></Stack>
                  <Stack value={FILTERS.FILTER_EVENT_DATE}>Fecha</Stack>
                  <Stack value={FILTERS.FILTER_EVENT_ALPHABETIC}>
                    Alfabético
                  </Stack>
                </SelectCustom>
              </Stack>

              {user?.isCoordinator && (
                <Button variant="contained" disableElevation>
                  {isMobile ? "Reporte" : "Generar reporte"}
                </Button>
              )}
            </Stack>
          </Stack>
          */}
        </Stack>
        <br />
        <CardList>
          {mockEvents.map((eventUV, index) => (
            <CardActionArea
              key={index}
              onClick={() => navigate(`${ROUTE_EVENT}/${eventUV.id}`)}
            >
              <CardEvent event={eventUV} />
            </CardActionArea>
          ))}
        </CardList>
      </Stack>
      <CardList label="Reservaciones"></CardList>
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  );

  return (
    <Page
      title={`Eventos ${userEvents ? `de ${user?.fullname}` : ""}`}
      onBottomReached={fetchNextPage}
      disablePadding={isMobile}
      disableLoading={noPage}
      bgcolor="white"
      showHeader={!isMobile}
    >
      {eventList}
    </Page>
  );
}
