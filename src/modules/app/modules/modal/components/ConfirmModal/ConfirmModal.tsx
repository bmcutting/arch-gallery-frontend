import Button from "@modules/app/modules/ui/components/Button/Button";
import Modal from "@modules/app/modules/modal/components/Modal/Modal";
import useModal from "@modules/app/modules/modal/hooks/useModal";

interface Props {
  message: string;
  onConfirm: () => void;
  onCancel?: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  loading?: boolean;
  children?: React.ReactNode;
}

export default function ConfirmModal({
  message,
  onConfirm,
  onCancel,
  confirmLabel = "Aceptar",
  cancelLabel = "Cancelar",
  loading,
  children,
}: Props) {
  const { handleClose } = useModal();

  return (
    <Modal width={512}>
      <div className="p-8 text-center">
        <p className="mb-6 text-2xl font-bold text-foreground">{message}</p>
        {children && <div className="mb-8">{children}</div>}

        <div className="flex justify-center gap-4">
          <Button
            onClick={onCancel ?? handleClose}
            color="primary"
            size="xl"
            status="idle"
            className="px-6 py-3 text-lg"
          >
            {cancelLabel}
          </Button>
          <Button
            onClick={onConfirm}
            color="danger"
            size="xl"
            status="idle"
            loading={loading}
            className="px-6 py-3 text-lg"
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
