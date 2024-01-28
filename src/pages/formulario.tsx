/**
 * Formulário
 *
 * - Primeiramente vá até /src/pages/api/users/create.ts e implemente a API
 * - Deve ser implementado utilizando a lib react-hook-form
 * - O formulário deve ter os seguintes campos: nome, e-mail
 * - Os dois campos são obrigatórios e precisam de validação
 * - Ao dar 'submit', deve ser feito uma request para /api/users/create
 * - Lide com os possíveis erros
 */
type Inputs = {
	name: string
	email: string
}

interface ApiError {
	error: string;
}

import { useForm, SubmitHandler } from 'react-hook-form';

import styles from '@/styles/formulario.module.css';

export default function Form() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		try {
			const response = await fetch('/api/users/create', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || 'Erro na requisição');
			}

			alert('Usuário criado com sucesso!');
		} catch (error: unknown) {
			if (error instanceof Error) {
				alert(`Erro ao criar usuário: ${error.message}`);
			  } else {
				// Se for um erro desconhecido
				alert(`Erro desconhecido ao criar usuário`);
				console.error(error);
			  }
		}
	}

	function handleSubmitForm(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		handleSubmit(onSubmit)();
	}

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<form onSubmit={handleSubmitForm}>
					<div className={styles.box} >
						{errors?.name?.type === 'required' && (
							<p className={styles.msgError}>O campo nome é obrigatório.</p>
						)}
						<input
							type="text"
							placeholder="Name"
							{...register('name', { required: true })}
							className={errors?.name && styles.inputError}
						/>
					</div>
					<div className={styles.box}>
						{errors?.email && (
							<p className={styles.msgError}>
								{errors.email?.type === 'required'? 'O campo e-mail é obrigatório.' : errors.email?.message}
							</p>
						)}
						<input
							type="email"
							placeholder="E-mail"
							{...register('email', {
								required: true, pattern: {
									value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
									message: 'Insira um endereço de e-mail válido.',
								}
							})}

							className={errors?.email && styles.inputError}
						/>
					</div>

					<button type="submit" data-type="confirm">
						Enviar
					</button>
				</form>
			</div>
		</div>
	);
}