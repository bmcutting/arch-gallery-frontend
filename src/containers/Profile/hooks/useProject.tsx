import { useEffect, useState } from "react";
import type { Project } from "../../../modules/project/domain/entities/project";
import { getProjectByLoggedUser } from "../../../modules/project/services/get-project";

interface ProjectFeedItem {
  project: Project;
  likedByUser: boolean;
}

export default function useProject() {
  const [projects, setProjects] = useState<ProjectFeedItem[]>([]);
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
    setSelectedSort(value);
    const sortedProjects = [...projects];

    if (value === "recent") {
      sortedProjects.sort((a, b) => b.project.year - a.project.year);
    } else if (value === "oldest") {
      sortedProjects.sort((a, b) => a.project.year - b.project.year);
    } else if (value === "popular") {
      sortedProjects.sort(
        (a, b) =>
          (b.project.likes?.length ?? 0) - (a.project.likes?.length ?? 0),
      );
    }

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
