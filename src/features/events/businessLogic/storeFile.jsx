import FILE_TYPES from "../../../stores/fileTypes";
import { apiClient } from "../../../dataAccess/api";
export const storeChronogram = (file, idEvento) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("idTipoArchivo", FILE_TYPES.CHRONOGRAM);
  formData.append("idEvento", idEvento);
  const response = apiClient.post("archivos", formData).then((response) => {
    return response;
  });
};
