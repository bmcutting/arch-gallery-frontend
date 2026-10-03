import { useCallback, useEffect, useMemo, useState } from "react";
import type { Project } from "@modules/project/domain/entities/project";
import { getProjectByLoggedUser } from "@modules/project/services/get-project";
import { getProjectsByUserId } from "@modules/project/services/get-projects-by-user";

interface ProjectFeedItem {
  project: Project;
  likedByUser: boolean;
}

function sortList(list: ProjectFeedItem[], sort: string) {
  const sorted = [...list];
  if (sort === "recent") {
    sorted.sort((a, b) => b.project.year - a.project.year);
  } else if (sort === "oldest") {
    sorted.sort((a, b) => a.project.year - b.project.year);
  } else if (sort === "popular") {
    sorted.sort(
      (a, b) =>
        (b.project.likes?.length ?? 0) - (a.project.likes?.length ?? 0),
    );
  }
  return sorted;
}

/**
 * Lista de proyectos para la pestaña de perfil.
 * - Sin `userId`: proyectos del usuario logueado (con acciones de editar/borrar).
 * - Con `userId`: proyectos de ese usuario (solo lectura).
 */
export default function useUserProjects(userId?: string) {
  const [projects, setProjects] = useState<ProjectFeedItem[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<ProjectFeedItem[]>(
    [],
  );
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedSort, setSelectedSort] = useState("recent");
  const [loading, setLoading] = useState(true);

  const filterOptions = useMemo(() => {
    const categories = new Set<string>();
    projects.forEach((item) =>
      item.project.categories?.forEach((cat) => categories.add(cat.name)),
    );
    return [
      { value: "all", label: "Todos los Proyectos" },
      ...Array.from(categories).map((name) => ({
        value: name,
        label: name,
      })),
    ];
  }, [projects]);

  const sortOptions = [
    { value: "recent", label: "Más Recientes" },
    { value: "oldest", label: "Más Antiguos" },
    { value: "popular", label: "Más Populares" },
  ];

  function handleSort(value: string) {
    setSelectedSort(value);
    setFilteredProjects((prev) => sortList(prev, value));
  }

  function handleFilter(value: string) {
    setSelectedFilter(value);
    let filtered;
    if (value === "all") {
      filtered = [...projects];
    } else {
      filtered = projects.filter((item) =>
        item.project.categories?.some((cat) => cat.name === value),
      );
    }
    setFilteredProjects(sortList(filtered, selectedSort));
  }

  const fetchProjects = useCallback(() => {
    const request = userId
      ? getProjectsByUserId(userId)
      : getProjectByLoggedUser();

    return request
      .then((data) => {
        const sorted = sortList(data, "recent");
        setProjects(sorted);
        setFilteredProjects(sorted);
        setSelectedSort("recent");
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [userId]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return {
    projects: filteredProjects,
    loading,
    selectedFilter,
    setSelectedFilter,
    selectedSort,
    setSelectedSort,
    filterOptions,
    sortOptions,
    handleSort,
    handleFilter,
    setProjects,
    setFilteredProjects,
    refetch: fetchProjects,
  };
}
