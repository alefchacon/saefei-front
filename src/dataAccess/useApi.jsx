import axios from "axios";
import { useSnackbar } from "../components/providers/SnackbarProvider";
import { useLoading } from "../components/providers/LoadingProvider";
import { TOKEN_KEY } from "../stores/authKeys";
export default function useApi() {
  const { openSnackbar } = useSnackbar();
  const { setLoading } = useLoading();
  const token = localStorage.getItem(TOKEN_KEY);

  const api = axios.create({
    baseURL: "http://100.26.161.147/api/",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const apiWrapper = {
    async get(url, config = {}) {
      setLoading(true);
      try {
        const response = await api.get(url, config);
        return response;
      } catch (error) {
        handleApiError(error);
        throw error; // Re-throw if you want calling code to be able to catch specific errors
      } finally {
        setLoading(false);
      }
    },

    async post(url, data, config = {}) {
      setLoading(true);
      try {
        const response = await api.post(url, data, config);
        openSnackbar(response.data.message);
        return response;
      } catch (error) {
        handleApiError(error);
      } finally {
        setLoading(false);
      }
    },
    async put(url, data, config = {}) {
      setLoading(true);
      try {
        const response = await api.put(url, data, config);
        openSnackbar(response.data.message);
        return response;
      } catch (error) {
        handleApiError(error);
      } finally {
        setLoading(false);
      }
    },
  };

  function handleApiError(error) {
    //openSnackbar("hola!!! :D ");
  }

  return [apiWrapper];
}
