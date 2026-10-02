import { useContext } from "react";
import { ModalContext } from "@modules/app/modules/modal/domain/context";

export default function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal debe usarse dentro de <ModalProvider>");
  }
  return context;
}
