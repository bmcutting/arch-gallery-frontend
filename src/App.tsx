import { Navigate, Route, Routes } from "react-router-dom";
import { APP_ROUTES } from "./modules/app/domain/constants/app-routes";
import AppProviders from "./providers/AppProviders";
import ProtectedRoute from "./modules/app/components/ProtectedRoute";
import PublicRoute from "@modules/app/components/PublicRoute";
import Login from "./containers/Auth/Login/Login";
import SignUp from "./containers/Auth/SignUp/SignUp";
import Home from "./containers/Home/Home";
import ProfileManagement from "./containers/EditProfile/EditProfile";
import Search from "./containers/Search/Search";
import Architects from "./containers/Architects/Architects";
import MyProfile from "@containers/Profile/MyProfile";
import ArchitectProfile from "@containers/Architects/components/ArchitectProfile";

export default function App() {
  return (
    <AppProviders>
      <Routes>
        <Route path="/" element={<Navigate replace to={APP_ROUTES.LOGIN} />} />
        <Route
          path={APP_ROUTES.LOGIN}
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path={APP_ROUTES.SIGNUP}
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          }
        />
        <Route
          path={APP_ROUTES.HOME}
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path={APP_ROUTES.MY_PROFILE}
          element={
            <ProtectedRoute>
              <MyProfile />
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
              <ArchitectProfile />
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
