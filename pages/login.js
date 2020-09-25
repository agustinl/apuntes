import Layout from '../components/Layout';

const Login = () => {
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

                    <form>
                        <div className="form-group">
                            <label className="form-label" htmlFor="email">Email</label>
                            <input className="form-input" type="email" id="email" placeholder="Email" />
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="password">Password</label>
                            <input className="form-input" type="password" id="password" placeholder="Password" />
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