import Layout from '../../components/Layout';
import Comment from '../../components/Comment'

import { css, jsx } from '@emotion/core'

const Apunte = () => {
    return (
        <>
            <Layout>
                <div className="column col-8 col-mx-auto">
                    
                    <div className="columns">

                        <div className="column col-12">
                            <h2>Nombre del Apunte</h2>
                            <p className="text-gray">Nombre de la materia</p>
                        </div>

                        <div className="column col-8 col-mx-auto">

                            <img src="https://via.placeholder.com/900x1200" className="img-responsive ..." alt="..."></img>

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
                                <img src="https://api.adorable.io/avatars/45/abott@adorable.png" className="avatar avatar-sm" />
                                Por: Yan Zhu
                            </div>
                            
                            <span className="chip mb-1">50 Puntos</span>

                            <p className="text-small mt-2">
                                Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi.
                            </p>

                            <p className="text-italic text-tiny mt-1"><i className="mb-1 icon icon-time"></i> Publicado hace: 20 minutos</p>                            

                        </div>

                        <div className="column col-12">

                            <h4>Comentarios</h4>

                            <Comment />

                            <Comment />

                            <Comment />
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