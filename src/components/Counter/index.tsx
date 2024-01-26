import { useState, useEffect, useRef, useLayoutEffect } from 'react';

type CounterProps = {
	initialCount: number;
};

export const Counter: React.FC<CounterProps> = ({ initialCount }) => {
	const [count, setCount] = useState(initialCount);
	const isMounted = useRef(false);

	useEffect(() => {
		console.log('Componente montado!');

		isMounted.current = true;

		return () => {
			console.log('Componente desmontado!');
			isMounted.current = false;
		};
	}, []);

	useLayoutEffect(() => {
		//Disparar o evento somente se estiver montado
		if(isMounted.current) {
			console.log('Componente atualizado!');
			window.dispatchEvent(new CustomEvent('onCounterUpdate', { detail: { value: count }}));

			if(count >= 10) window.dispatchEvent(new CustomEvent('onCounterUnmount'));
		}
	}, [count]);

	const handleIncrement = () => {
		setCount((prevCount) => prevCount + 1);
	};

	return (
		<div>
			<h2>Contador: {count}</h2>
			<button onClick={handleIncrement}>Incrementar +</button>
		</div>
	);
};
