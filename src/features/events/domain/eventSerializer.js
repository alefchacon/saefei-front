import { sortAsc, getHHssString } from "../../../util/moments"
import ActivitySerializer from "../../reservations/domain/activitySertializer";
class EventSerializer{
  constructor(frontendEvent){
    this.nombre = frontendEvent.name,
    this.descripcion = frontendEvent.description,
    this.pagina = frontendEvent.page,
    this.ambito = frontendEvent.scope,
    this.programas = JSON.stringify(frontendEvent.programs),
    this.reservaciones = JSON.stringify(frontendEvent.reservations),
    this.actividades = JSON.stringify(
      frontendEvent.activities.map(
        activity => new ActivitySerializer(activity)
      )
    ),
    this.audiencias = frontendEvent.audiences.join(";"),
    this.eje = frontendEvent.axis,
    this.tematicas = frontendEvent.themes.join(";"),
    this.numParticipantes = frontendEvent.numParticipants,
    this.medios = frontendEvent.media.join(";"),
    this.requisitosCentroComputo = frontendEvent.technicalRequirements,
    this.requiereTransmisionEnVivo = frontendEvent.needsLivestream,
    
    //presidium y ponentes no son lo mismo: preguntar a dire
    this.presidium = frontendEvent.records,
    this.publicidad = frontendEvent.publicity,
    this.cronograma = frontendEvent.chronogram,

    this.decoracion = frontendEvent.decoration,
    this.numParticipantes = frontendEvent.numParticipantsExternal,
    this.requiereEstacionamiento = frontendEvent.needsParking,
    this.requiereFinDeSemana = frontendEvent.needsWeekend,
    this.medios = frontendEvent.media,
    this.adicional = frontendEvent.additional,
    this.idUsuario = frontendEvent.idUsuario,
    this.idTipo = frontendEvent.idTipo,
    this.idEstado = 1
  }
}



export default EventSerializer;