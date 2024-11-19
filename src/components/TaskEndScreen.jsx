import Message from "./Message";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Stack from "@mui/material/Stack";

export default function TaskEndScreen() {
  return (
    <Message
      title={
        <Stack direction={"column"} alignItems={"center"}>
          <CheckCircleIcon sx={{ fontSize: "60px" }} /> Tarea concluida
        </Stack>
      }
      content={
        "Por favor, espere a las instrucciones del administrador de la prueba para continuar"
      }
      center
    ></Message>
  );
}
