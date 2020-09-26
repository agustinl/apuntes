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
    const [ consultarDB, guardarConsultarDB ] = useState(true);

    const router = useRouter();
    const { query: { id }} = router;

    const { firebase, user } = useContext(FirebaseContext);

    useEffect(() => {
        if(id && consultarDB) {
            const obtenerProducto = async () => {
                const apunteQuery = await firebase.db.collection('apuntes').doc(id);
                const apunte = await apunteQuery.get();
                if(apunte.exists) {
                   setApunte( apunte.data() );
                   guardarConsultarDB(false);
                } else {
                    setError( true );
                    guardarConsultarDB(false);
                }
            }
            obtenerProducto();
        }
    }, [id]);
    
    if(Object.keys(apunte).length === 0 && !error)  return 'Cargando...';

    const { author, comments, date, fileDescription, fileName, fileUrl, signature, votes, whoVoted } = apunte;

     // Administrar y validar los votos
     const votarProducto = () => {
        if(!usuario) {
            return router.push('/login')
        }

        // obtener y sumar un nuevo voto
        const nuevoTotal = votos + 1;

        // Verificar si el usuario actual ha votado
        if(haVotado.includes(usuario.uid) ) return;

        // guardar el ID del usuario que ha votado
        const nuevoHaVotado = [...haVotado, usuario.uid];

        //  Actualizar en la BD
        firebase.db.collection('productos').doc(id).update({ 
            votos: nuevoTotal, 
            haVotado: nuevoHaVotado 
        })

        // Actualizar el state
        setApunte({
            ...apunte,
            votos: nuevoTotal
        })

        guardarConsultarDB(true); // hay un voto, por lo tanto consultar a la BD
    }

    // Funciones para crear comentarios
    const comentarioChange = e => {
        setComment({
            ...comment,
            [e.target.name] : e.target.value
        })
    }

    // Identifica si el comentario es del creador del producto
    const esCreador = id => {
        if(creador.id == id) {
            return true;
        }
    }

    const agregarComentario = e => {
        e.preventDefault();

        if(!usuario) {
            return router.push('/login')
        }

        // información extra al comentario
        comentario.usuarioId = usuario.uid;
        comentario.usuarioNombre = usuario.displayName;

        // Tomar copia de comentarios y agregarlos al arreglo
        const nuevosComentarios = [...comentarios, comentario];

        // Actualizar la BD
        firebase.db.collection('productos').doc(id).update({
            comentarios: nuevosComentarios
        })

        // Actualizar el state
        setApunte({
            ...apunte,
            comentarios: nuevosComentarios
        })

        guardarConsultarDB(true); // hay un COMENTARIO, por lo tanto consultar a la BD
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
                                    <button className="btn btn-block"><i className="icon icon-plus"></i> Votar</button>
                                    <button className="btn btn-primary btn-block"><i className="icon icon-download"></i> Descargar</button>
                                </div>
                            </div>

                            <div className="chip">
                                <img src={`https://api.adorable.io/avatars/45/${user.displayName}.png`} className="avatar avatar-sm" />
                                Por: {user.displayName}
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
                                    <div class="empty">
                                        <div class="empty-icon">
                                            <i class="icon icon-message icon-3x"></i>
                                        </div>
                                        <p class="empty-title h5">Sé el primero</p>
                                        <p class="empty-subtitle">Todavia no hay ningun comentario</p>
                                    </div>
                                ) : (
                                    <Comment />
                                )
                            }
                        </div>

                        <div className="column col-12">

                            <form>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="comment">Deja tu comentario:</label>
                                    <textarea className="form-input" id="comment" placeholder="Comentario" rows="3"></textarea>
                                </div>

                                <button className="btn btn-primary float-right mt-2">Enviar</button>
                            </form>

                        </div>

                    </div>

                </div>
            </Layout>
        </>
    );
}
 
export default Apunte;