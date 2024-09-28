import axios from "axios";
import { useSnackbar } from "../components/providers/SnackbarProvider";
export default function useApi() {
  const { openSnackbar } = useSnackbar();

  const api = axios.create({
    baseURL: "http://localhost:8000/api/",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const apiWrapper = {
    async get(url, config = {}) {
      try {
        const response = await api.get(url, config);
        return response;
      } catch (error) {
        handleApiError(error);
        throw error; // Re-throw if you want calling code to be able to catch specific errors
      }
    },

    async post(url, data, config = {}) {
      try {
        const response = await api.post(url, data, config);
        return response;
      } catch (error) {
        handleApiError(error);
        throw error;
      }
    },

    // Add other methods (put, delete, etc.) as needed...
  };

  function handleApiError(error) {
    openSnackbar("hola!!! :D ");
  }

  return [apiWrapper];
}
