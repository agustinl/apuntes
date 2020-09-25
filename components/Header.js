import Link from 'next/link'
import { css, jsx } from '@emotion/core'

const Header = () => {
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
                    <img src="/static/logo.png" class="img-responsive ..." alt="..." css={css`
                        width:80px;
                        cursor:pointer;
                        transition:.3s;

                        &:hover {
                            transform:scale(1.1);
                        }
                    `}/>
                </Link>
            </section>
            <section className="navbar-section">
                <Link href="/registrarse"><a className="btn mx-2">Registrarse</a></Link>
                <Link href="/login"><a className="btn btn-primary">Iniciar Sesion</a></Link>
                <Link href="/cerrar-sesion"><a className="btn btn-link">Cerrar Sesion</a></Link>
                <Link href="/subir"><a className="btn btn-primary">Subir Apunte</a></Link>
            </section>
        </header>
    );
}
 
export default Header;