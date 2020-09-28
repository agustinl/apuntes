import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link'
import Layout from '../components/Layout'
import ApuntesList from '../components/ApuntesList'
import useApuntes from '../hooks/useApuntes'

const Buscar = () => {

    const router = useRouter();
    const { query: { q }} = router;

    const { apuntes, loading } = useApuntes('date');
    const [ result, setResult ] = useState([]);

    useEffect(() => {
        const search = q.toLowerCase();
        const filter =  apuntes.filter(apunte => {
            return (
                apunte.fileName.toLowerCase().includes(search) || 
                apunte.fileDescription.toLowerCase().includes(search) ||
                apunte.signature.toLowerCase().includes(search)
            )
        });
        setResult(filter);
        
    }, [ q, apuntes ]);

    return (
		<Layout>
            <div className="column col-6 col-xl-8 col-md-11 col-mx-auto">

            { loading ? ( <div className="loading loading-lg"></div> ) :
                result.length === 0 ? (
                    <div className="empty">
                        <div className="empty-icon">
                            <i className="icon icon-minus"></i>
                        </div>
                        <p className="empty-title h5">Sé el primero</p>
                        <p className="empty-subtitle">Todavia no hay ningun apunte subido</p>
                        <div className="empty-action">
                            <Link href="/subir">
                                <a className="btn btn-primary">Subir</a>
                            </Link>
                        </div>
                    </div>
                ) : (
                    result.map(apunte => (
                        <ApuntesList
                            key={apunte.id}
                            apunte={apunte}
                        />
                    ))
                )
            }

            </div>
        </Layout>
    );
}
 
export default Buscar;