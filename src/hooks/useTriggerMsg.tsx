import { IToastMessage } from '@/types/toast-message';
import { useToast } from '@/components/ToastMessage/ToastContext';


export const useTriggerMsg = () => {
    const { addMessage, lastId } = useToast(); 
    
    const handleSuccessButtonClick = () => {
        const successMessage: IToastMessage = {
          id: lastId,
          message: 'Mensagem de sucesso',
          type: 'success',
        };
        addMessage(successMessage);
      };
    
    const handleErrorButtonClick = () => {
        const errorMessage: IToastMessage = {
          id: lastId,
          message: 'Mensagem de erro',
          type: 'error',
        };
        addMessage(errorMessage);
      };

    return { handleErrorButtonClick, handleSuccessButtonClick };
}