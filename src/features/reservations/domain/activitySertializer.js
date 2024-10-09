import { sortAsc, getHHssString } from "../../../util/moments"
import moment from "moment";
class ActivitySerializer{
  constructor(frontendActivity){
    this.nombre = frontendActivity.name,
    this.hora = moment(frontendActivity.time).format("HH:mm"),
    this.idReservacion = frontendActivity.idReservacion
  }
}



export default ActivitySerializer;