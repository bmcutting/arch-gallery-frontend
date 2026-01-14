import { useCallback } from "react";
import { toast } from "react-toastify";
import type { AppException } from "../domain/exception/app";

interface ToastProps {
  message: string;
  id?: string;
}

export default function useToast() {
  const success = useCallback(({ message, id }: ToastProps) => {
    toast.success(message, { toastId: id, autoClose: 5000 });
  }, []);

  const error = useCallback(({ id, message }: ToastProps) => {
    toast.error(message, { toastId: id, autoClose: 5000 });
  }, []);

  const errors = useCallback(
    (err: AppException[]) => {
      for (let i = 0; i < err.length; i++) {
        const e = err[i];

        error({ id: `error-${i}`, message: e.message });
      }
    },
    [error]
  );

  return { error, errors, success };
}
