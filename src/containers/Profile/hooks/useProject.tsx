import { useEffect, useMemo, useState } from "react";
import type { Project } from "../../../modules/project/domain/entities/project";
import { getProjectByLoggedUser } from "../../../modules/project/services/get-project";

interface ProjectFeedItem {
  project: Project;
  likedByUser: boolean;
}

export default function useProject() {
  const [projects, setProjects] = useState<ProjectFeedItem[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<ProjectFeedItem[]>(
    [],
  );
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedSort, setSelectedSort] = useState("recent");

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

  useEffect(() => {
    getProjectByLoggedUser()
      .then((data) => {
        const sorted = sortList(data, "recent");
        setProjects(sorted);
        setFilteredProjects(sorted);
        setSelectedSort("recent");
      })
      .catch(() => {});
  }, []);

  return {
    projects: filteredProjects,
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
