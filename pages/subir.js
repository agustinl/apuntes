import { useState, useContext } from 'react';
import Layout from '../components/Layout';
import { css, jsx } from '@emotion/core';
import Router, { useRouter } from 'next/router';
import FileUploader from 'react-firebase-file-uploader';

import useValidation from '../hooks/useValidation';
import validationFile from '../validations/validationFile';

const INITIAL_STATE = {
	fileName: '',
    urlYoutube: '',
    signature: '',
	fileDescription: ''
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
    } = useValidation(INITIAL_STATE, validationFile, uploadFile);
    
    const { fileName, urlYoutube, signature, fileDescription } = values;

    // Routing hook
    const router = useRouter();
    
    const { user, firebase } = useContext(FirebaseContext);
    
    async function uploadFile () {
		
		if(!user) {
			return router.push('/login');
        }
        
        setUploadSucess(true)

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
            /* return router.push('/'); */

        }, 3000);
		
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

                        {<div className={`form-group ${errors.signature ? "has-error" : ""}`}>
                            <label className="form-label" htmlFor="signature">Materia</label>
                            <select
                                className="form-select"
                                id="signature"
                                name="signature"
                                value={signature}
                                onChange={handleChange}
                            >
                                <option value="">Choose an option</option>
                                <option value="1">Slack</option>
                                <option value="2">Skype</option>
                                <option value="3">Hipchat</option>
                            </select>

                            { errors.signature && <p className="form-input-hint">{errors.signature}</p> }
                        </div>}

                        <div className="form-group">
                            <label className="form-label" htmlFor="file">Archivo</label>
                            <FileUploader
                                accept="image/*"
                                id="file"
                                name="file"
                                className="form-input"
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

                        <div className="form-group">
                            <label className="form-label" htmlFor="video">Linkear video</label>
                            <div className="input-group">
                                <span className="input-group-addon">www.youtube.com/watch?v=</span>
                                <input type="text" className="form-input" id="video" placeholder="2Juo4TshStY" />
                            </div>
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