import { FiHome, FiLogOut, FiSearch, FiUser, FiUsers } from "react-icons/fi";
import { Link } from "react-router-dom";
import { APP_ROUTES } from "@modules/app/domain/constants/app-routes";
import { useUserContext } from "@modules/user/context/useUserContext";

export default function Navbar() {
  const { logout } = useUserContext();

  return (
    <nav className="fixed top-0 left-0 right-0 h-14 w-full lg:px-10 px-4 py-2 bg-white bg-opacity-90 shadow backdrop-blur-lg backdrop-blur-saturate-150 z-20">
      <div className="flex flex-wrap items-center justify-between w-full text-slate-800">
        <a
          className="flex items-center gap-2 mr-4 cursor-pointer py-1.5 text-md text-slate-800 font-semibold"
          href="#"
        >
          <img
            src="/arch-gallery-icon.jpg"
            alt="ArchGallery logo"
            className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 object-contain"
          />
          <span>ArchGallery</span>
        </a>
        <div className="hidden lg:block">
          <ul className="flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <li className="flex items-center p-1 text-md gap-x-2 text-slate-900 font-semibold">
              <Link
                to={APP_ROUTES.HOME}
                className="flex items-center gap-2 hover:text-primary"
              >
                <FiHome size={18} /> Home
              </Link>
            </li>
            <li className="flex items-center p-1 text-md gap-x-2 text-slate-900 font-semibold">
              <Link
                to={APP_ROUTES.SEARCH}
                className="flex items-center gap-2 hover:text-primary"
              >
                <FiSearch size={18} /> Búsqueda
              </Link>
            </li>
            <li className="flex items-center p-1 text-md gap-x-2 text-slate-900 font-semibold">
              <Link
                to={APP_ROUTES.ARCHITECTS}
                className="flex items-center gap-2 hover:text-primary"
              >
                <FiUsers size={18} /> Arquitectos
              </Link>
            </li>
            <li className="flex items-center p-1 text-md gap-x-2 text-slate-900 font-semibold">
              <Link
                to={APP_ROUTES.MY_PROFILE}
                className="flex items-center gap-2 hover:text-primary"
              >
                <FiUser size={18} /> Mi Perfil
              </Link>
            </li>
            <li className="flex items-center p-1 text-md gap-x-2 text-slate-900 font-semibold">
              <button
                type="button"
                onClick={logout}
                className="flex items-center gap-2 hover:text-primary cursor-pointer"
              >
                <FiLogOut size={18} /> Salir
              </button>
            </li>
          </ul>
        </div>
        <div className="flex gap-6 lg:hidden">
          <Link to={APP_ROUTES.HOME} className="hover:text-accent">
            <FiHome size={22} />
          </Link>
          <Link to={APP_ROUTES.SEARCH} className="hover:text-accent">
            <FiSearch size={22} />
          </Link>
          <Link to={APP_ROUTES.ARCHITECTS} className="hover:text-accent">
            <FiUsers size={22} />
          </Link>
          <Link to={APP_ROUTES.MY_PROFILE} className="hover:text-accent">
            <FiUser size={22} />
          </Link>
          <button
            type="button"
            onClick={logout}
            aria-label="Cerrar sesión"
            className="hover:text-accent cursor-pointer"
          >
            <FiLogOut size={22} />
          </button>
        </div>
      </div>
    </nav>
  );
}
