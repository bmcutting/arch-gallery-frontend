import { FaEye, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function ProjectTab() {
  return (
    <div className="space-y-6 md:space-y-8">
      <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
        <div className="flex-1">
          <select>Filtrar por tipo</select>
        </div>
        <div className="flex-1">
          <select>Ordenar por</select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
        <Link
          key="id"
          to="/project-gallery?id=PROJECTID"
          className="group bg-card border border-border rounded-lg overflow-hidden transition-all 
          hover:shadow-amber-50 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
        >
          <div className="relative aspect-4/3 overflow-hidden bg-muted">
            <img
              src="pp.jfif"
              alt="pp.jfif"
              className="w-full h-full object-cover transition-all group-hover:scale-105"
            />
            <div className="absolute top-3 right-3 px-3 py-1.5 backdrop-blur-sm rounded-full text-xs md:text-sm font-medium text-blue-500">
              2025
            </div>
          </div>
          <div className="p-4 md:p-6">
            <h3 className="text-lg md:text-xl font-semibold text-secondary mb-2 line-clamp-1 group-hover:text-secondary transition-all">
              Metagross
            </h3>
            <p className="text-sm md:text-base text-secondary mb-4 line-clamp-2">
              Metagross es un pokemon de tipo acero y psíquico utilizado en
              batallas. Evoluciona de Metang y Beldum
            </p>
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-sm text-secondary">
                  <FaHeart />
                  <span>1oo</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-secondary">
                  <FaEye />
                  <span>100 vistas</span>
                </div>
              </div>
              <div className="text-xs md:text-sm font-medium text-secondary">
                Urbanismo
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
