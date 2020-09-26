import { useState, useEffect } from 'react';

const useValidation = (initialState, validate, fn) => {

    const [values, setValues] = useState(initialState);
    const [errors, setErrors ] = useState({});
    const [ submitForm, setSubmitForm ] = useState(false);

    useEffect(() => {
        if(submitForm) {
            const noErrors = Object.keys(errors).length === 0;

            if(noErrors) {
                fn(); // Fn = Función que se ejecuta en el componente
            }
            setSubmitForm(false);
        }
    }, [errors]);

    // Función que se ejecuta conforme el usuario escribe algo
    const handleChange = e => {
        setValues({
            ...values,
            [e.target.name] : e.target.value
        })
    }

    // Función que se ejecuta cuando el usuario hace submit
    const handleSubmit = e => {
        e.preventDefault();
        const validateFields = validate(values);
        setErrors(validateFields);
        setSubmitForm(true);
    }

    // cuando se realiza el evento de blur
    const handleBlur = () => {
        const validateFields = validate(values);
        setErrors(validateFields);
    }

    return {
        values, 
        errors,
        handleSubmit,
        handleChange,
        handleBlur
    }
}
 
export default useValidation;