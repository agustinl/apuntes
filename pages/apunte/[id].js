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
    const [ query, setQuery ] = useState(true);
    const [ commentError, setCommentError ] = useState('');

    const router = useRouter();
    const { query: { id }} = router;

    const { firebase, user } = useContext(FirebaseContext);

    useEffect(() => {
        if(id && query) {
            const obtenerProducto = async () => {
                const apunteQuery = await firebase.db.collection('apuntes').doc(id);
                const apunte = await apunteQuery.get();
                if(apunte.exists) {
                   setApunte( apunte.data() );
                   setQuery(false);
                } else {
                    setError(true);
                    setQuery(false);
                }
            }
            obtenerProducto();
        }
    }, [id, query]);
    
    if(Object.keys(apunte).length === 0 && !error) return 'Cargando...';

    const { author, comments, date, fileDescription, fileName, fileUrl, urlYoutube,  signature, votes, whoVoted } = apunte;

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

        // there is a vote, therefore query the BD
        setQuery(true);
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

        if (Object.keys(comment).length === 0 || comment.comment.trim() === "") {
            setCommentError("El comentario no puede estar vacio")
            return;
        }

        setCommentError("");

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

        setComment({});
        setQuery(true);
    }
    
    return (
        <>
            <Layout>
                <div className="column col-8 col-md-10 col-mx-auto">
                    
                    <div className="columns">

                        <div className="column col-12">
                            <h2>{fileName}</h2>
                            <p className="text-gray">{signature}</p>
                        </div>

                        <div className="column col-10 col-mx-auto">

                            {
                                fileUrl.includes(".pdf") ? (
                                    <iframe src={fileUrl} width="100%" height="700px"></iframe>
                                ) : (
                                    <img src={fileUrl} className="img-responsive" alt={fileName}></img>
                                )
                            }

                            {
                                urlYoutube ? (
                                    <div class="video-responsive video-responsive-4-3">
                                        <iframe src={`https://www.youtube.com/embed/${urlYoutube}`} width="560" height="315" frameborder="0" allowfullscreen></iframe>
                                    </div>
                                ) : null
                            }

                        </div>

                        <div className="column col-12" css={css`
                            margin: 20px 0;
                        `}>

                            <div className="col-4 col-mx-auto" css={css`
                            margin: 20px auto;
                        `}>
                                <div className="btn-group btn-group-block">
                                    <button
                                        className={`btn btn-primary btn-block ${!user ? "disabled tooltip tooltip-bottom" : ""}`}
                                        data-tooltip="Necesitas registrate para poder votar"
                                        onClick={voteApunte}
                                    >
                                        <i className="icon icon-plus"></i> Votar</button>
                                    {/* <a
                                        href={fileUrl}
                                        className="btn btn-primary btn-block"
                                        download={fileName}><i className="icon icon-download"
                                    ></i> Descargar</a> */}
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
                                            key={`${comment.userId}-${i}`}
                                            commentData={comment}
                                            authorId={author.id}
                                        />
                                    ))
                                )
                            }
                        </div>

                        <div className="column col-12 mt-2">

                            {
                                user ? (
                                    <form
                                        onSubmit={addComment}
                                    >
                                        <div className={`form-group ${commentError ? "has-error" : ""}`}>
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

                                            { commentError && <p className="form-input-hint">{commentError}</p> }
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