import { useEffect, useState } from "react";
import type { Project } from "../../../modules/project/domain/entities/project";
import { getProjectByLoggedUser } from "../../../modules/project/services/get-project";

export default function useProject() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
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

  function handleSort(value: string) {
    console.log("👉 handleSort llamado con:", value);
    setSelectedSort(value);

    const sortedProjects = [...projects];
    console.log("📦 proyectos antes de ordenar:", sortedProjects);

    if (value === "recent") {
      console.log("🔄 Ordenando por recientes...");
      sortedProjects.sort((a, b) => b.year - a.year);
    } else if (value === "oldest") {
      console.log("🔄 Ordenando por antiguos...");
      sortedProjects.sort((a, b) => a.year - b.year);
    } else if (value === "popular") {
      console.log("🔄 Ordenando por populares...");
      sortedProjects.sort(
        (a, b) => (b.likes?.length ?? 0) - (a.likes?.length ?? 0),
      );
    }

    console.log("✅ proyectos después de ordenar:", sortedProjects);
    setProjects(sortedProjects);
  }

  function handleFilter(value: string) {
    setSelectedFilter(value);
  }

  useEffect(() => {
    getProjectByLoggedUser()
      .then((data) => {
        setProjects(data);
      })
      .catch(() => {});
  }, []);

  return {
    projects,
    showCreateModal,
    setShowCreateModal,
    selectedFilter,
    setSelectedFilter,
    selectedSort,
    setSelectedSort,
    filterOptions,
    sortOptions,
    handleSort,
    handleFilter,
  };
}
