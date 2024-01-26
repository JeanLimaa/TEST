/**
 * Modal de confirmação
 *
 * - Crie um component para o modal de confirmação
 * - Utilize o código abaixo como base
 * - O modal deve ser aberto ao clicar no botão "Abrir modal de confirmação"
 * - O título deve ser "Confirmação"
 * - O conteudo deve ser dinâmico
 */

import { useState } from 'react';
import Head from 'next/head';

import styles from '@/styles/modal.module.css';
import { Modal } from '@/components/Modal';

export default function Home() {
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [confirmText, setConfirmText] = useState(false);

 	function handleConfirmation(ev: any){ //falta por o tipo
		let inputText = ev.target.value.toUpperCase();
		setConfirmText(inputText === 'SIM');
	}
 
	function handleModalConfirm(){
		alert("Confirmado!");
		setConfirmText(false); //resetar setConfirmText
	}

	function renderModalContent() {
		return(
			<div onClick={e => e.stopPropagation()}>
				<h5>Para confirmar, digite "SIM" na caixa abaixo.</h5>
				<input type="text" onChange={handleConfirmation}/>
			</div>
		)
	}

	return (
		<>
			<main className={styles.container}>
				<button type="button" onClick={() => setModalIsOpen(true)}>
					Abrir modal de confirmação
				</button>
			</main>

			{/* Renderizar modal de confirmação */}
			<Modal 
				isOpen={modalIsOpen}
				onClose={() => setModalIsOpen(false)}
				onConfirm={handleModalConfirm}
				title='Confirmação'
				footer={{confirmText: 'Confirmar'}}
				disabledBtn={!confirmText} //é necessário inverter, pois se disabled === true, o botão é desativado
			>
				{renderModalContent()}
			</Modal>
		</>
	);
}
