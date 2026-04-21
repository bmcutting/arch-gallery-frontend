import { Navigate } from "react-router-dom";
import {
  LOCAL_STORAGE_KEY,
  LocalStorage,
} from "../entities/local-storage";
import { APP_ROUTES } from "../domain/constants/app-routes";

interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const token = LocalStorage.get(LOCAL_STORAGE_KEY.ACCESS_TOKEN);

  if (!token) {
    return <Navigate to={APP_ROUTES.LOGIN} replace />;
  }

  return <>{children}</>;
}
