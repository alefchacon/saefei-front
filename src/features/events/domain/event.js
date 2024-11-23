import { sortAsc, getHHssString } from "../../../util/moments"
import ActivitySerializer from "../../reservations/domain/activitySertializer";
import { User } from "../../auth/domain/user";
class Event {
  constructor(frontendEvent) {
    this.id = frontendEvent?.id || null;
    this.name = frontendEvent?.name || null;
    this.description = frontendEvent?.description || null;
    this.page = frontendEvent?.page || null;
    this.scope = frontendEvent?.scope || null;
    this.programs = frontendEvent.programs|| null;
    this.reservations = frontendEvent?.reservations || null;
    this.activities = frontendEvent?.activities
      ? JSON.stringify(frontendEvent.activities.map(activity => new ActivitySerializer(activity)))
      : null;
    this.audiences = frontendEvent?.audiences || null;
    this.axis = frontendEvent?.axis || null;
    this.themes = frontendEvent?.themes || null;
    this.numParticipants = frontendEvent?.numParticipants || null;
    this.media = frontendEvent?.media || null;
    this.computerCenterRequirements = frontendEvent?.computerCenterRequirements || null;
    this.needsLivestream = frontendEvent?.needsLivestream || null;
    
    // presidium and speakers are different, ask the director
    this.records = frontendEvent?.records || null;
    this.presidium = frontendEvent?.presidium || null;
    this.publicity = frontendEvent?.publicity || null;
    this.chronogram = frontendEvent?.chronogram || null;
    
    this.decoration = frontendEvent?.decoration || null;
    this.numParticipantsExternal = frontendEvent?.numParticipantsExternal || null;
    this.needsParking = frontendEvent?.needsParking || null;
    this.needsWeekend = frontendEvent?.needsWeekend || null;
    this.additional = frontendEvent?.additional || null;
    this.idUsuario = frontendEvent?.idUsuario || null;
    this.idTipo = frontendEvent?.idTipo || null;
    this.idEstado = 1;

    this.user = new User(frontendEvent?.user) || null;
    this.changes = frontendEvent?.changes ||null;
    
    this.reply = frontendEvent?.reply || null;
    this.replied = frontendEvent?.replied || null;
  }


}



export default Event;