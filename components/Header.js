import { useContext } from 'react';
import Link from 'next/link';
import { css, jsx } from '@emotion/core';
import { FirebaseContext } from '../firebase';

const Header = () => {

    const { user, firebase } = useContext(FirebaseContext);

    return (
        <header className="navbar" css={css`
            padding:20px;
            border-bottom: solid 1px #dadee4;
            margin-bottom:30px;
        `}>
            <section className="navbar-section">
                <div className="input-group">
                    <input type="text" className="form-input" placeholder="Buscar palabras claves" />
                    <button className="btn btn-primary input-group-btn"><i className="icon icon-search"></i></button>
                </div>
            </section>
            <section className="navbar-center">
                <Link href="/">
                    <a
                        className="tooltip tooltip-bottom"
                        data-tooltip="Volver al Inicio"
                    >
                    <img
                        src="/static/logo.png"
                        className="img-responsive"
                        alt="..."
                        css={css`
                        width:80px;
                        cursor:pointer;
                        transition:.3s;

                        &:hover {
                            transform:scale(1.1);
                        }
                    `}/>
                    </a>
                </Link>
            </section>
            <section className="navbar-section">
                { user ? (
                    <>
                    <Link href="/"
                    >
                        <a 
                        onClick={() => firebase.logOut()}
                        className="btn btn-link text-small" css={css`
                            margin-right:20px
                        `}>Cerrar Sesion</a>
                    </Link>
                    <Link href="/subir"><a className="btn btn-primary">Subir Apunte</a></Link>
                    </>
                ) : (
                    <>
                    <Link href="/registrarse"><a className="btn mx-2">Registrarse</a></Link>
                    <Link href="/login"><a className="btn btn-primary">Iniciar Sesion</a></Link>
                    </>
                )}
                
            </section>
        </header>
    );
}
 
export default Header;