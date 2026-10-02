import { useCallback, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import type { ModalProps } from "@modules/app/modules/modal/domain/base";
import { ModalContext } from "@modules/app/modules/modal/domain/context";

interface Props {
  children: React.ReactNode;
}

interface OpenState {
  modal: ModalProps;
  locationKey: string;
}

export default function ModalProvider({ children }: Props) {
  const { key } = useLocation();
  const [state, setState] = useState<OpenState | null>(null);

  // Un modal abierto en otra ruta se considera cerrado.
  const open = state && state.locationKey === key ? state.modal : null;

  const handleOpenModal = useCallback(
    (modal: ModalProps | null) =>
      setState(modal ? { modal, locationKey: key } : null),
    [key],
  );

  const handleClose = useCallback(() => setState(null), []);

  const value = useMemo(
    () => ({ open, handleOpenModal, handleClose }),
    [open, handleOpenModal, handleClose],
  );

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}
