import { SnackbarContext } from "../components/providers/SnackbarProvider";

import { api } from "./api";
import { LoadingContext } from "../components/providers/LoadingProvider";
import { useContext } from "react";
import * as AUTH_KEYS from "../stores/AUTH_KEYS";

export const useAxiosInterceptors = () => {
  const { openSnackbar } = useContext(SnackbarContext);
  const { setLoading } = useContext(LoadingContext);

  api.interceptors?.request.use(
    function (config) {
      setLoading(true);
      return config;
    },
    function (error) {
      setLoading(false);
      return Promise.reject(error);
    }
  );

  api.interceptors?.response.use(
    (response) => {
      setLoading(false);
      const message = response?.data?.message;

      if (message !== undefined) {
        openSnackbar(message);
      }

      return response;
    },
    (error) => {
      handleError(error);

      setLoading(false);

      return Promise.reject(error);
    }
  );

  function handleError(error) {
    if (error.response) {
      error.response.intercepted = true;
    }

    error.intercepted = true;

    if (error.code === "ERR_NETWORK") {
      openSnackbar("No hay conexión");
      return;
    }

    openSnackbar(error.response?.data?.message);

    handleUnauthorized(error);
    /*
    showSnackbar(error.response?.data?.detail, true);

    const status = error.response?.status;
    const canRefresh = Boolean(
      localStorage.getItem(CREDENTIALS_KEYS.TOKEN_REFRESH)
    );
    if (status === 401 && canRefresh) {
      console.log("aquí refrescaría");
      showModal("La sesión ha expirado", <RefreshForm />, false);
    } else {
      logOutFront();
    }
      */
  }

  const handleUnauthorized = (error) => {
    if (error.response.status !== 401) {
      return;
    }

    localStorage.removeItem(AUTH_KEYS.USER_KEY);
    localStorage.removeItem(AUTH_KEYS.TOKEN_KEY);
  };
};
