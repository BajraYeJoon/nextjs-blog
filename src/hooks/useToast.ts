import { useToastStore, type ToastType } from '@/lib/toast-store';

export function useToast() {
  const addToast = useToastStore((state) => state.addToast);

  const toast = {
    success: (message: string, duration?: number) => {
      addToast({ message, type: 'success', duration });
    },
    error: (message: string, duration?: number) => {
      addToast({ message, type: 'error', duration });
    },
    info: (message: string, duration?: number) => {
      addToast({ message, type: 'info', duration });
    },
    warning: (message: string, duration?: number) => {
      addToast({ message, type: 'warning', duration });
    },
    custom: (message: string, type: ToastType, duration?: number) => {
      addToast({ message, type, duration });
    },
  };

  return toast;
}
