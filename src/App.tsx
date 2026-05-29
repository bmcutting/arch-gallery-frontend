import { Navigate, Route, Routes } from "react-router-dom";
import { APP_ROUTES } from "./modules/app/domain/constants/app-routes";
import AppProviders from "./providers/AppProviders";
import ProtectedRoute from "./modules/app/components/ProtectedRoute";
import Login from "./containers/Auth/Login/Login";
import SignUp from "./containers/Auth/SignUp/SignUp";
import Home from "./containers/Home/Home";
import Profile from "./containers/Profile/Profile";
import ProfileManagement from "./containers/EditProfile/EditProfile";
import Search from "./containers/Search/Search";
import Architects from "./containers/Architects/Architects";

export default function App() {
  return (
    <AppProviders>
      <Routes>
        <Route path="/" element={<Navigate replace to={APP_ROUTES.LOGIN} />} />
        <Route path={APP_ROUTES.LOGIN} element={<Login />} />
        <Route path={APP_ROUTES.SIGNUP} element={<SignUp />} />
        <Route
          path={APP_ROUTES.HOME}
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path={APP_ROUTES.PROFILE}
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path={APP_ROUTES.SEARCH}
          element={
            <ProtectedRoute>
              <Search />
            </ProtectedRoute>
          }
        />
        <Route
          path={APP_ROUTES.ARCHITECTS}
          element={
            <ProtectedRoute>
              <Architects />
            </ProtectedRoute>
          }
        />
        <Route
          path={APP_ROUTES.ARCHITECT_DETAIL}
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path={APP_ROUTES.PROFILEMANAGEMENT}
          element={
            <ProtectedRoute>
              <ProfileManagement />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AppProviders>
  );
}
