import { FaBriefcase, FaMapMarkerAlt } from "react-icons/fa";
import { IoGlobeOutline } from "react-icons/io5";

export default function ProfileHeader() {
  return (
    <div className="mt-14 bg-card border-b border-border">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-12">
          <div className="relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 mx-auto lg:mx-0">
            <img
              src="erika.jpg"
              className="w-full h-full rounded-full object-cover border-4 border-primary/90"
            />
          </div>

          <div className="flex-1 min-w-0 text-center lg:text-left">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 md:gap-6">
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-title-bold text-black mb-2">
                  Erika Melissa Bouza Reyes
                </h1>
                <p className="text-base md:text-lg lg:text-xl text-black mb-3 md:mb-4">
                  Especialización
                </p>

                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 md:gap-4 mb-4 md:mb-6">
                  <div className="flex items-center gap-2 text-sm md:text-base text-black">
                    <FaMapMarkerAlt />
                    <span>Matanzas, Cuba</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm md:text-base text-black">
                    <FaBriefcase />
                    <span>3 años de experiencia</span>
                  </div>
                  <div>
                    <a
                      href="misitio.com"
                      target="_blank"
                      className="flex items-center gap-2 text-sm md:text-base text-accent hover:text-primary transition-smooth"
                    >
                      <IoGlobeOutline />
                      <span>Sitio Web</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 md:gap-4">
              <button className="px-2 py-1 text-xs font-medium text-gray-700 border border-gray-300 rounded hover:bg-gray-100 transition">
                Enviar Mensaje
              </button>
              <button className="px-2 py-1 text-xs font-medium text-gray-700 border border-gray-300 rounded hover:bg-gray-100 transition">
                Conectar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
