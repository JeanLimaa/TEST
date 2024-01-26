/**
 * Lista
 *
 * - Primeiramente vá até /src/pages/api/users/index.ts e implemente a API
 * - Obter a lista de usuários da API
 * - Renderizar a lista de usuários
 */

import { useEffect, useState } from 'react';

import styles from '@/styles/lista.module.css';
import { IUser } from '@/types/user';

export default function Lista() {
	const [users, setUsers] = useState<Array<IUser>>([]);
	const [error, setError] = useState(''); //estado para caso haja erro na chamada

	async function getUsersList() {
		try {
			const response = await fetch('/api/users');
			const data = await response.json();

			if (!response.ok) throw new Error('Erro ao obter os dados');
			
			setUsers(data);
		} catch (error) {
			setError('Erro ao obter os usuários. Por favor, recarregue a página.');
			console.error(error);
		}
	}

	useEffect(() => {
		getUsersList();
	}, []);

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<h2>Lista de usuários</h2>

				<div data-list-container>
					{error && <div data-error>{error}</div>}

					{users.map((user) => (
						<div data-list-item key={user.id}>ID {user.id} - {user.name} ({user.email})</div>
					))}
				</div>
			</div>
		</div>
	);
}
