/**
 * Página estática
 *
 * - Atualmente o conteúdo é gerado no momento em que a requisição é feita
 * - Você deve transformar essa página em uma página estática
 * - A página deve ser gerada no momento da build
 * - A página deve ser atualizada a cada 1 minuto
 */
import styles from '@/styles/lista.module.css';
import { GetStaticProps, NextPage } from 'next/types';
import { ICity } from '@/types/city.d';
import citiesDb from '@/utils/citiesDb.json'; //db com algumas cidades, para caso de erro na chamada da API no instante de build.

interface ListaProps {
	list: ICity[];
}

const Lista: NextPage<ListaProps> = ({ list }) => {
	return (
	  <div className={styles.container}>
		<div className={styles.content}>
		  <h2>Lista de cidades</h2>
		  <div data-list-container>
			{list.map((city) => (
			  <div data-list-item key={city.id}>
				{city.name}
			  </div>
			))}
		  </div>
		</div>
	  </div>
	);
};

export const getStaticProps: GetStaticProps<ListaProps> = async () => {
	try {	
	  const response = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/api/cities/10`);
	  if (!response.ok) {
		throw new Error('Erro ao obter os dados');
	  }
	  const data = await response.json();
  
	  return {
		props: { list: data },
		revalidate: 60, // Revalida a cada 60 segundos (1 minuto)
	  };
	} catch (error) {
	  console.error(error);

	  return {
		props: { list: citiesDb }, // retorna uma base com 10 cidades - para o caso de dar erro - podendo aguardar a proxima revalidação pra chamada da API
		revalidate: 60, //revalidar em caso de erro. Atualizando em seguida com os dados da API
	  };
	}
};

export default Lista;