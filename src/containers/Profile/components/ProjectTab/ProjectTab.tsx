import { FaEye, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import Select from "../../../../modules/app/modules/ui/components/Select/Select";
import { useState } from "react";

export default function ProjectTab() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedSort, setSelectedSort] = useState("recent");

  const filterOptions = [
    { value: "all", label: "Todos los Proyectos" },
    { value: "residential", label: "Residencial" },
    { value: "commercial", label: "Comercial" },
    { value: "institutional", label: "Institucional" },
    { value: "landscape", label: "Paisajismo" },
  ];

  const sortOptions = [
    { value: "recent", label: "Más Recientes" },
    { value: "oldest", label: "Más Antiguos" },
    { value: "popular", label: "Más Populares" },
  ];

  const projects = [
    {
      id: 1,
      title: "Metagross",
      description:
        "Metagross es un pokemon de tipo acero y psíquico utilizado en batallas. Evoluciona de Metang y Beldum",
      year: 2025,
      image: "pp.jfif",
      likes: 100,
      views: 100,
      category: "Urbanismo",
    },
    {
      id: 2,
      title: "Proyecto Residencial",
      description: "Un conjunto de viviendas modernas y sostenibles.",
      year: 2024,
      image: "house.jpg",
      likes: 250,
      views: 500,
      category: "Residencial",
    },
    {
      id: 3,
      title: "Centro Comercial",
      description: "Espacio comercial con diseño innovador.",
      year: 2023,
      image: "mall.jpg",
      likes: 400,
      views: 1200,
      category: "Comercial",
    },
  ];

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
        <div className="flex-1">
          <Select
            label="Filtrar por Tipo"
            options={filterOptions}
            value={selectedFilter}
            onChange={setSelectedFilter}
          />
        </div>
        <div className="flex-1">
          <Select
            label="Ordenar por"
            options={sortOptions}
            value={selectedSort}
            onChange={setSelectedSort}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
        {projects.map((project) => (
          <Link
            key={project.id}
            to={`/project-gallery?id=${project.id}`}
            className="group bg-card border border-border rounded-lg overflow-hidden transition-all hover:shadow-amber-50 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
          >
            <div className="relative aspect-4/3 overflow-hidden bg-muted">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-all group-hover:scale-105"
              />
              <div className="absolute top-3 right-3 px-3 py-1.5 backdrop-blur-sm rounded-full text-xs md:text-sm font-medium text-blue-500">
                {project.year}
              </div>
            </div>
            <div className="p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-semibold text-secondary mb-2 line-clamp-1 group-hover:text-secondary transition-all">
                {project.title}
              </h3>
              <p className="text-sm md:text-base text-secondary mb-4 line-clamp-2">
                {project.description}
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 text-sm text-secondary">
                    <FaHeart />
                    <span>{project.likes}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-secondary">
                    <FaEye />
                    <span>{project.views} vistas</span>
                  </div>
                </div>
                <div className="text-xs md:text-sm font-medium text-secondary">
                  {project.category}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
