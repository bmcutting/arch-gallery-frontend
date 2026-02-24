import Select from "../../../../modules/app/modules/ui/components/Select/Select";
import { useState } from "react";
import useProject from "../../hooks/useProject";
import CreateProjectModal from "../../../../modules/project/components/CreateProjectModal";
import ProjectCard from "../../../../modules/project/components/ProjectCard";

interface Props {
  userId: string;
}

export default function ProjectTab({ userId }: Props) {
  const { projects, showCreateModal, setShowCreateModal } = useProject();
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
        {projects?.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
        <div
          onClick={() => setShowCreateModal(true)}
          className="flex flex-col items-center justify-center border-2 border-dashed border-accent rounded-lg cursor-pointer hover:bg-accent/10 transition-all"
        >
          <span className="text-lg md:text-xl font-semibold text-primary">
            + Añadir Proyecto
          </span>
        </div>
      </div>

      {showCreateModal && (
        <CreateProjectModal
          onClose={() => setShowCreateModal(false)}
          userId={userId}
        />
      )}
    </div>
  );
}
