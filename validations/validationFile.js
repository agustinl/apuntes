export default function validationFile(values) {

    let errors = {};

    // Validate Email mandatory
    if(!values.fileName) {
        errors.fileName = "El nombre del apunte es obligatorio";
    }

    // Validate Email mandatory
    if(!values.signature) {
        errors.signature = "La materia es obligatoria"
    }
    
    // validar la url
    /* if(!values.url) {
        errors.url = 'La URL del producto es obligatoria';
    } else if( !/^(ftp|http|https):\/\/[^ "]+$/.test(values.url) ) {
        errors.url = "URL mal formateada o no válida"
    } */

    // validar descripción.
    if(!values.fileDescription) {
        errors.fileDescription = "La descripción del apunte es obligatoria"
    }


    return errors;
}