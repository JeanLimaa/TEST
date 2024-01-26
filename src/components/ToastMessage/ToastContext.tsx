import { createContext, ReactNode, useContext, useState } from 'react';
import { IToastMessage } from '@/types/toast-message';

type ToastContextData = {
  addMessage: (message: IToastMessage) => void;
  handleCloseMessage: (id: string) => void;
  lastId: string;
  messages: Array<IToastMessage>;
};

const ToastContext = createContext<ToastContextData | undefined>(undefined);

type ToastProviderProps = {
  children: ReactNode;
};

export function ToastProvider({ children }: ToastProviderProps) {
  const [messages, setMessages] = useState<Array<IToastMessage>>([]);
  let lastId = String(messages.length + 1);

  //adicionar ao array de mensagens
  const addMessage = (message: IToastMessage) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };
  
  const handleCloseMessage = (id: string) => {
    setMessages((prevMessages) => prevMessages.filter((message) => message.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addMessage, handleCloseMessage, lastId, messages }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
}
