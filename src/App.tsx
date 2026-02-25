import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { APP_ROUTES } from "./modules/app/domain/constants/app-routes";
import { ToastContainer } from "react-toastify";
import Login from "./containers/Auth/Login/Login";
import SignUp from "./containers/Auth/SignUp/SignUp";
import Home from "./containers/Home/Home";
import Profile from "./containers/Profile/Profile";
import ProfileManagement from "./containers/EditProfile/EditProfile";
import Search from "./containers/Search/Search";

export default function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Navigate replace to={APP_ROUTES.LOGIN} />} />
        <Route path={APP_ROUTES.LOGIN} element={<Login />} />
        <Route path={APP_ROUTES.SIGNUP} element={<SignUp />} />
        <Route path={APP_ROUTES.HOME} element={<Home />} />
        <Route path={APP_ROUTES.PROFILE} element={<Profile />} />
        <Route path={APP_ROUTES.SEARCH} element={<Search/>}/>
        <Route path={APP_ROUTES.ARCHITECTS} element={<Search/>}/>
        <Route
          path={APP_ROUTES.PROFILEMANAGEMENT}
          element={<ProfileManagement />}
        />
      </Routes>
    </BrowserRouter>
  );
}
