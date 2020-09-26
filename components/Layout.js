import Head from 'next/head'
import Header from './Header'
import { css, jsx } from '@emotion/core'

const Layout = props => {
    return (
        <>
        <Head>
			<title>Apuntes</title>
			<link rel="stylesheet" href="https://unpkg.com/spectre.css/dist/spectre.min.css" />
			<link rel="stylesheet" href="https://unpkg.com/spectre.css/dist/spectre-icons.min.css" />
		</Head>

        <Header />

        <div className="container" css={css`
            max-width:1280px;
            padding-bottom:50px;
        `}>
            <div className="columns">
                {props.children}
            </div>
        </div>
        </>
    );
}
 
export default Layout;