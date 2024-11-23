import MEDIA from "../../../stores/media";

const organizerAskedFor = (requirement = "") => {
    return (
      Boolean(requirement) 
      && requirement != "N/A" 
      && requirement != "N\/A" 
      && requirement != "0" 
      && requirement != 0 
    );
  }

const getAboutComputerCenterRequirements = (eventUV = {}) => {
    let aboutComputerCenterRequirements = `Queremos confirmar nuestra disposición para proporcionar los recursos necesarios y asistir con los requerimientos técnicos del Centro de Cómputo. En este sentido, al inicio del evento, a partir de las XXX, nuestro equipo estará presente para coordinar los aspectos técnicos del evento`;

    if (organizerAskedFor(eventUV.needsLivestream)){
        aboutComputerCenterRequirements = aboutComputerCenterRequirements.concat(", incluyendo la transmisión en vivo.");   
    } else {
        aboutComputerCenterRequirements = aboutComputerCenterRequirements.concat(".");
    } 

    return aboutComputerCenterRequirements;
}

const getAboutDecoration = (eventUV) => {
    if (organizerAskedFor(eventUV.decoration)){
        return `Hemos tomado nota de la soliciud de material de decoración — los siguientes materiales serán apartados y colocados previo al inicio de su evento: ${eventUV.decoration}.`;
    }
}

const getAboutBroadcast = (eventUV) => {

    const organizerUploadedMaterial = 
        eventUV.publicity > 0 
        || Boolean(eventUV.chronogram);

    const materialStrings = [`la publicidad`, `el programa`];

    let aboutMaterial = organizerUploadedMaterial
        ? `el material proporcionado (${materialStrings.join(" y ")})`
        : `diseñaremos el cartel de su evento, mismo que`
    
    let publicationString = `En cuanto a la difusión, ${aboutMaterial} será publicado ${getPublicationString(eventUV)}. `
    if (eventUV.media.includes(MEDIA.communicationUV)){
        publicationString = publicationString.concat("Además, se solicitará apoyo a Comunicados UV para la difusión. ");
    }
    
    if (eventUV.media.includes(MEDIA.radioUV) 
        || eventUV.media.includes(MEDIA.prensaUV)){
        publicationString = publicationString.concat("También se solicitará apoyo a Prensa UV para cubrir la inauguración del evento. ");
    }
    return publicationString;
}

const getAboutExternalParticipants = (eventUV) => {
    if (organizerAskedFor(eventUV.numParticipantsExternal)){
        return "Informaremos a la Administración sobre la posible asistencia de público externo. Le recordamos que el acceso al estacionamiento está sujeto a la disponibilidad de lugares en el momento de su llegada.";
    }
}

const getAboutRecords = (eventUV) => {
    if (organizerAskedFor(eventUV.records)){
        return "Sobre las constancias, estas serán entregadas antes de iniciar el evento.";
    }
}

const getAboutAdditional = (eventUV) => {
    if (organizerAskedFor(eventUV.additional)){
        return `Finalmente, con respecto a los requisitos adicionales, estos se atenderán: ${eventUV.additional}`;
    }
}

const getPublicationString = (eventUV) => {

    if (eventUV.media.length < 1) {
        return "NO SE SELECCIONÓ NINGÚN MEDIO";
    }

    /*
    If the number of publication venues ever changes, simply add it to the 
    MEDIA object, and then add its corresponding possible string below.

    (or refactor both so they're all in the same object, idk)
    */
    const possibleStrings = {
        [MEDIA.webPage]: `en la ${MEDIA.webPage}`,
        [MEDIA.socialMedia]: `en las ${MEDIA.socialMedia}`,
        [MEDIA.institutionalMail]: `mediante un correo informativo a través de ${MEDIA.institutionalMail}`,
    }

    const necessaryStrings = eventUV.media.map(
        mediaString => possibleStrings[mediaString]
    ).filter(string => string !== undefined)

    if (necessaryStrings.length === 1){
        return necessaryStrings[0];
    }

    return necessaryStrings.map((string, index) => {
        if (index === necessaryStrings.length - 1){
            return `y ${string}`;
        }

        return string;
    }).join(", ");
}

const createResponse = (eventUV = {}) => {
    return [
        `Con referencia a la notificación que nos hizo llegar del evento "${eventUV.name}" que tendrá lugar ${2} en ${1} de la Facultad de Estadística e Informática, agradecemos la oportunidad de colaborar y ofrecer nuestro apoyo para garantizar el éxito de este significativo evento.`,
        getAboutComputerCenterRequirements(eventUV),
        getAboutDecoration(eventUV),
        getAboutBroadcast(eventUV),
        getAboutExternalParticipants(eventUV),
        getAboutRecords(eventUV),
        getAboutAdditional(eventUV),
        `Quedamos a su disposición para cualquier consulta adicional o solicitud que pueda tener. Estamos comprometidos a apoyar en lo necesario para hacer de este evento una experiencia exitosa para todos los involucrados.\n\nCordialmente,\n\nCoordinación de Eventos Académicos\nFacultad de Estadística e Informática\nUniversidad Veracruzana\n`
    ].join("\n\n")
}

export default createResponse;