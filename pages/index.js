import Layout from '../components/Layout';
import Apunte from '../components/Apunte';

export default function Home() {
	return (
		<>
			<Layout>
				
				<div className="column col-6 col-mx-auto">
				
					<Apunte />

					<Apunte />

					<Apunte />

				</div>

			</Layout>
		</>
		
	)
}
