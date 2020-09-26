import { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { FirebaseContext } from '../../firebase';

import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { es } from 'date-fns/locale';

import Layout from '../../components/Layout';
import Comment from '../../components/Comment';

import { css } from '@emotion/core';

const Apunte = () => {
    
    // Apunte State
    const [ apunte, setApunte ] = useState({});
    const [ error, setError ] = useState(false);
    const [ comment, setComment ] = useState({});
    const [ consult, setConsult ] = useState(true);

    const router = useRouter();
    const { query: { id }} = router;

    const { firebase, user } = useContext(FirebaseContext);

    useEffect(() => {
        if(id && consult) {
            const obtenerProducto = async () => {
                const apunteQuery = await firebase.db.collection('apuntes').doc(id);
                const apunte = await apunteQuery.get();
                if(apunte.exists) {
                   setApunte( apunte.data() );
                   setConsult(false);
                } else {
                    setError( true );
                    setConsult(false);
                }
            }
            obtenerProducto();
        }
    }, [id, consult]);
    
    if(Object.keys(apunte).length === 0 && !error) return 'Cargando...';

    const { author, comments, date, fileDescription, fileName, fileUrl, signature, votes, whoVoted } = apunte;

    const voteApunte = () => {
        if(!user) {
            return router.push('/login')
        }

        // Get vote and add one
        const newVote = votes + 1;

        // Check if the user voted before
        if(whoVoted.includes(user.uid) ) return;

        // Save now user ID vote
        const newUserVote = [...whoVoted, user.uid];

        // Set vote
        firebase.db.collection('apuntes').doc(id).update({ 
            votes: newVote, 
            whoVoted: newUserVote 
        })

        setApunte({
            ...apunte,
            votes: newVote
        })

        // there is a vote, therefore consult the BD
        setConsult(true);
    }

    const handleCommentChange = e => {
        setComment({
            ...comment,
            [e.target.name] : e.target.value
        })
    }    

    const addComment = e => {
        e.preventDefault();

        if(!user) {
            return router.push('/login')
        }

        // Add extra info to comment
        comment.userId = user.uid;
        comment.userName = user.displayName;

        const newComment = [...comments, comment];

        firebase.db.collection('apuntes').doc(id).update({
            comments: newComment
        })

        setApunte({
            ...apunte,
            comments: newComment
        })

        setConsult(true);
    }

    // función que revisa que el creador del producto sea el mismo que esta autenticado
    const puedeBorrar = () => {
        if(!usuario) return false;

        if(creador.id === usuario.uid) {
            return true
        }
    }

    // elimina un producto de la bd
    const eliminarProducto = async () => {

        if(!usuario) {
            return router.push('/login')
        }

        if(creador.id !== usuario.uid) {
            return router.push('/')
        }

        try {
            await firebase.db.collection('productos').doc(id).delete();
            router.push('/')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Layout>
                <div className="column col-8 col-mx-auto">
                    
                    <div className="columns">

                        <div className="column col-12">
                            <h2>{fileName}</h2>
                            <p className="text-gray">{signature}</p>
                        </div>

                        <div className="column col-8 col-mx-auto">

                            <img src={fileUrl} className="img-responsive" alt={fileName}></img>

                        </div>

                        <div className="column col-12" css={css`
                            margin: 20px 0;
                        `}>

                            <div className="col-8 col-mx-auto" css={css`
                            margin: 20px auto;
                        `}>
                                <div className="btn-group btn-group-block">
                                    <button
                                        className={`btn btn-block ${!user ? "disabled tooltip tooltip-bottom" : ""}`}
                                        data-tooltip="Necesitas registrate para poder votar"
                                        onClick={voteApunte}
                                    >
                                        <i className="icon icon-plus"></i> Votar</button>
                                    <button className="btn btn-primary btn-block"><i className="icon icon-download"></i> Descargar</button>
                                </div>
                            </div>

                            <div className="chip">
                                <img src={`https://api.adorable.io/avatars/45/${author.username}.png`} className="avatar avatar-sm" />
                                Por: {author.username}
                            </div>
                            
                            <span className="chip mb-1">{votes === 1 ? votes + " Punto" : votes + " Puntos"}</span>

                            <p className="text-small mt-2">
                                {fileDescription}
                            </p>

                            <p className="text-italic text-tiny mt-1"><i className="mb-1 icon icon-time"></i> Publicado hace { formatDistanceToNow( new Date(date), {locale: es} )}</p>                            

                        </div>

                        <div className="column col-12">

                            <h4>Comentarios</h4>

                            {
                                comments.length === 0 ? (
                                    <div className="empty">
                                        <div className="empty-icon">
                                            <i className="icon icon-message icon-3x"></i>
                                        </div>
                                        <p className="empty-title h5">Sé el primero</p>
                                        <p className="empty-subtitle">Todavia no hay ningun comentario</p>
                                    </div>
                                ) : (
                                    comments.map((comment, i) => (
                                        <Comment
                                            key={`${comment.usuarioId}-${i}`}
                                            commentData={comment}
                                            authorId={author.id}
                                        />
                                    ))
                                )
                            }
                        </div>

                        <div className="column col-12">

                            {
                                user ? (
                                    <form
                                        onSubmit={addComment}
                                    >
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="comment">Deja tu comentario:</label>
                                            <textarea
                                                className="form-input"
                                                id="comment"
                                                placeholder="Comentario"
                                                rows="3"
                                                name="comment"
                                                onChange={handleCommentChange}
                                            >
                                            </textarea>
                                        </div>

                                        <button className="btn btn-primary float-right mt-2">Enviar</button>
                                    </form>
                                ) : (
                                    <div class="toast toast-primary">
                                        Necesitas registrarte para poder comentar
                                    </div>
                                )
                            }

                        </div>

                    </div>

                </div>
            </Layout>
        </>
    );
}
 
export default Apunte;