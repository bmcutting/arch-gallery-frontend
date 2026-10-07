import { Navigate } from "react-router-dom";
import { APP_ROUTES } from "@modules/app/domain/constants/app-routes";
import { useUserContext } from "@modules/user/context/useUserContext";
import SplashScreen from "@modules/app/components/SplashScreen/SplashScreen";

interface Props {
  children: React.ReactNode;
}

export default function PublicRoute({ children }: Props) {
  const { user, loading } = useUserContext();

  if (loading) {
    return <SplashScreen />;
  }

  if (user) {
    return <Navigate to={APP_ROUTES.HOME} replace />;
  }

  return <>{children}</>;
}
