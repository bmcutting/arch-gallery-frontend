import { useEffect } from "react";
import useModal from "@modules/app/modules/modal/hooks/useModal";

interface Props {
  children: React.ReactNode;
  width?: number;
  onClose?: () => void;
  closeOnBackdrop?: boolean;
  scrollBody?: boolean;
}

export default function Modal({
  children,
  width = 512,
  onClose,
  closeOnBackdrop = true,
  scrollBody = true,
}: Props) {
  const { handleClose } = useModal();
  const close = onClose ?? handleClose;

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [close]);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onMouseDown={(e) => {
        if (closeOnBackdrop && e.target === e.currentTarget) close();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        style={{ maxWidth: width }}
        className="flex w-full max-h-[calc(100dvh-2rem)] flex-col overflow-hidden rounded-xl bg-white shadow-2xl animate-fadeIn"
      >
        <div
          className={`flex min-h-0 flex-1 flex-col ${scrollBody ? "overflow-y-auto" : ""}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
