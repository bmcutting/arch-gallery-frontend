import { FiHome, FiSearch, FiUser, FiUsers } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 h-14 w-full lg:px-10 px-4 py-2 bg-white bg-opacity-90 shadow backdrop-blur-lg backdrop-blur-saturate-150 z-[9999]">
      <div className="flex flex-wrap items-center justify-between w-full text-slate-800">
        <a
          className="flex items-center gap-2 mr-4 cursor-pointer py-1.5 text-md text-slate-800 font-semibold"
          href="#"
        >
          <img
            src="arch-gallery-icon.jpg"
            alt="ArchGallery logo"
            className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 object-contain"
          />
          <span>ArchGallery</span>
        </a>
        <div className="hidden lg:block">
          <ul className="flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <li className="flex items-center p-1 text-md gap-x-2 text-slate-900 font-semibold">
              <a
                href="/dashboard"
                className="flex items-center gap-2 hover:text-primary"
              >
                <FiHome size={18} /> Home
              </a>
            </li>
            <li className="flex items-center p-1 text-md gap-x-2 text-slate-900 font-semibold">
              <a
                href="/search"
                className="flex items-center gap-2 hover:text-primary"
              >
                <FiSearch size={18} /> Búsqueda
              </a>
            </li>
            <li className="flex items-center p-1 text-md gap-x-2 text-slate-900 font-semibold">
              <a
                href="/architects"
                className="flex items-center gap-2 hover:text-primary"
              >
                <FiUsers size={18} /> Arquitectos
              </a>
            </li>
            <li className="flex items-center p-1 text-md gap-x-2 text-slate-900 font-semibold">
              <a
                href="/profile"
                className="flex items-center gap-2 hover:text-primary"
              >
                <FiUser size={18} /> Mi Perfil
              </a>
            </li>
          </ul>
        </div>
        <div className="flex gap-6 lg:hidden">
          <Link to="/home" className="hover:text-blue-600">
            <FiHome size={22} />
          </Link>
          <Link to="/search" className="hover:text-blue-600">
            <FiSearch size={22} />
          </Link>
          <Link to="/architects" className="hover:text-blue-600">
            <FiUsers size={22} />
          </Link>
          <Link to="/profile" className="hover:text-blue-600">
            <FiUser size={22} />
          </Link>
        </div>
      </div>
    </nav>
  );
}
