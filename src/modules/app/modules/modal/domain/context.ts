import { createContext } from "react";
import type { ModalProps } from "@modules/app/modules/modal/domain/base";

export interface ModalContextValue {
  open: ModalProps | null;
  handleOpenModal: (modal: ModalProps | null) => void;
  handleClose: () => void;
}

export const ModalContext = createContext<ModalContextValue | null>(null);
