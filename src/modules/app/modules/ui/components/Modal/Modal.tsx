import React from "react";
import Button from "../Button/Button";

interface ModalProps {
  message: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  children?: React.ReactNode;
}

export default function Modal({
  message,
  onConfirm,
  onCancel,
  confirmLabel = "Aceptar",
  cancelLabel = "Cancelar",
  children,
}: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-lg w-full text-center">
        <p className="text-2xl font-bold text-gray-800 mb-6">{message}</p>
        {children && <div className="mb-8">{children}</div>}

        <div className="flex justify-center gap-4">
          {onCancel && (
            <Button
              onClick={onCancel}
              color="primary"
              size="xl"
              status="idle"
              className="px-6 py-3 text-lg"
            >
              {cancelLabel}
            </Button>
          )}
          {onConfirm && (
            <Button
              onClick={onConfirm}
              color="danger"
              size="xl"
              status="idle"
              className="px-6 py-3 text-lg"
            >
              {confirmLabel}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
