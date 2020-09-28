import { useContext, useState } from 'react';
import Link from 'next/link';
import { css, jsx } from '@emotion/core';
import { FirebaseContext } from '../firebase';
import Router from 'next/router';

const Header = () => {

    const [ search, setSearch] = useState('');

    const { user, firebase } = useContext(FirebaseContext);

    const searchApunte = e => {
        e.preventDefault();

        if(search.trim() === '') return;

        Router.push({
            pathname: '/buscar', 
            query: { q : search }
        })
    }

    return (
        <header className="navbar" css={css`
            padding:20px;
            border-bottom: solid 1px #dadee4;
            margin-bottom:30px;
        `}>
            <section className="navbar-section col-sm-12">
                <form
                    className="input-group col-mx-auto"
                    onSubmit={searchApunte}
                >
                    <input                    
                        type="text"
                        className="form-input"
                        placeholder="Buscar palabras claves"
                        onChange={e =>  setSearch(e.target.value) }
                        />
                    <button className="btn btn-primary input-group-btn" type="submit"><i className="icon icon-search"></i></button>
                </form>
            </section>
            <section className="navbar-center col-sm-12">
                <Link href="/">
                    <a
                        className="tooltip tooltip-bottom col-mx-auto"
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

                        @media (max-width: 600px) {
                            margin: 10px 0
                        }

                        &:hover {
                            transform:scale(1.1);
                        }
                    `}/>
                    </a>
                </Link>
            </section>
            <section className="navbar-section col-sm-12">
                <div className="btn-group btn-group-block col-mx-auto">
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
                </div>                
            </section>
        </header>
    );
}
 
export default Header;