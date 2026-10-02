import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ModalProvider from "@modules/app/modules/modal/components/ModalProvider/ModalProvider";
import AppModals from "@modules/app/components/AppModals";

interface Props {
  children: React.ReactNode;
}

export default function AppProviders({ children }: Props) {
  return (
    <BrowserRouter>
      <ModalProvider>
        <ToastContainer />
        {children}
        <AppModals />
      </ModalProvider>
    </BrowserRouter>
  );
}
