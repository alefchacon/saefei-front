import { sortAsc, getHHssString } from "../../../util/moments"
import ActivitySerializer from "../../reservations/domain/activitySertializer";
class EventSerializer{
  constructor(frontendEvent){
    this.id = frontendEvent?.id || null;
    this.nombre = frontendEvent?.name || null;
    this.descripcion = frontendEvent?.description || null;
    this.pagina = frontendEvent?.page || null;
    this.ambito = frontendEvent?.scope || null;
    this.programas = frontendEvent?.programs ? JSON.stringify(frontendEvent.programs) : null;
    this.reservaciones = frontendEvent?.reservations ? JSON.stringify(frontendEvent.reservations) : null;
    this.actividades = frontendEvent?.activities
      ? JSON.stringify(frontendEvent.activities.map(activity => new ActivitySerializer(activity)))
      : null;
    this.audiencias = frontendEvent.audiences,
    this.eje = frontendEvent?.axis || null;
    this.tematicas = frontendEvent.themes,
    this.numParticipantes = frontendEvent?.numParticipants || null;
    this.medios = frontendEvent.media,
    this.requisitosCentroComputo = frontendEvent?.computerCenterRequirements || null;
    this.requiereTransmisionEnVivo = frontendEvent?.needsLivestream || null;
    
    // presidium y ponentes no son lo mismo: preguntar a dire
    this.constancias = frontendEvent?.records || null;
    this.presidium = frontendEvent?.presidium || null;
    this.publicidad = frontendEvent?.publicity || null;
    this.cronograma = frontendEvent?.chronogram || null;
    
    this.decoracion = frontendEvent?.decoration || null;
    this.numParticipantesExternos = frontendEvent?.numParticipantsExternal || null;
    this.requiereEstacionamiento = frontendEvent?.needsParking || null;
    this.requiereFinDeSemana = frontendEvent?.needsWeekend || null;
    this.medios = frontendEvent?.media || null;
    this.adicional = frontendEvent?.additional || null;
    this.idUsuario = frontendEvent?.idUsuario || null;
    this.idTipo = frontendEvent?.idTipo || null;
    this.idEstado = 1; // assuming this is constant
    
    this.respuesta = frontendEvent?.reply || null;
    
  }

}



export default EventSerializer;