export default function validationFile(values) {

    let errors = {};

    // Validate Email mandatory
    if(!values.fileName) {
        errors.fileName = "No olvides el nombre del apunte";
    }

    // Validate Email mandatory
    if(!values.signature) {
        errors.signature = "No olvides seleccionar una materia"
    }
    
    // Validate URL
    if(values.urlYoutube && !/[a-zA-Z0-9_-]{11}/.test(values.urlYoutube)) {
        errors.urlYoutube = "Video ID no valido"
    }

    // validar descripción.
    if(!values.fileDescription) {
        errors.fileDescription = "No olvides poner una descripción"
    }

    return errors;
}