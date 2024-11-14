import { useState } from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import ButtonResponsive from "../../../components/ButtonResponsive";
import Button from "@mui/material/Button";
import useIsMobile from "../../../components/hooks/useIsMobile";
import Logo from "../../../components/Logo";
import { Formik, Form } from "formik";
import useAuth from "../businessLogic/useAuth";
import logIn from "../businessLogic/logIn";
import { useModal } from "../../../components/providers/ModalProvider";

export default function LogInForm({ onLogin }) {
  const isMobile = useIsMobile();
  const { closeModal } = useModal();
  const handleLogIn = async (values) => {
    const response = await logIn(values);

    if (response.status === 200) {
      closeModal();
      onLogin();
    }
  };

  return (
    <Stack
      padding={isMobile ? "0 50px" : "100px 200px"}
      height={"100%"}
      justifyContent={"center"}
    >
      <Formik
        onSubmit={handleLogIn}
        initialValues={{
          email: "",
          password: "",
        }}
      >
        {({ isSubmitting, handleChange, handleBlur, values }) => (
          <Form>
            <Stack gap={"20px"}>
              <Logo></Logo>
              <br />
              <TextField
                id="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                type="email"
                variant="standard"
                label="Correo institucional"
              ></TextField>
              <TextField
                id="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                type="password"
                variant="standard"
                label="Contraseña"
              ></TextField>
              <Stack className="button-row"></Stack>
            </Stack>
            <br />
            <br />
            <Stack className="button-row">
              <ButtonResponsive
                type="submit"
                loading={isSubmitting}
                responsive={false}
              >
                Entrar
              </ButtonResponsive>
            </Stack>
          </Form>
        )}
      </Formik>
    </Stack>
  );
}
