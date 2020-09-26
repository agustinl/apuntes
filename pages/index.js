import Link from 'next/link'
import Layout from '../components/Layout'
import ApuntesList from '../components/ApuntesList'
import useApuntes from '../hooks/useApuntes'

export default function Home() {

	const { apuntes, loading } = useApuntes('date');

	return (
		<>
			<Layout>
				
				<div className="column col-6 col-xl-8 col-md-11 col-mx-auto">

				{ loading ? ( <div className="loading loading-lg"></div> ) :
					apuntes.length === 0 ? (
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
						apuntes.map(apunte => (
							<ApuntesList
								key={apunte.id}
								apunte={apunte}
							/>
						))
					)
				}

				</div>

			</Layout>
		</>
		
	)
}
