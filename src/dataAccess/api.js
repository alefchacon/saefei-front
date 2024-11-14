import axios from "axios";
import { TOKEN_KEY } from "../stores/AUTH_KEYS";
const token = localStorage.getItem(TOKEN_KEY);

const api = axios.create({
  baseURL: "http://localhost:8000/api/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

const apiClient = {
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
  if (!error.intercepted) {
    console.error('Este error no se interceptó:', error);
    // Additional error handling logic
  }
};

export  {apiClient, api}