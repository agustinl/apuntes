import { useState } from 'react';
import Layout from '../components/Layout';
import Router from 'next/router';

// Validations
import useValidation from '../hooks/useValidation';
import validationLogIn from '../validations/validationLogIn';

const INITIAL_STATE = {
	email: '',
	password: ''
}

import firebase from '../firebase';

const Login = () => {

    const [error, setError] = useState('');

	const {
		values, 
        errors,
        handleSubmit,
		handleChange,
		handleBlur
	} = useValidation(INITIAL_STATE, validationLogIn, logIn);

	const { email, password } = values;

	async function logIn () {
		try {
			await firebase.login(email, password);
			Router.push('/');
		} catch (error) {
			setError(error.message);
		}
	}

    return (
        <>
			<Layout>
            <div className="panel column col-4 col-mx-auto">
                <div className="panel-header">
                    <div className="panel-title">
                        <h4>Registrarse</h4>
                    </div>
                </div>

                <div className="panel-body">

                    <form
                        onSubmit={handleSubmit}
                    >
                        <div className={`form-group ${errors.email ? "has-error" : ""}`}>
                            <label className="form-label" htmlFor="email">Email</label>
                            <input
                                className="form-input"
                                type="email"
                                id="email"
                                placeholder="Email"
                                name="email"
                                value={email}
                                onChange={handleChange}
                            />
                            { errors.email && <p className="form-input-hint">{errors.email}</p> }
                        </div>

                        <div className={`form-group ${errors.password ? "has-error" : ""}`}>
                            <label className="form-label" htmlFor="password">Password</label>
                            <input
                                className="form-input"
                                type="password"
                                id="password"
                                placeholder="Password"
                                name="password"
                                value={password}
                                onChange={handleChange}
                            />
                            { errors.password && <p className="form-input-hint">{errors.password}</p> }
                        </div>

                        <button className="btn btn-primary float-right mt-2">Iniciar Sesion</button>
                    </form>

                </div>

                <div className="panel-footer"></div>
            </div>
			</Layout>
		</>
    );
}
 
export default Login;