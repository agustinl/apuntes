import Layout from '../components/Layout';

const Subir = () => {
    return (
        <>
			<Layout>
            <div className="panel column col-4 col-mx-auto">
                <div className="panel-header">
                    <div className="panel-title">
                        <h4>Subir Apunte</h4>
                    </div>
                </div>

                <div className="panel-body">

                    <form>
                        <div className="form-group">
                            <label className="form-label" htmlFor="name">Nombre del apunte</label>
                            <input className="form-input" type="text" id="name" placeholder="Nombre del apunte" />
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="description">Descripción</label>
                            <textarea className="form-input" id="description" placeholder="Descripción" rows="3"></textarea>
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="signature">Materia</label>
                            <select class="form-select">
                                <option>Choose an option</option>
                                <option>Slack</option>
                                <option>Skype</option>
                                <option>Hipchat</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="file">Archivo</label>
                            <input className="form-input" type="file" id="file" />
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="video">Linkear video</label>
                            <div className="input-group">
                                <span className="input-group-addon">www.youtube.com/watch?v=</span>
                                <input type="text" className="form-input" id="video" placeholder="2Juo4TshStY" />
                            </div>
                        </div>

                        <button className="btn btn-primary float-right mt-2">Subir Apunte</button>
                    </form>

                </div>

                <div className="panel-footer">

                    <div className="bar">
                        <div className="bar-item tooltip" style={{ width: '25%' }} data-tooltip="25%">25%</div>
                    </div>

                </div>
            </div>
			</Layout>
		</>
    );
}
 
export default Subir;