import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ModalProvider from "@modules/app/modules/modal/components/ModalProvider/ModalProvider";
import AppModals from "@modules/app/components/AppModals";
import UserProvider from "@modules/user/context/UserProvider";

interface Props {
  children: React.ReactNode;
}

export default function AppProviders({ children }: Props) {
  return (
    <BrowserRouter>
      <UserProvider>
        <ModalProvider>
          <ToastContainer />
          {children}
          <AppModals />
        </ModalProvider>
      </UserProvider>
    </BrowserRouter>
  );
}
