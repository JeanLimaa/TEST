/**
 * Página estática
 *
 * - Atualmente o conteúdo é gerado no momento em que a requisição é feita
 * - Você deve transformar essa página em uma página estática
 * - A página deve ser gerada no momento da build
 * - A página deve ser atualizada a cada 1 minuto
 */

import { ReactNode } from 'react';

import styles from '@/styles/lista.module.css';
import { ICity } from '@/types/city.d';
import { GetStaticProps, NextPage } from 'next';

interface DateProps {
	children?: ReactNode,
	data?: ICity[]
}

export const getStaticProps: GetStaticProps = async () => {
 	/* try { */
		const response = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/api/cities/10`)//.then(res => res.json());
		const data = await response.json();

		if (!response.ok) throw new Error('Erro ao obter os dados');

		return {
			props: {
				data
			},
			revalidate: 60
		}
/* 	} catch (error) {
		console.error(error);
		return {
			props: {},
	 	};
	}  */
}

const Static: NextPage<DateProps> = (props) => {
	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<h2>Lista de cidades</h2>

				<div data-list-container>
					{props.data?.map((city) => (
						<div key={city.id}>
							{city.name} - {city?.date.toLocaleString()}
						</div>
					))}
					{/* <h2>{props.data?.name} - {props.data?.date?.toLocaleString()}</h2>  */}
				</div>
			</div>
		</div>
	);
}

export default Static