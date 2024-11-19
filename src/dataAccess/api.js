import axios from "axios";
import { TOKEN_KEY } from "../stores/authKeys";
const token = localStorage.getItem(TOKEN_KEY);
console.log(token)
const api = axios.create({
  baseURL: "http://localhost:8000/api/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
  },
});


const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
}

const apiClient = {
  async get(url, config = {}) {
    try {
      const response = await api.get(url, config);
      return response;
    } catch (error) {
      handleApiError(error);
      throw error;
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


};

function handleApiError(error) {
  if (!error.intercepted) {
    console.error('Este error no se interceptó:', error);

  }
};

export  {apiClient, api}