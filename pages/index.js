import Link from 'next/link'
import Layout from '../components/Layout'
import ListApunte from '../components/ListApunte'
import useApuntes from '../hooks/useApuntes'

export default function Home() {

	const { apuntes } = useApuntes('date');

	return (
		<>
			<Layout>
				
				<div className="column col-6 col-mx-auto">

				{
					apuntes.length === 0 ? (
						<div class="empty">
							<div class="empty-icon">
								<i class="icon icon-minus"></i>
							</div>
							<p class="empty-title h5">Sé el primero</p>
							<p class="empty-subtitle">Todavia no hay ningun apunte subido</p>
							<div class="empty-action">
								<Link href="/subir">
									<a class="btn btn-primary">Subir</a>
								</Link>
							</div>
						</div>
					) : (
						apuntes.map(apunte => (
							<ListApunte
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
