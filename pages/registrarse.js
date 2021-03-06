import { useState } from 'react';
import Layout from '../components/Layout';
import Router from 'next/router';

// Validations
import useValidation from '../hooks/useValidation';
import validationRegister from '../validations/validationRegister';

const INITIAL_STATE = {
	username: '',
	email: '',
	password: ''
}

import firebase from '../firebase';

const Registrarse = () => {

    const [error, setError] = useState('');

	const {
		values, 
        errors,
        handleSubmit,
		handleChange,
		handleBlur
	} = useValidation(INITIAL_STATE, validationRegister, createAccount);

	const { username, email, password } = values;

	async function createAccount () {
		try {
			await firebase.register(username, email, password);
			Router.push('/');
		} catch (error) {
            switch (error.code) {
                case "auth/email-already-in-use":
                    setError("Email ya registrado");
                    break;  
                default:
                    break;
            }
		}
	}

    return (
        <>
			<Layout>
            <div className="panel column col-4 col-xl-6 col-md-10 col-mx-auto">
                <div className="panel-header">
                    <div className="panel-title">
                        <h4>Registrarse</h4>
                    </div>
                </div>

                <div className="panel-body">

                    <form
					    onSubmit={handleSubmit}
                    >
                        <div className={`form-group ${errors.username ? "has-error" : ""}`}>
                            <label className="form-label" htmlFor="username">Usuario</label>
                            <input
                                className="form-input"
                                type="text"
                                id="username"
                                placeholder="Usuario"
                                name="username"
                                value={username}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            { errors.username && <p className="form-input-hint">{errors.username}</p> }
                        </div>

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
                                onBlur={handleBlur}
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
                                onBlur={handleBlur}
                            />
                            { errors.password && <p className="form-input-hint">{errors.password}</p> }
                        </div>

                        { error != "" && <div className="form-group has-error"><p className="form-input-hint">{error}</p></div>}

                        <button className="btn btn-primary float-right mt-2">Registrarse</button>
                    </form>

                </div>

                <div className="panel-footer"></div>
            </div>
			</Layout>
		</>
    );
}
 
export default Registrarse;