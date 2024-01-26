/**
 * Página estática
 *
 * - Atualmente o conteúdo é gerado no momento em que a requisição é feita
 * - Você deve transformar essa página em uma página estática
 * - A página deve ser gerada no momento da build
 * - A página deve ser atualizada a cada 1 minuto
 */

import { ReactNode, useEffect, useState } from 'react';

import styles from '@/styles/lista.module.css';
import { GetStaticProps, NextPage } from 'next/types';
import { ICity } from '@/types/city.d';

interface DataProps {
	children?: ReactNode,
	data?: ICity[]
}

const apiurl = process.env.NEXT_PUBLIC_APIURL;

export const getStaticProps: GetStaticProps = async () => {
	try { 
	  const response = await fetch(`${apiurl}/api/cities/10`)//.then(res => res.json());

	  if (!response.ok) throw new Error('Erro ao obter os dados');
	  
	  const data = await response.json();

	  return {
		  props: { data },
		  revalidate: 60
	  }
   } catch (error) {
	  console.error(error);
	  return {
		  props: {},
	   };
  }  
}

const Lista: NextPage<DataProps> = (props) => {
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
				</div>
			</div>
		</div>
	);
}

export default Lista;