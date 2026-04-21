import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

interface Props {
  children: React.ReactNode;
}

export default function AppProviders({ children }: Props) {
  return (
    <BrowserRouter>
      <ToastContainer />
      {children}
    </BrowserRouter>
  );
}
