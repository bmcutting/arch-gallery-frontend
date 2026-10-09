import { FaTimes } from "react-icons/fa";
import Button from "@modules/app/modules/ui/components/Button/Button";
import Modal from "@modules/app/modules/modal/components/Modal/Modal";
import useModal from "@modules/app/modules/modal/hooks/useModal";
import Form from "@modules/app/modules/ui/components/Form/Form";
import type { FormSubmit } from "@modules/app/modules/ui/components/Form/domain/form-submit";

interface Props {
  title: string;
  icon?: React.ReactNode;
  onSubmit: (submit: FormSubmit) => void;
  submitText?: string;
  cancelText?: string;
  loading?: boolean;
  submitDisabled?: boolean;
  width?: number;
  children: React.ReactNode;
}

export default function FormModal({
  title,
  icon,
  onSubmit,
  submitText = "Guardar",
  cancelText = "Cancelar",
  loading,
  submitDisabled,
  width = 512,
  children,
}: Props) {
  const { handleClose } = useModal();

  return (
    <Modal width={width} closeOnBackdrop={false} scrollBody={false}>
      <Form onSubmit={onSubmit} className="flex min-h-0 flex-1 flex-col">
        <div className="flex shrink-0 items-center justify-between gap-2 px-6 pt-6 pb-4">
          <div className="flex items-center gap-2">
            {icon}
            <h2 className="text-2xl font-bold text-secondary">{title}</h2>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="rounded p-1 hover:bg-muted"
            aria-label="Cerrar"
          >
            <FaTimes />
          </button>
        </div>

        <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-6 pb-4">
          {children}
        </div>

        <div className="flex shrink-0 justify-center gap-3 border-t border-border px-6 py-4">
          <Button type="button" size="lg" onClick={handleClose}>
            {cancelText}
          </Button>
          <Button
            type="submit"
            size="lg"
            loading={loading}
            disabled={submitDisabled}
          >
            {submitText}
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
