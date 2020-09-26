import { useState, useContext, useEffect } from 'react';
import Layout from '../components/Layout';
import { css, jsx } from '@emotion/core';
import Router, { useRouter } from 'next/router';
import FileUploader from 'react-firebase-file-uploader';

import useValidation from '../hooks/useValidation';
import validationFile from '../validations/validationFile';

const INITIAL_STATE = {
	fileName: '',
    fileDescription: '',
    signature: '',
    urlYoutube: ''
}

import { FirebaseContext } from '../firebase';

const Subir = () => {

    // File States
	const [ filename, setFileName ] = useState('');
	const [ uploading, setUploading ] = useState(false);
	const [ progress, setProgress ] = useState(0);
    const [ fileUrl, setFileUrl ] = useState('');
    const [ uploadsucess, setUploadSucess ] = useState(false);
    
    const [error, setError] = useState('');

    const {
		values, 
        errors,
        handleSubmit,
		handleChange,
        handleBlur
    } = useValidation(INITIAL_STATE, validationFile, saveInformation);
    
    const { fileName, fileDescription, signature, urlYoutube } = values;

    // Routing hook
    const router = useRouter();
    
    const { user, firebase } = useContext(FirebaseContext);
    
    async function saveInformation () {
		
		if(!user) {
			return router.push('/login');
        }
        
        setUploadSucess(true);

		const file = {
			fileName,
			urlYoutube,
            fileUrl,
            signature,
			fileDescription,
			votes: 0,
			comments: [],
			date: Date.now(),
			author: {
				id: user.uid,
				username: user.displayName
			},
			whoVoted: []
        }

		// Insert
        firebase.db.collection('apuntes').add(file);

        setTimeout(function(){

            setUploadSucess(false)    
            return router.push('/');

        }, 2000);
		
    }

	const handleUploadStart = () => {
		setProgress(0);
		setUploading(true);
	}
  
	const handleProgress = progress => {setProgress(progress)};
  
	const handleUploadError = error => {
		setUploading(error);
		console.error(error);
	};
  
	const handleUploadSuccess = name => {
		setProgress(100);
		setUploading(false);
		setFileName(name)
		firebase
			.storage
			.ref("apuntes")
			.child(name)
			.getDownloadURL()
			.then(url => {
			  setFileUrl(url);
			} );
	};

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

                    <form
                        onSubmit={handleSubmit}
                    >
                        <div className={`form-group ${errors.fileName ? "has-error" : ""}`}>
                            <label className="form-label" htmlFor="fileName">Nombre del apunte</label>
                            <input
                                className="form-input"
                                type="text"
                                id="fileName"
                                placeholder="Nombre del apunte"
                                name="fileName"
                                value={fileName}
                                onChange={handleChange}
                            />

                            { errors.fileName && <p className="form-input-hint">{errors.fileName}</p> }
                        </div>

                        <div className={`form-group ${errors.fileDescription ? "has-error" : ""}`}>
                            <label className="form-label" htmlFor="fileDescription">Descripción</label>
                            <textarea
                                className="form-input"
                                id="fileDescription"
                                placeholder="Descripción"
                                rows="3"
                                name="fileDescription"
                                value={fileDescription}
                                onChange={handleChange}
                            ></textarea>

                            { errors.fileDescription && <p className="form-input-hint">{errors.fileDescription}</p> }
                        </div>

                        <div className={`form-group ${errors.signature ? "has-error" : ""}`}>
                            <label className="form-label" htmlFor="signature">Materia</label>
                            <select
                                className="form-select"
                                id="signature"
                                name="signature"
                                value={signature}
                                onChange={handleChange}
                            >   
                                <option value="">Seleccionar Materia</option>
                                <option value="Anatomía">Anatomía</option>
                                <option value="Histología, Biología Celular, Embriología y Genética">Histología, Biología Celular, Embriología y Genética</option>
                                <option value="Medicina Familiar I">Medicina Familiar I</option>
                                <option value="Química Biológica">Química Biológica</option>
                                <option value="Fisiología y Biofísica">Fisiología y Biofísica</option>
                                <option value="Inmunología Humana">Inmunología Humana</option>
                                <option value="Microbiología y Parasitología I">Microbiología y Parasitología I</option>
                                <option value="Microbiología y Parasitología I General">Microbiología y Parasitología I General</option>
                                <option value="Microbiología y Parasitología II">Microbiología y Parasitología II</option>
                                <option value="Microbiología y Parasitología II Médica">Microbiología y Parasitología II Médica</option>
                                <option value="Salud Mental">Salud Mental</option>
                                <option value="Patología I">Patología I</option>
                                <option value="Farmacología I">Farmacología I</option>
                                <option value="Bioética I">Bioética I</option>
                                <option value="Medicina I (Semiología y Fisiopatología)">Medicina I (Semiología y Fisiopatología)</option>
                                <option value="Medicina II (Medicina Interna)">Medicina II (Medicina Interna)</option>
                                <option value="Nutrición">Nutrición</option>
                                <option value="Diagnóstico por Imágenes">Diagnóstico por Imágenes</option>
                                <option value="Dermatología">Dermatología</option>
                                <option value="Infectología">Infectología</option>
                                <option value="Neumonología">Neumonología</option>
                                <option value="Neurología">Neurología</option>
                                <option value="Cirugía General">Cirugía General</option>
                                <option value="Urología">Urología</option>
                                <option value="Ortopedia y Traumatología">Ortopedia y Traumatología</option>
                                <option value="Oftalmología">Oftalmología</option>
                                <option value="Otorrinolaringología">Otorrinolaringología</option>
                                <option value="Neurocirugía">Neurocirugía</option>
                                <option value="Obstetricia">Obstetricia</option>
                                <option value="Ginecología">Ginecología</option>
                                <option value="Patología II">Patología II</option>
                                <option value="Farmacología II">Farmacología II</option>
                                <option value="Salud Pública I">Salud Pública I</option>
                                <option value="Salud Pública II">Salud Pública II</option>
                                <option value="Psiquiatría">Psiquiatría</option>
                                <option value="Medicina Legal y Deontología Médica">Medicina Legal y Deontología Médica</option>
                                <option value="Toxicología">Toxicología</option>
                                <option value="Bioética II">Bioética II</option>
                                <option value="Clínica Médica">Clínica Médica</option>
                                <option value="Cirugía">Cirugía</option>
                                <option value="Tocoginecología">Tocoginecología</option>
                                <option value="Pediatría">Pediatría</option>
                                <option value="Medicina Familiar II">Medicina Familiar II</option>
                                <option value="Emergentología (Terapia y Urgencias Hospitalarias)">Emergentología (Terapia y Urgencias Hospitalarias)</option>

                            </select>

                            { errors.signature && <p className="form-input-hint">{errors.signature}</p> }
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="file">Archivo</label>
                            <FileUploader
                                accept="image/*"
                                id="file"
                                name="file"
                                className="form-group"
                                randomizeFilename
                                storageRef={firebase.storage.ref("apuntes")}
                                onUploadStart={handleUploadStart}
                                onUploadError={handleUploadError}
                                onUploadSuccess={handleUploadSuccess}
                                onProgress={handleProgress}
                            />

                            <div className="bar mt-2">
                                <div
                                    className="bar-item tooltip"
                                    data-tooltip={`${progress}%`}
                                    style={{width: progress + "%"}}
                                >{progress}%</div>
                            </div>
                        </div>

                        <div className={`form-group ${errors.urlYoutube ? "has-error" : ""}`}>
                            <label className="form-label" htmlFor="video">Linkear video</label>
                            <div className="input-group">
                                <span className="input-group-addon">www.youtube.com/watch?v=</span>
                                <input
                                    type="text"
                                    className="form-input"
                                    id="urlYoutube"
                                    name="urlYoutube"
                                    placeholder="2Juo4TshStY"
                                    value={urlYoutube}
                                    maxLength="11"
                                    onChange={handleChange}
                                />
                            </div>

                            { errors.urlYoutube && <p className="form-input-hint">{errors.urlYoutube}</p> }
                        </div>

                        <button
                            className={`btn btn-primary float-right mt-2 ${uploadsucess ? "loading" : ""}`}>
                                Subir Apunte</button>
                    </form>

                </div>

                <div className="panel-footer"></div>
            </div>
			</Layout>
		</>
    );
}
 
export default Subir;