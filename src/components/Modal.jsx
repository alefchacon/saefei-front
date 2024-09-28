import "./App.css";

import { Card } from "@mui/material";
import { Typography } from "@mui/material";
import { CardActionArea } from "@mui/material";
import TodayIcon from "@mui/icons-material/Today";
import Stack from "@mui/material/Stack";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function ReservationForm() {
  return (
    <Stack>
      <Card
        sx={{ backgroundColor: "var(--bg)", borderRadius: 5 }}
        elevation={0}
      >
        <CardActionArea>
          <Stack
            sx={{ padding: "1rem" }}
            justifyContent={"space-between"}
            display={"flex"}
            flexDirection={"row"}
            alignItems={"center"}
          >
            <Stack
              display={"flex"}
              direction={"row"}
              alignItems={"center"}
              gap={"1rem"}
            >
              <TodayIcon></TodayIcon>
              <Typography variant="paragraph">Seleccionar fecha</Typography>
            </Stack>
            <ArrowForwardIosIcon />
          </Stack>
        </CardActionArea>
      </Card>
    </Stack>
  );
}
