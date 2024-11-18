import { sortAsc, getHHssString } from "../../../util/moments"

class File {
  constructor(frontendFile) {
    this.id = frontendFile?.id || null;
    this.file = frontendFile?.file || null;
    this.idTipoArchivo = frontendFile?.idTipoArchivo || null;
    this.idEvento = frontendFile?.idEvento || null;
  }

  get toFormData(){
    const formData = new FormData();
    formData.append("id", this.id);
    formData.append("file", this.file);
    formData.append("idTipoArchivo", this.idTipoArchivo);
    formData.append("idEvento", this.idEvento);
    return formData;
  }
}



export default File;