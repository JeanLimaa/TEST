/**
 * Ciclo de Vida
 *
 * - No evento de montagem deste component, deve ser registrados os seguintes events listeners:
 *  	- onCounterMount
 * 		- onCounterUnmount
 * 		- onCounterUpdate
 * - Os eventos devem ser disparados no componente Counter, seguindo o ciclo de vida do mesmo
 * - Ao atualizar o contador, deverá ser passado o valor atualizado no evento onCounterUpdate, e quando o valor
 * 		chegar a 10, o Counter deve ser desmontado.
 *
 * (Opcional)
 * - Ao observar os eventos, você verá que eles são disparados mais de uma vez, isso acontece porque o componente
 * 		Counter é desmontado e montado novamente, e os eventos são registrados novamente, isto é um problema comum
 * 		no nextjs, você deve resolver este problema.
 */

import { GetServerSideProps } from 'next/types';
import styles from '@/styles/ciclo-de-vida.module.css';
import { Counter } from '@/components/Counter';
import { useEffect, useState } from 'react';

type CicloDeVidaProps = {
  initialCount: number;
};

export default function CicloDeVida({ initialCount }: CicloDeVidaProps) {
  const [showCounter, setShowCounter] = useState(false);

  function handleOcultCounterClick() {
    setShowCounter((prevState) => !prevState);
  }

  useEffect(() => {
    const handleCounterMount = () => {
      console.log('onCounterMount');
    };

    const handleCounterUnmount = () => {
      console.log('onCounterUnmount');
    };

    const handleCounterUpdate = (event: CustomEventInit) => {
      console.log('onCounterUpdate', event.detail.value);
      
      if (event.detail.value >= 10) {
        setShowCounter(false);
      }
    };

    window.addEventListener('onCounterMount', handleCounterMount);
    window.addEventListener('onCounterUnmount', handleCounterUnmount);
    window.addEventListener('onCounterUpdate', handleCounterUpdate);

    // Limpeza dos ouvintes de eventos ao desmontar o componente
    return () => {
      window.removeEventListener('onCounterMount', handleCounterMount);
      window.removeEventListener('onCounterUnmount', handleCounterUnmount);
      window.removeEventListener('onCounterUpdate', handleCounterUpdate);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div>
        <button type="button" onClick={handleOcultCounterClick}>
          {showCounter ? 'Ocultar contador' : 'Mostrar contador'}
        </button>

        {showCounter && (
          <>
            <h1>Exemplo de Ciclo de vida</h1>

            <div data-content>
              <Counter initialCount={initialCount} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<CicloDeVidaProps> = async () => {
  return {
    props: {
      initialCount: 0,
    },
  };
};
