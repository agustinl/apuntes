import Head from 'next/head'
import Header from './Header';

const Layout = props => {
    return (
        <>
        <Head>
			<title>Apuntes</title>
			<link rel="stylesheet" href="https://unpkg.com/spectre.css/dist/spectre.min.css" />
			<link rel="stylesheet" href="https://unpkg.com/spectre.css/dist/spectre-icons.min.css" />
		</Head>

        <Header />

        <div class="container">
            <div class="columns">
                {props.children}
            </div>
        </div>
        </>
    );
}
 
export default Layout;